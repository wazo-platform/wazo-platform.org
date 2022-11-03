---
title: Testing Interactions Between Mobile Applications: A Bumpy Ride
date: 2019-02-22 13:14:00
author: Emmanuel QUENTIN
category: Wazo IPBX
tags: Mobile, testing
slug: testing-interaction-between-mobile-applications
status: published
---

![callkeep](https://user-images.githubusercontent.com/2076632/52963046-ca98b200-336c-11e9-8c82-590c0bed8839.gif)

For the past couple weeks, we've been working on the creation of automated integration tests for our new mobile application. This application is built with react-native and uses edge technologies like native WebRTC, native UI with ConnectionService or CallKit (see our library [callkeep](https://github.com/react-native-webrtc/react-native-callkeep)) and wake up push notifications.

Avoiding regressions on such a large application is a huge challenge. We are making big steps in the automation process to fulfill this goal.

## You Must Choose, but Choose Wisely

The first step of our journey was the choose a testing framework that would fit our needs. Software like Selenium or Appium have proven their value, but they are slow and flaky. At the end of our investigation, we've selected [Detox](https://github.com/wix/Detox) to run our tests. Detox generates less flaky tests, because it monitors the app and waits for interactions or requests to finish before moving on to the next instruction.

## A Telephony App: We Need More Power

Testing interactions on a single application is pretty straightforward: tap on a button and see what happens. But what if we have to test interactions between multiple devices? Detox doesn't document how to run two devices and check how they interact with each other. Some digging was required.

## Starting Another Device

To launch another device, we needed another instance of `Detox`, and to call `launchApp` on its `device` attribute:
```js
// Takes configuration from package.json (our tests are run with `yarn e2e:test:ios` or `yarn e2e:test:android` so can we check the environment variable `npm_lifecycle_event`)
const deviceConfig = require('../package.json').detox.configurations[process.env.npm_lifecycle_event === 'e2e:test:ios' ? 'ios.sim.debug' : 'android.emu.debug'];
const otherDetox = new Detox({ deviceConfig });
await otherDetox.device.launchApp();

const { expect: otherExpect, by: otherBy, element: otherElement } = otherDetox.device.deviceDriver.expect;
// Do something with `otherExpect`, `otherBy`, and `otherElement` to handle checks on the other device
```

Success! Another device is launched. But wait, why are all actions targeted at the new device and not the first one?!

## There Are Two Hard Problems in Computer Science...

And caching is one of them!

After a lot of hair pulling, we found that Detox uses a simple variable in the `expect.js` module to store the [`invocationManager`](https://github.com/wix/Detox/blob/a8e4bc0469e8ebb9be68bc863ecceb1166de704d/detox/src/ios/expect.js#L23). Further down, this module is required and the [invocation manager is set](https://github.com/wix/Detox/blob/a8e4bc0469e8ebb9be68bc863ecceb1166de704d/detox/src/devices/drivers/IosDriver.js#L15-L16).

And what happens when we create another instance of `Detox`? The [nodejs require cache](https://nodejs.org/api/modules.html#modules_caching) doesn't require the `expect.js` module again and the `invocationManager` is overridden when `IosDriver` calls `setInvocationManager`. As a result, our two instances of `detox` use the same `invocationManager`: the last one. That's why interactions occur only on the second device.

## Avoiding the Require Cache, Round 1

A first attempt to avoid nodejs caching the `invocationManager` was to wrap the module in a method:
```js
module.exports = function() {
	let invocationManager;
	function setInvocationManager(im) {
	  invocationManager = im;
	}

	// ...
	return { /**/	};
}
```
Then in the caller:
```diff
+ const configureExpect = require('../../ios/expect');
// ...

- this.expect = require('../../ios/expect');
+ this.expect = configureExpect();
```

This way, the `invocationManager` would be cached for each call of `configureExpect`.

This method works well, but mocking the module in unit tests would be complex. Because Jest doesn't know about all return attributes in our wrapper, every method of the module would have to be mocked.

## Avoiding the Require Cache, Round 2

Another way to avoid this cache is to make a class from the module. Set the `invocationManager` as an attribute and instantiate it as follows:
```diff
+ const IosExpect = require('../../ios/expect');
// ...
- this.expect = require('../../ios/expect');
- this.expect.setInvocationManager(new InvocationManager(this.client));
+ this.expect = new IosExpect(new InvocationManager(this.client));
```

Jest is also aware of each method of our class and can mock them automatically!

## Success!

After some research and some failures, we are now able to test interactions between multiple devices with Detox easily!

We've made a [PR from our journey](https://github.com/wix/Detox/pull/1144). Feel free to `+1` the pull request if you need that feature for your application.
