# Install the Wazo Platform UC use case

To install the Unified Communication use case in an all-in-one
setup, do the following steps:

1. Install a Debian 10 Buster system
2. Run the following commands as root on the Debian system to
   provision git and Ansible:

```shell
# apt-get install -yq git ansible
```

4. Extract the Wazo Platform installer

```shell
# git clone https://github.com/wazo-platform/wazo-ansible.git
# cd wazo-ansible
# ansible-galaxy install -r requirements-postgresql.yml
```

5. Edit the Ansible inventory in `inventories/uc-engine` to add your
   preferences and passwords. The various variables that can be
   customized are described at
   <https://github.com/wazo-platform/wazo-ansible/blob/master/README.md#variables>. Be
   sure to set `engine_api_configure_wizard` to `true` if you want to
   provision the needed resources to use the REST API right away.

6. Launch the installation by running the following command:

```shell
# ansible-playbook -i inventories/uc-engine uc-engine.yml
```
# Use the REST API

You may now use the REST API from outside your virtual machine (here `wazo.example.com`).

1. Get an authentication token for 1 hour:

Using the `api_client_name` and `api_client_password` you defined in
your inventory, you can execute from the Debian system:

```shell
wazo-auth-cli token create --auth-user <api_client_name> --auth-password <api_client_password>
```
Or with curl from anywhere:

```shell
curl -k -X POST -u <api_client_name>:<api_client_password> -H 'Content-Type: application/json' -d '{"expiration": "3600"}' https://wazo.example.com/api/auth/0.1/token
```

2. Use any REST API you want, for example, to list the telephony users configured on the system:

Note: You should replace the following values:
* `my-token` with the authentication token

```shell
curl -k -X GET -H 'X-Auth-Token: <my-token>' -H 'Content-Type: application/json' -d '{"firstname": "user1"}' https://wazo.example.com/api/confd/1.1/users
```

Note: the token that you have now only has permissions for configuration REST API (wazo-confd).
