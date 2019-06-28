## Getting Started

To use the service, you need to:

1.  connect to it on port 9502 using an encrypted WebSocket connection.
2.  authenticate to it by providing a wazo-auth token that has the
    `websocketd` ACL. If you don't know how to obtain a wazo-auth token
    from your Wazo, consult the <span data-role="ref">documentation on
    wazo-auth \<wazo-auth\></span>.

For example, if you want to use the service located at `example.org`
with the token `some-token-id`, you would use the URL
`wss://example.org:9502/?token=some-token-id`.

The <span data-role="ref">SSL/TLS certificate
\<https\_certificate\></span> that is used by the WebSocket server is
the same as the one used by the Wazo web interface and the REST APIs. By
default, this is a self-signed certificate, and web browsers will
prevent connections from being successfully established for security
reasons. On most web browsers, this can be circumvented by first
visiting the `https://<wazo-ip>:9502/` URL and adding a security
exception. Other solutions to this problem are described in the
<span data-role="ref">connection section \<ws-connection\></span>.

After a succesful connection and authentication to the service, the
server will send the following message:

    {"op": "init", "code": 0, "msg": ""}

This indicate that the server is ready to accept more commands from the
client. Had an error happened, the server would have closed the
connection, possibly with one of the <span data-role="ref">service
specific WebSocket close code \<ws-status-code\></span>.

The message you see is part of the small
<span data-role="ref">JSON-based protocol \<ws-protocol\></span> that is
used for the client/server interaction.

To receive events on your WebSocket connection, you need to tell the
server which type of events you are interested in, and then tell it to
start sending you these events. For example, if you are interested in
the <span data-role="ref">"endpoint\_status\_update" events
\<bus-endpoint\_status\_update\></span>, you send the following
    command:

    {"op": "subscribe", "data": {"event_name": "endpoint_status_update"}}

If all goes well, the server will respond with:

    {"op": "subscribe", "code": 0, "msg": ""}

Once you have subscribed to all the events you are interested in, you
ask the server to start sending you the matching events by sending the
following command:

    {"op": "start"}

The server will respond with:

    {"op": "start", "code": 0, "msg": ""}

Once you have received this message, all the other messages you'll
receive will be messages originating from the bus, in the same format as
they were on the bus.

### Example

Here's a rudimentary example of a web page accessing the service:

``` sourceCode html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Wazo WebSocket Example</title>
<script>
var socket = null;
var started = false;

function connect() {
    if (socket != null) {
        console.log("socket already connected");
        return;
    }

    var host = document.getElementById("host").value;
    var token_id = document.getElementById("token").value;
    socket = new WebSocket("wss://" + host + ":9502/?token=" + token_id);
    socket.onclose = function(event) {
        socket = null;
        console.log("websocketd closed with code " + event.code + " and reason '" + event.reason + "'");
    };
    socket.onmessage = function(event) {
        if (started) {
            console.log("message received: " + event.data);
            return;
        }

        var msg = JSON.parse(event.data);
        switch (msg.op) {
            case "init":
                subscribe("*");
                start();
                break;
            case "start":
                started = true;
                console.log("waiting for messages");
                break;
        }
    };
    started = false;
}

function subscribe(event_name) {
    var msg = {
        op: "subscribe",
        data: {
          event_name: event_name
        }
    };
    socket.send(JSON.stringify(msg));
};

function start() {
    var msg = {
        op: "start"
    };
    socket.send(JSON.stringify(msg));
}
</script>
</head>
<body>
  <p>Open the web console to see what's happening.</p>
  <form>
    <div>
      <label for="host">Host:</label>
      <input type="text" id="host" autofocus>
    </div>
    <div>
      <label for="token">Token ID:</label>
      <input type="text" id="token" size="35">
    </div>
    <div>
      <button type="button" onclick="connect();">Connect</button>
    </div>
  </form>
</body>
</html>
```

The page has a form for the user to enter a host and token ID, and has a
connect button. When the button is clicked, the `connect` function is
called, and the WebSocket connection is created at line 18 (using the
[WebSocket
API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)):

``` sourceCode javascript
socket = new WebSocket("wss://" + host + ":9502/?token=" + token_id);
```

Then, at line 23, a `onmessage` callback is set on the WebSocket object:

``` sourceCode javascript
socket.onmessage = function(event) {
    if (started) {
        console.log("message received: " + event.data);
        return;
    }

    var msg = JSON.parse(event.data);
    switch (msg.op) {
        case "init":
            subscribe("endpoint_status_update");
            subscribe("user_status_update");
            start();
            break;
        case "start":
            started = true;
            console.log("waiting for messages");
            break;
    }
};
```

After a successful connection to the service, an "init" message will be
received by the client. When the client receives this message, it sends
two subscribe commands (e.g. `subscribe("endpoint_status_update")`) and
a start command (e.g. `start()`). When the client receives the "start"
message, it sets the `started` flag. After that, all the other messages
it receives will be logged to the console.

## Reference

