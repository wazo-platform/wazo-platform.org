Title: Creating a Cross Environment push-to-talk Application Using Wazo
Date: 2021-10-12 12:30:00
Author: Emmanuel QUENTIN
Category: Hackathon
Tags: VOIP, WebRTC, push-to-talk, react, expo
Slug: creating-cross-platform-push-to-talk-app
Status: published

## Creating a Cross Environment push-to-talk Application Using Wazo

During our last Hackathon in the wonderful Quebec, we thought about fun projects we can make to improve our knowledge of WebRTC, ReactJS and all the libraries around it.

Here some pictures of the super place where our hackathon took place:

![What a wonderful view](/images/blog/hackathon-2021/big.jpg)

![Our office (small)](/images/blog/hackathon-2021/inside.jpg)
![Can you spot François and Pascal ? (small)](/images/blog/hackathon-2021/lake.jpg)
![Looks like an album cover (small)](/images/blog/hackathon-2021/river.jpg)

### Finding an Idea

During our release phase, at the end of each sprint, everyone involved in the process meets up using [mumble](https://www.mumble.com/).
Why use Mumble in a company that develops telecommunication software? The answer is simple: our software lacks this simple and useful feature for technical people: **Push-to-talk**.

In day-to-day tasks, our customers don't need this kind of feature. That's why it was not at the top of our backlog. We're focusing our effort on their needs.
That's why we are currently developing a video conference application to allow external people to join our customer's conferences, simplifying the installation of a Wazo server through our administration application, improving our mobile application using native API, etc...

So the idea is simple: create an application that connects us to a conference, and add a push-to-talk feature that can be triggered by a keyboard shortcut.

We're Wazo, meaning «bird» in French; our colleague Pascal came up with an excellent name for the project: «Woodpecker» -- always pecking that tree the way we hit that push-to-talk button.

### Bootstraping the Project

After drawing some mockups, we considered various tools and libraries, with the goal of discovering and testing new ways to expand our skillset.

We're currently using ReactJS, Redux and WebRTC to develop our web application. The desktop application uses electron to wrap the web app and add some features like incoming call modal or better integration with headset commands like Jabra. We're also developing a mobile application using react-native, react-native-webrtc and react-native-callkeep a library that we've open sourced to help developers display incoming and ongoing native call UI.

Though we use [create-react-app](https://create-react-app.dev/) and [create-react-native-app](https://github.com/expo/create-react-native-app) to bootstrap our apps, we discovered that [expo](https://github.com/expo/expo-cli) now offers a new way to create web and mobile applications with a single code base. Using [expo-electron-adapter](https://github.com/expo/expo-electron-adapter) will be useful for us to create a desktop application with this same code base.

### Capturing User Keystrokes, a Difficult Challenge.

Our current application uses [react-hotkeys](https://github.com/greena13/react-hotkeys) to help users to answer, hangup, mute/unmute, pause or resume a call by pressing a single key. However, the library only works when the desktop application is focused or when the browser tab is displayed.

The main goal of a push-to-talk feature is to be able to hit some keys everywhere and be able to talk with people. So, we have to find another way to capture user keystrokes outside our application context.

#### For Web Application

Allowing developers to listen to keyboard events in other tab or when the browser is not focused is potentially a huge security flaw, as it can be used to create a keylogger and send credit card numbers, passwords, or sensitive information that you type. That's why browsers don't let us listen to keystrokes outside our application; we have to find another way.

One simple idea for the web application is to use the [Media Session API](https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API). This API allows one to listen for the play/pause button in recent keyboard even if the tab is not focused. In order to make it work, we have to play a sound in an `<audio />` tag:

```javascript
// Check if we are in a browser environment
if (typeof document !== 'undefined' && navigator.mediaSession) {
  audio = document.createElement('audio');
  audio.src = require('../../assets/silence.mp3');
  audio.loop = true;

  onPlay = () => navigator.mediaSession.playbackState = 'playing';
  onPause = () => navigator.mediaSession.playbackState = 'paused';

  audio.addEventListener('play', onPlay);
  audio.addEventListener('pause', onPause);

  // Later in the return function of a `useEffect` :
  // audio.removeEventListener('play', onPlay);
  // audio.removeEventListener('pause', onPause);

  // We the user interracts with the page :
  audio.play();

  navigator.mediaSession.setActionHandler('play', async function() {
    // User pressed the play button
    await audio.play();
  });

  navigator.mediaSession.setActionHandler('pause', function() {
    // User pressed the pause button
    audio.pause();
  });
}
```

#### For desktop application

Electron provides a [globalShortcut](https://www.electronjs.org/docs/api/global-shortcut) that could be great for our project as the doc says :
> You can use the globalShortcut module to detect keyboard events even when the application does not have keyboard focus.

But the only event we receive is when the user presses the shortcut, not when he releases it. With such constraint, the user would have to press the shortcut twice, that's not what we want.

After a little digging, we found [`iohook`](https://github.com/wilix-team/iohook), a node library that allows one to listen to keyboard events. As it's a nodejs library, we can add it in the electron main file and send events back to the renderer process using `ipc` :

```js
const ioHook = require('iohook');

ioHook.on('keyup', event => browserWindow.webContents.send('electron-keyup', event));
ioHook.on('keydown', event => browserWindow.webContents.send('electron-keydown', event));

ioHook.start();
```

In the react app context:
```js
const isMobile = typeof navigator != 'undefined' && navigator.product === 'ReactNative';

// Electron
if (!isMobile && window.require) {
  // Trick to avoid requiring electron in mobile
  System.import('electron').then((electron: any) => {
    electron.ipcRenderer.on('electron-keyup', (event: Object, message: Object) => {
      // We got a keyup event
    });
    electron.ipcRenderer.on('electron-keydown', (event: Object, message: Object) => {
      // We got a keydown event
    });
  });
}
```

### Using Wazo's JS SDK

We're using and improving our [Javascript SDK](https://github.com/wazo-platform/wazo-js-sdk) frequently, so using it to log in the user and join a conference was not the most challenging part:
```js
// Setting the wazo's server
Wazo.Auth.setHost('wazo.my-company.com');

// Authenticating the user 
const session = await Wazo.Auth.logIn(username, password);

// Joining a conference
const room = await Wazo.Room.connect({ extension: '8000' });

// When joining the room, mute the user:
room.on(room.ON_JOINED, () => {
  room.mute();
});

// When pressing the push-to-tak button or when a shortcut is pressed, unmute the user :
const onPush = () => {
	room.unmute();
};

const onRelease = () => {
	room.mute();
};
```

That's all! The SDK takes care of the rest: Setting up WebRTC (html elements, events, ...), connecting to the SIP signaling server (Asterisk), sending room events, ...

### Going Further

The project is not finished yet, we've stumbled upon some drawbacks with the build of `iohook` on certain architectures. That's a issue we should address, or maybe find another library to catch keystrokes outside an electron app.

We had to [eject](https://docs.expo.dev/expokit/eject/) our expo application in order to add `react-native-webrtc`, so we lost some cool features provided by expo during the process.

Another improvement would be to use the [accelerometer](https://react-native-sensors.github.io/), so we can check when the mobile device is in vertical position and trigger the talk position. When the device will go in horizontal position (eg: put on the table) the call could be muted.

Here's how the application looks on mobile:
![Screen (small-centered)](/images/blog/hackathon-2021/screen.jpg)

### Leaking Our Own Source Code

So that's it. Our own little push-to-talk app. Granted, it's not the most advanced, but considering the amount of time dedicated to it, it's not too shabby. The result of our hackathon can be found in the [woodpecker](https://github.com/wazo-platform/woodpecker) repository. Feedback is welcome!
