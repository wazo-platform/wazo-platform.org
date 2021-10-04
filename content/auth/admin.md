## Launching

```shell
wazo_auth [-d] [--user <user>] --config <path/to/config/file>
```

* `-d`: Starts wazo-auth in debug mode
* `--user`: Specify the OS user to use
* `--config`: Path to the configuration file


## Docker

The wazoplatform/wazo-auth image can be built using the following command:

    % docker build -t wazoplatform/wazo-auth .

To run wazo-auth in docker, use the following commands:

    % docker run -p 9497:9497 -v /conf/wazo-auth:/etc/wazo-auth/conf.d/ -it wazoplatform/wazo-auth bash
    % wazo-auth [-df] [-u <user>] [-c <path/to/config/file>]

The wazoplatform/wazo-auth-db image can be built using the following command:

    % docker build -f contribs/docker/Dockerfile-db -t wazoplatform/wazo-auth-db .

## Bootstrapping

In order to be able to create users, groups and policies you have to be authenticated. The bootstrap
process allows the administrator to create a first user with the necessary rights to be able to add
other users.


### Preparing wazo-auth to be bootstrapped

To be able to bootstrap wazo-auth, you will have to enable the init plugin and create a key file in
wazo-auth's HOME directory. This can be done using the `wazo-auth-bootstrap` command.

```shell
wazo-auth-bootstrap setup && systemctl restart wazo-auth
```


### Bootstrapping wazo-auth

Once wazo-auth is ready to be bootstraped, calling the init resource with a username, password and
the content of the key file will create a new user. The username and password can then be used to create
a token with the `auth.#` acl. This can be done using the `wazo-auth-bootstrap` command.

```shell
wazo-auth-bootstrap complete
```

This script will create a configuration file named `/root/.config/wazo-auth-cli/050-credentials.yml`
containing all necessary information to be used from the `wazo-auth-cli`.

## Load testing

To test wazo-auth with ab

Dependencies

* ab

```shell
apt update && apt install apache2-utils
```

Running the tests

```shell
ab -n1000 -c25 -A 'alice:alice' -T 'application/json' "https://localhost:9497/0.1/token"
```

This line will start 25 process creating 1000 tokens with the username and password alice alice


## Configuration

The default config is /etc/wazo-auth/config.yml, you could override in /etc/wazo-auth/conf.d/

### Enabling the users registration API

To enable the users registration (/users/register) API endpoint, add a file containing the following lines to the /etc/wazo-auth/conf.d directory and restart wazo-auth

```yaml
enabled_http_plugins:
  user_registration: true
```
