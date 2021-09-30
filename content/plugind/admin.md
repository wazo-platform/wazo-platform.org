## Docker

The official docker image for this service is `wazoplatform/wazo-plugind`.


### Getting the image

To download the latest image from the docker hub

```shell
docker pull wazoplatform/wazo-plugind
```


### Running wazo-plugind

```shell
docker run -e"XIVO_UUID=<the xivo UUID>" wazoplatform/wazo-plugind
```

### Building the image

Building the docker image:

```shell
docker build -t wazoplatform/wazo-plugind .
```
