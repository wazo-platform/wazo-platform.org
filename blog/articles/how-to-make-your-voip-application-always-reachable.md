Title: How to Make your VoIP Application Always Reachable
Date: 2019-03-19 12:30:00
Author: Emmanuel QUENTIN
Category: Wazo IPBX
Tags: Mobile, notification, VoIP, CallKit, ConnectionService, PushKit
Slug: how-to-make-your-voip-application-always-reachable
Status: published

![call-keep](https://user-images.githubusercontent.com/2076632/54532019-213ddf80-495d-11e9-85ee-7d2aa38a3fe9.gif)


Making a professional VoIP mobile application can sometimes be a huge challenge, especially when we have to make sure that our customer should be  notified when a call occurs.

Our application is always connected with our server via WebSocket, but there are many situations when this connection can be broken: Depending on the manufacturer of the device, when the application comes to background the connection is closed after a delay of 10 to 15 minutes. The connection can also be closed when the user closes the application.

We can't force the application to stay foreground, so how can we get rid of theses limitations?

## Poor Man's Solution: Push Notification

At the first time, we have set up Push Notification thanks to Firebase Cloud Messaging. When the user receives a call, we can detect if the websocket connection status and send a push if the application is not connected.

This solution is a first good step, but the user experience is very poor. Notifications are meant to inform users of past events, not for real-time ones. Furthermore the sound of notifications is always a short buzz, too short to warn about an important event.

## Apple and Google to the Rescue

Hopefully, mobile application framework providers see the lack of features and introduced [CallKit](https://developer.apple.com/videos/play/wwdc2016/230/) for iOS and ConnectionService for Android. These frameworks can be used to display the native incoming call UI of the system, interact with Bluetooth and phone systems in cars (Android Auto and CarPlay).

At Wazo we use React Native to build our mobile application, the community of developers is very large and we easily found a library called [react-native-callkit](https://github.com/ianlin/react-native-callkit) to handle CallKit on iOS but there was nothing to deal with ConnectionService.

## A Star is Born

A thing I love with Wazo, it's the commitment to its values around FOSS. We use open source everyday and contribute to it. We've [open sourced](https://github.com/wazo-platform/) everything since the beginning of our journey. When we saw the opportunity of developing a software that the community can benefit we've opened our IDE and start coding.

Developing a react-native module in Java is very easy, even if Java was not preferred language, and after 3 days we ended with a working module that integrates all features of ConnectionService. 

![ConnectionService](https://user-images.githubusercontent.com/2076632/54477272-c7161080-47dc-11e9-939e-f6d1faa49840.png)

## Improve the Developer Experience

So we now have 2 libraries dealing with the same goal: displaying incall system UI. But why should we install, setup and abstract 2 libraries with the same point ? 
`react-native-callkit` uses the name of the iOS Framework, it would be misunderstood if we integrate the Android feature in it. So we've decided to fork it and create a new [`react-native-callkeep`](https://github.com/wazo-platform/react-native-callkeep) repository with both Android and iOS implementation.

With it, we can seamlessly notify both Android and iOS users of an incoming call, and even using Wazo to make calls from the native Phone application:

## But Wait, How Can it Solve Our Problem ?

Indeed, we still need a way to inform the application that a call occurs so it can display the incall UI. But how to do it without WebSocket?
With push Notification of course !

But not the one we discuss before, the one specific to VoIP: [PushKit](https://developer.apple.com/documentation/pushkit) for iOS and [FCM data only-message in background](https://rnfirebase.io/docs/v4.0.x/messaging/receiving-messages).

After implementing [`react-native-voip-push-notification`](https://github.com/ianlin/react-native-voip-push-notification) and [`react-native-firebase`](https://github.com/invertase/react-native-firebase) we are now able to wake of the application when receiving a call and then display the native UI through `react-native-callkeep`.

## What's Next?

The telecom open source community is very large and we have a lot of excellent developers around it. We are considering creating a [_react-native-webrtc_](https://react-native-webrtc.discourse.group/) organization so we can provide common software, integrate all our libraries that we have in common and be able to follow one roadmap together.
