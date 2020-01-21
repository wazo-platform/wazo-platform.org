Title: Integrating a Jabra Headset?
Date: 2020-01-21 12:30:00
Author: Emmanuel QUENTIN
Category: Wazo Software
Tags: Headset, Switchboard, VOIP, Jabra
Slug: integrating-a-jabra-headset
Status: published

We've been tasked with integrating the Jabra headset in our Web and Desktop applications, the task may appear simple but we had some unexpected challenges imposed by Jabra.

![Jabra headset](https://user-images.githubusercontent.com/2076632/71919321-659ba580-3152-11ea-8095-d27f22a6958b.jpg)

## Integrating a Jabra Headset with our Desktop app.

Adding the Jabra SDK in our Electron application was pretty straightforward, by following the [documentation](https://github.com/gnaudio/jabra-node-sdk/tree/master/electronrendererhelper) we were able to catch the headset button events and changing it status (on-hook, ringing ...).
After successfully connecting the headset, we had to read the documentation a few times before realizing that the button events weren't fired when the headset wasn't in ringing or on-hook state.

## Integrating a Jabra Headset with our Web app.

The same code base is shared between our Electron and Web applications, so we thought it would be straightforward to add Jabra headsets support. But upon reading the [documentation for Web integration](https://github.com/gnaudio/jabra-browser-integration) we realized that the initialization flow is totally different from one another.

With the `electronrendererhelper` we had to call `createApiClient` to retrieve a Jabra client and wait for a `attach` event to retrieve our device. However, there is no `client` with the `jabra-browser-integration`: we had to call first a `init()` method, then check for `getInstallInfo())` to get information about the installation of the [browser plugin](https://chrome.google.com/webstore/detail/jabra-browser-integration/okpeabepajdgiepelmhkfhkjlhhmofma) and wait for a `device attached` event. Complicating matters even more, the `device attached` event is not fired during the initialization process when a device is already attached, unlike the electron flow (**@FIXME**).

When the main button is pressed, the Electron SDK triggers a `btnPress` event with a [code](https://github.com/gnaudio/jabra-node-sdk/blob/6ed31e69ae2ad2358766e5a38b25afdfb79652ca/nodesdk/src/main/jabra-enums.ts#L68) indicating the action. For the Web SDK, there are different events fired depending on the state of the headset, like `acceptcall`, `reject`, ...

So here we have 2 distinct APIs, each with their own initialization flows, and firing their own events. Why? Don't the development teams communicate with each other?

## Putting it Together

![Factory](https://user-images.githubusercontent.com/2076632/71919409-9e3b7f00-3152-11ea-9153-a3af5e7beb0d.jpg)

To work around this problem, the Gang of Four introduced the [Factory pattern](https://en.wikipedia.org/wiki/Factory_method_pattern) (**this seems to imply it is a recently discovered solution. may want to refactor**), which allows to decouple the instantiation of an object from the object itself. So we have to create a `JabraFactory` class that wraps both API and their different events.

### Check if we are in an Electron or browser app

There is [a lot of ways](https://github.com/electron/electron/issues/2288) to check if, we'll use :

```js 
const isOnDesktop = navigator.userAgent.toLowerCase().indexOf(' electron/') > -1;
```

### Introducing the `GenericJabraDevice` class

This class deals with the various events fired by Jabra devices, we chose to emulate Jabra's Electron API. This class will extend `EventEmitter` so we can listen to events with a `.on()` like the Electron SDK :

```js
export class GenericJabraDevice extends EventEmitter {  
  constructor(realDevice) {    
    super();
    this.realDevice = realDevice
    this._bindDevice();
  }

  ring = () => isDesktop ? this.realDevice.ringAsync() : this.realDevice.ring();
  mute = () => isDesktop ? this.realDevice.muteAsync() : this.realDevice.mute();
  unMute = () => isDesktop ? this.realDevice.unmuteAsync() : this.realDevice.unmute();
  // ...

  _bindDevice = () => {    
    if (isDesktop) {      
      this.realDevice.on('btnPress', (btnType, value) => this.emit('btnPress', btnType, value));
      return;
    }

    // Browser    
    this.realDevice.addEventListener('reject', () => this.emit('btnPress', enumDeviceBtnType.RejectCall));
    // ...
  }
}
```

When a browser `acceptcall`, `endcall`, ... is fired, we replicate the same behaviour as the electron SDK : sending a `btnPress` event with the corresponding type.

### Dealing with the client

We only want to handle the `attach` and `detach` event. But as the browser SDK doesn't trigger it automatically, we have to do you by ourselves. This class also extends `EventEmitter` so we can listen to events like the Electron SDK.

```js
export class GenericJabraClient extends EventEmitter {  
  constructor(realClient) {    
    super();
    this.realClient = realClient;
  
    this._bindClient();
  }
    
  _bindClient = () => {    
    if (isDesktop) {      
      this.realClient.on('attach', device => this.emit('attach', new GenericJabraDevice(device)));
      this.realClient.on('detach', () => this.emit('detach'));
      return;
    }
  
    // Browser    
    this.realClient.addEventListener('device attached', () => this.emit('attach', new GenericJabraDevice(this.realClient)));
    this.realClient.addEventListener('device detached', () => this.emit('detach'));
  
    this.realClient.getDevices().then(devices => devices.length && this.emit('attach', new GenericJabraDevice(this.realClient)));
  }
}
```

After initialization, we check if a device is present and trigger the `attach` event if so.

### Finally, The Initialization Flow

As mentioned previously, there is no dedicated `client` for the browser API, we have to pass the browser SDK to the instance of `GenericJabraClient`. This instance described above will take care of the dedicated events.

```js
class JabraFactory {
  static getJabraClient = () => {
    if (isDesktop) {
      const { createApiClient } = require('@gnaudio/jabra-electron-renderer-helper');
      return createApiClient(window.require('electron').ipcRenderer).then(client => new GenericJabraClient(client));
    }

    // Browser
    const jabraBrowser = require('@gnaudio/jabra-browser-integration');

    return new Promise((resolve, reject) => jabraBrowser.init()
      .then(jabraBrowser.getInstallInfo)
      .then((installInfo) => installInfo.installationOk ? resolve(new GenericJabraClient(jabraBrowser)) : reject()));
  }
}
```

## Conclusion

Jabra would make our life a lot easier if their Web and Desktop APIs were merged into one. Thanks to the Factory pattern, we were able to work around this issues. (** which allowed us to ... do something **)