The WebSocket service is provided by `wazo-websocketd`, and its
behaviour can be configured via its <span data-role="ref">configuration
files \<configuration-files\></span> located under the
<span data-role="file">/etc/wazo-websocketd</span> directory. After
modifying the configuration files, you need to restart `wazo-websocketd`
with `systemctl restart wazo-websocketd`.

### Connection

The service is available on port 9502 on all network interfaces by
default. This can be changed in the configuration file.

The canonical URL to reach the service is `wss://<host>:9502/`.

The connection is always encrypted. The certificate and private key used
by the server can be changed in the configuration file. By default,
since the certificate is self-signed, you'll have to either:

  - add a security exception on the client machines that access the
    service
  - use a certificate signed by an untrusted CA and add the CA bundle on
    the system that access the service
  - use a trusted certificate

See the <span data-role="ref">https\_certificate</span> section for more
information on certificate configuration.

### Authentication

Authentication is done by passing a wazo-auth token ID in the `token`
query parameter. Authentication is mandatory.

The token must have the `websocketd` ACL.

When the token expires, the server close the connection with the status
code 4003. There is currently no way to change the token of an existing
connection. A new connection must be made when the token expires.

### Events Access Control

Clients connected to `wazo-websocketd` only receive events that they are
authorized to receive. For example, a client connected with a token
obtained from the "xivo\_user" `wazo-auth` backend will *not* receive
call events of other users.

When a message is received from the bus by `wazo-websocketd`, it
extracts the ACL from the `required_acl` key of the event. If the field
is missing, no clients will receive the event. If the value is null, all
subscribed clients will receive the event. If the value is a string,
then all subscribed clients which have a matching ACL will receive the
event.

No authorization check is done at subscription time. Checks are only
done when an event is received by the server. This mean a client can
subscribe to an event "foo", but will never receive any of these events
if it does not have the matching ACL.

See the <span data-role="ref">bus-events</span> section for more
information on the required ACL of events which are available by default
on Wazo.

### Status Code

The WebSocket connection might be closed by the server using one of
following status code:

  - 4001: No token ID was provided.
  - 4002: Authentication failed. Either the token ID is invalid,
    expired, or does not have the necessary ACL.
  - 4003: Authentication expired. The token has expired or was deleted.
  - 4004: Protocol error. The server received a frame that it could not
    understand. For example, the content was not valid JSON, or was
    requesting an unknown operation, or a mandatory argument to an
    operation was missing.

The server also uses the [pre-defined WebSocket status
codes](http://tools.ietf.org/html/rfc6455#section-7.4).

### Protocol

A JSON-based protocol is used over the WebSocket connection to control
which events are received by the client.

#### Client Messages

The format of the messages sent by the client are all of the same
format:

    {"op": "<operation-name>", "data": <operation-specific-value>}

The "op" key is mandatory, and the value is either "subscribe" or
"start". The "data" key is mandatory for the "subscribe" operation.

The "subscribe" message ask the server to subscribe the client to the
given event. When a message with the same name is published on the
"xivo" exchange of the bus, the server forwards the message to all the
subscribed clients that are authorized to receive it. For this command,
the "data" value is a dictionary with an "event\_name" key (mandatory).
Example:

    {"op": "subscribe", "data": {"event_name": "endpoint_status_update"}}

You can subscribe to any event. The special event name `*` can be used
to match all events.

See the <span data-role="ref">bus-events</span> section for more
information on the events which are available by default on Wazo.

The "start" message ask the server to start sending messages from the
bus to the client. Example:

    {"op": "start"}

The server won't forward messages from the bus to the client until it
receives the "start" message from the client.

If the client send a message that the server doesn't understand, the
server closes the connection.

#### Server Messages

The format of the messages sent by the server are all of the same format
(until the server receives a "start"
    command):

    {"op": "<operation-name>", "code": <status-code>, "msg": "<error message>"}

The 3 keys are always present. The value of the "op" key can be one of
"init", "subscribe" or "start". The value of the "code" key is an
integer representing the status of the operation, 0 meaning there was no
error, other values meaning there was an error. The "msg" is an empty
string unless "code" is non-zero, in which case it's a human-readable
message of the error.

The "init" message is only sent after the connection is successfully
established between the client and the server. It's code is always zero;
if the connection could not be established, the connection is simply
closed. Example:

    {"op": "init", "code": 0, "msg": ""}

The "subscribe" message is sent as a response to a client "subscribe"
message. The code is always zero. Example:

    {"op": "subscribe", "code": 0, "msg": ""}

The "start" message is sent as a response to a client "start" message.
The code is always zero. Example:

    {"op": "start", "code": 0, "msg": ""}

After receiving the "start" message, the server switch into the
"bus/started" mode, where all messages that the server will ever sent
will be the body of the messages it received on the bus on behalf of the
client.

Note that a client can subscribe to more events after sending its
"start" message, but it won't receive any response from the server, e.g.
the server won't send a corresponding "subscribe" message. Said
differently, once the client has sent a "start" message, every message
the client will ever receive are messages coming from the bus.
