## Developer's Guide

See [here](/uc-doc/system/wazo-confd/developer)

# Run Unit Tests

**requirements:**
```
apt-get install libpq-dev python-dev libffi-dev libyaml-dev
pip install tox
```

Finally:

    tox --recreate -e py27

# Run Integration Tests
[integration-tests]: #run-integration-tests

**requirements:** `docker`, then

```
cd ./integration_tests
pip install -U -r test-requirements.txt
make test-setup
```

Finally:

    make test

## Modified database

**requirement:** update `xivo-manage-db` repository.

    git clone https://github.com/wazo-platform/xivo-manage-db
    MANAGE_DB_DIR=../../xivo-manage-db make update-db

Then, [run integration tests][integration-tests].

## Modified wazo-provd

**requirement:** update `wazo-provd` repository.

    git clone https://github.com/wazo-platform/wazo-provd
    PROVD_DIR=../../wazo-provd make build-provd

Then, [run integration tests][integration-tests].

## Mounting libraries

In case you need to mount libraries (`xivo-dao`, `xivo-bus`, `lib-python`) inside the `wazo-confd` container:

1. Uncomment the `confd` volumes in `./integration_tests/assets/docker-compose.yml`
2. Set the environment variable

       export LOCAL_GIT_REPOS=/parent/directory/to/all/git/repos

3. Execute the steps above to run integration tests

# Profiling

**requirements:**

    pip install gprof2dot
    apt-get install graphviz

Set the `profile` directory configuration **What?**, then process the file the following command:

    gprof2dot -f pstats /path/to/file | dot -Tpng -o output.png
