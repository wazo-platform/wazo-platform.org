## Docker

The official docker image for this service is `wazopbx/wazo-plugind`.


### Getting the image

To download the latest image from the docker hub

```sh
docker pull wazopbx/wazo-plugind
```


### Running wazo-plugind

```sh
docker run -e"XIVO_UUID=<the xivo UUID>" wazopbx/wazo-plugind
```

### Building the image

Building the docker image:

```sh
docker build -t wazopbx/wazo-plugind .
```
