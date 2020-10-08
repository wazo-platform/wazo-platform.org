## Docker

The official docker image for this service is `wazoplatform/wazo-plugind`.


### Getting the image

To download the latest image from the docker hub

```sh
docker pull wazoplatform/wazo-plugind
```


### Running wazo-plugind

```sh
docker run -e"XIVO_UUID=<the xivo UUID>" wazoplatform/wazo-plugind
```

### Building the image

Building the docker image:

```sh
docker build -t wazoplatform/wazo-plugind .
```
