---
title: WebSocket Event Service
---

-   [Getting Started](#getting-started)
    -   [Example](#example)
-   [Reference](#reference)
    -   [Authentication](#authentication)
    -   [Events Access Control](#ws-events-acl)
    -   [Status Code](#ws-status-code)
    -   [Protocol](#ws-protocol)
        -   [Client Messages](#client-messages)
        -   [Server Messages](#server-messages)

Wazo offers a service to receive messages published on the
[bus (e.g. RabbitMQ)](/uc-doc/api_sdk/message_bus) over
an encrypted [WebSocket](https://en.wikipedia.org/wiki/WebSocket)
connection. This ease in building dynamic web applications that are
using events from your Wazo.

The service is provided by the `wazo-websocketd` component.

Getting Started
===============

To use the service, you need to:

1.  connect to it on port 443 with prefix `/api/websocketd` using an encrypted WebSocket connection.
2.  authenticate to it by providing a wazo-auth token that has the
    `websocketd` ACL. If you don\'t know how to obtain a wazo-auth token
    from your Wazo, consult the [documentation on wazo-auth](/uc-doc/system/configuration_files#wazo-auth).

For example, if you want to use the service located at `example.org`
with the token `some-token-id`, you would use the URL
`wss://example.org/api/websocketd/?token=some-token-id&version=2`.

The [SSL/TLS certificate](/uc-doc/system/https_certificate) that is used by the WebSocket server is the same as the one
used by the Wazo web interface and the REST APIs. By default, this is a
self-signed certificate, and web browsers will prevent connections from
being successfully established for security reasons. On most web
browsers, this can be circumvented by first visiting the
`https://<wazo-ip>/` URL and adding a security exception.

After a succesful connection and authentication to the service, the
server will send the following message:

    {"op": "init", "code": 0, "data": {"version": 2}}

This indicate that the server is ready to accept more commands from the
client. Had an error happened, the server would have closed the
connection, possibly with one of the [service specific WebSocket close code](/uc-doc/api_sdk/websocket#ws-status-code).

The message you see is part of the small
[JSON-based protocol](/uc-doc/api_sdk/websocket#ws-protocol) that
is used for the client/server interaction.

To receive events on your WebSocket connection, you need to tell the
server which type of events you are interested in, and then tell it to
start sending you these events. For example, if you are interested in
the ["call_created" events](/uc-doc/api_sdk/message_bus#bus-call-created), you send the following command:

    {"op": "subscribe", "data": {"event_name": "call_created"}}

If all goes well, the server will respond with:

    {"op": "subscribe", "code": 0}

Once you have subscribed to all the events you are interested in, you
ask the server to start sending you the matching events by sending the
following command:

    {"op": "start"}

The server will respond with:

    {"op": "start", "code": 0}

Once you have received this message, you will start to received events
from the bus. All event will be surrounded by the following enveloppe:

    {"op": "event": "code": 0, "event": <original-event-payload>}

Example
-------

Here\'s a rudimentary example of a web page accessing the service:

``` {.sourceCode .html}
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
    socket = new WebSocket("wss://" + host + "/api/websocketd/?version=2&token=" + token_id);
    socket.onclose = function(event) {
        socket = null;
        console.log("websocketd closed with code " + event.code + " and reason '" + event.reason + "'");
    };
    socket.onmessage = function(event) {
        var msg = JSON.parse(event.data);
        switch (msg.op) {
            case "init":
                subscribe("*");
                start();
                break;
            case "start":
                console.log("waiting for messages");
                break;
            case "event":
                console.log("message received: " + msg.event);
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

``` {.sourceCode .javascript}
socket = new WebSocket("wss://" + host + "/api/websocketd/?version=2&token=" + token_id);
```

Then, at line 23, a `onmessage` callback is set on the WebSocket object:

``` {.sourceCode .javascript}
socket.onmessage = function(event) {
    var msg = JSON.parse(event.data);
    switch (msg.op) {
        case "init":
            subscribe("call_created");
            subscribe("call_updated");
            start();
            break;
        case "start":
            console.log("waiting for messages");
            break;
        case "event":
            console.log("message received: " + msg.event);
            break;
    }
};
```

After a successful connection to the service, an \"init\" message will
be received by the client. When the client receives this message, it
sends two subscribe commands (e.g. `subscribe("call_created")`) and a
start command (e.g. `start()`). When the client receives the \"start\"
message, it sets the `started` flag. After that, all the other messages
it receives will be logged to the console.

Reference
=========

The WebSocket service is provided by `wazo-websocketd`, and its
behaviour can be configured via its
[configuration files](/uc-doc/system/configuration_files) located under the `/etc/wazo-websocketd`{.interpreted-text role="file"} directory. After modifying the configuration files, you
need to restart `wazo-websocketd` with
`systemctl restart wazo-websocketd`.

Authentication {#rest-api-authentication}
--------------

Authentication is done by passing a wazo-auth token ID in the `token`
query parameter. Authentication is mandatory.

The token must have the `websocketd` ACL.

When the token expires, the server close the connection with the status
code 4003. There is currently no way to change the token of an existing
connection. A new connection must be made when the token expires.

Events Access Control {#ws-events-acl}
---------------------

Clients connected to `wazo-websocketd` only receive events that they are
authorized to receive. For example, a client connected with a token
obtained from the \"wazo\_user\" `wazo-auth` backend will *not* receive
call events of other users.

When a message is received from the bus by `wazo-websocketd`, it
extracts the ACL from the `required_acl` key of the event. If the field
is missing, no clients will receive the event. If the value is null, all
subscribed clients will receive the event. If the value is a string,
then all subscribed clients which have a matching ACL will receive the
event.

No authorization check is done at subscription time. Checks are only
done when an event is received by the server. This mean a client can
subscribe to an event \"foo\", but will never receive any of these
events if it does not have the matching ACL.

See the [Events](/uc-doc/api_sdk/message_bus#bus-events) section for more
information on the required ACL of events which are available by default
on Wazo.

Status Code {#ws-status-code}
-----------

The WebSocket connection might be closed by the server using one of
following status code:

-   4001: No token ID was provided.
-   4002: Authentication failed. Either the token ID is invalid,
    expired, or does not have the necessary ACL.
-   4003: Authentication expired. The token has expired or was deleted.
-   4004: Protocol error. The server received a frame that it could not
    understand. For example, the content was not valid JSON, or was
    requesting an unknown operation, or a mandatory argument to an
    operation was missing.

The server also uses the [pre-defined WebSocket status
codes](http://tools.ietf.org/html/rfc6455#section-7.4).

Protocol {#ws-protocol}
--------

A JSON-based protocol is used over the WebSocket connection to control
which events are received by the client.

### Client Messages

The format of the messages sent by the client are all of the same
format:

    {"op": "<operation-name>", "data": <operation-specific-value>}

The \"op\" key is mandatory, and the value is either \"subscribe\" or
\"start\". The \"data\" key is mandatory for the \"subscribe\"
operation.

The \"subscribe\" message ask the server to subscribe the client to the
given event. When a message with the same name is published on the
\"xivo\" exchange of the bus, the server forwards the message to all the
subscribed clients that are authorized to receive it. For this command,
the \"data\" value is a dictionary with an \"event\_name\" key
(mandatory). Example:

    {"op": "subscribe", "data": {"event_name": "endpoint_status_update"}}

You can subscribe to any event. The special event name `*` can be used
to match all events.

See the [Events](/uc-doc/api_sdk/message_bus#bus-events) section for more
information on the events which are available by default on Wazo.

The \"start\" message ask the server to start sending messages from the
bus to the client. Example:

    {"op": "start"}

The server won\'t forward messages from the bus to the client until it
receives the \"start\" message from the client.

If the client send a message that the server doesn\'t understand, the
server closes the connection.

### Server Messages

The format of the messages sent by the server are all of the same format
(until the server receives a \"start\" command):

    {"op": "<operation-name>", "code": <status-code>, "data": "<data>"}

The 3 keys are always present. The value of the \"op\" key can be one of
\"init\", \"subscribe\" or \"start\". The value of the \"code\" key is
an integer representing the status of the operation, 0 meaning there was
no error, other values meaning there was an error.

The \"init\" message is only sent after the connection is successfully
established between the client and the server. It\'s code is always
zero; if the connection could not be established, the connection is
simply closed. Example:

    {"op": "init", "code": 0, "data": {"version": 2}}

The \"subscribe\" message is sent as a response to a client
\"subscribe\" message. The code is always zero. Example:

    {"op": "subscribe", "code": 0}

The \"start\" message is sent as a response to a client \"start\"
message. The code is always zero. Example:

    {"op": "start", "code": 0}

After receiving the \"start\" message, the server switch into the
\"bus/started\" mode, where all messages that the server will ever sent
will be the body of the messages it received on the bus on behalf of the
client.
