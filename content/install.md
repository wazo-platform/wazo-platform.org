# Install the Wazo platform

1. Install Debian 9 Stretch in a virtual machine
2. Run the following commands in the virtual machine

```shell
wget http://mirror.wazo.community/fai/xivo-migration/wazo_install.sh
chmod +x wazo_install.sh
./wazo_install.sh
```

3. Finish the installation by running the following command.

Note: You should replace the following values:
* `127.0.0.1` with the internal IP address of the virtual machine
* `secret` with a secure password.

```shell
curl -k -X POST -H 'Content-Type: application/json' -d '{"engine_internal_address": "127.0.0.1", "engine_language": "en_US", "engine_license": true, "engine_password": "secret"}' https://localhost/api/setupd/1.0/setup
```


# Get ready to use the REST API

1. Still inside the virtual machine, create a tenant:

```shell
wazo-auth-cli tenant create api-tenant
```

2. Create an API authentication `api-client`:

Note: You should replace the following values:
* `secret` with a secure password.

```shell
wazo-auth-cli user create api-client --tenant api-tenant --password secret --purpose external_api
```

3. Give it some permissions:

```shell
wazo-auth-cli policy create api-client-policy --tenant api-tenant --acl 'confd.#'
wazo-auth-cli user add api-client --policy api-client-policy
```


# Use the REST API

You may now use the REST API from outside your virtual machine (here `wazo.example.com`).

1. Get an authentication token for 1 hour:

```shell
curl -k -X POST -u api-client:secret -H 'Content-Type: application/json' -d '{"expiration": "3600"}' https://wazo.example.com/api/auth/0.1/token
```

2. Use any REST API you want, for example, to list the telephony users configured on the system:

Note: You should replace the following values:
* `my-token` with the authentication token

```shell
curl -k -X GET -H 'X-Auth-Token: my-token' -H 'Content-Type: application/json' -d '{"firstname": "user1"}' https://wazo.example.com/api/confd/1.1/users
```

Note: the token that you have now only has permissions for configuration REST API (wazo-confd).
