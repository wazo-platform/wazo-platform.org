Title: Solving the emergency call prioritization issue with programmable telecom
Date: 2019-04-26 15:45:00
Author: Jérome Pascal
Category: Hackathon
Tags: emergency, programmable telecom, hackathon, voip
Slug: solving-the-emergency-call-prioritization-issue-with-programmable-telecom
Status: published



## A CRITICAL PAIN POINT FOR EMERGENCY CALL SERVICES

With the advent of the ubiquitous cell phone, the task of the emergency contact centers to prioritize a huge number of calls has become a tough challenge. The kind of challenge that needs to aggregate heterogenous pieces of technology to be addressed efficiently.

In the past, when a damaging event would occur - may it be a car accident, a terrorist attack or a climate disaster - only a limited number of people went to the nearby pharmacy or to the closest phone booth to warn the emergency service. In these times, adequate staffing was not so difficult for emergency contact centers: the call operator capacity was a mere function of the number of incidents. 

Now, with so many devices in so many hands, should a mishap take place in a crowded place, you can be sure that everyone will try to reach the emergency contact center at the same time. The operators are then overwhelmed by a large number of simultaneous calls which all convey inefficiently the same pieces of information. Bad luck for the absent-minded woodcutter who left his chain saw inappropriately on at the same time a terrorist attack is taking place: our clumsy woodcutter will not be able to reach any emergency operator. 

The situation could be described as an unintended yet effective denial of service attack.

We will show here, how in less than a 3-day period - during a short hackathon - a team of developers, with no prior knowledge of the Wazo programmable platform, was able to put in place an effective solution to this prioritization issue, and save lives. 


## DEMONSTRATION OF THE FLEXIBILITY AND SIMPLICITY OF USE OF THE WAZO PROGRAMMABLE PLATFORM

By solving this issue, our hidden objective was to demonstrate how easy it is to create a useful feature in a very short time frame based on the Wazo open programmable communication platform.


## THE SETTING

The team gathered in an apartment that we rented on the famous place of the Opera, in Paris downtown.

![opera](../images/blog/hackathon/2.png){ width=50% }


The first morning was dedicated to get to know each other and also to share and explain the Wazo programmable platform, its ambition, its purpose and how it works.

In the afternoon, it was agreed to build a mini emergency call center that could automatically prioritize calls - even before an operator picks up the call - depending on what the person would say in the [IVR](https://en.wikipedia.org/wiki/Interactive_voice_response). Overall the user story was: when calling an emergency service, if the IVR hears "heart attack" or similar keywords, the priority given to the call would be higher and therefore an operator would answer the call.

All this, of course, in full web with a phone using WebRTC.


## HOW DID IT GO? 

We formed several groups of people according to their favourite taste: C lovers, Python devotees or JavaScript aficionados.

Our initial plan was that, during a call, we would:

- Retrieve the real-time feed in a websocket;
- Send it to a tool to transcribe the feed into text;
- Then notify the result of the text analysis in the Wazo websocket service.

Unfortunately, it was not possible to do this, based directly on Asterisk. Still, there were existing alternative ways to proceed: 

- through EAGI;
- through a project that can be found on GitHub: https://github.com/CyCoreSystems/audiosocket;
- through Freeswitch: https://github.com/Nexmo/wsbridge;

We were not happy with these ways to proceed because it was using the dialplan, and because the offered solutions were not in line with the spirit of the Wazo programmable platform. We decided to write a module in Asterisk to retrieve the voice feed in a websocket.
For those who can’t wait, this module can be found here: https://github.com/sboily/wazo-hackathon-asterisk-stream-module

Meanwhile, the other team was looking for the right transcription engine. Google Speech appeared as a fine solution for our purpose. We had to detail here to the team some Wazo components and explain how to insert the module. The impatient person can find the module source here: https://github.com/sboily/wazo-hackathon-wazo-ctid-module

We then regrouped to draw this wonderful Miró-style piece of art:


![postit](../images/blog/hackathon/3.png){ width=30%; float: left; }
![miro](../images/blog/hackathon/4.png){ width=33.5%; float: right; }


So, the decision was made to build an Asterisk module where a given channel would get the voice feed in a websocket, for any incoming call within the Wazo voice programmable application.

Then a JavaScript module would display the ongoing calls as well as the live text transcription. If a preselected keyword was found, it would be highlighted and the call itself would be prioritized.

![interface](../images/blog/hackathon/1.png){ width=80% }

Source of this interface could be found here : <https://github.com/wazo-platform/frontend-hackathon-emergency >

The next day, we started the dev phase, each group apart working on its own subject.

In the afternoon, we already had all our functional pieces ready. Time had come to aggregate those pieces. The project seemed to progress well. But in the evening everything was still not glued together. The Asterisk module still returned some segfault because the first implementation was not robust enough. We were almost done with the second implementation at the beginning of the evening but… it was definitely high time to have a dinner! 

The next and last day, we first showcased to the participants our internal daily routine (daily scrum). After that, it took us no more than 15 minutes to have our demo up and running. 

Then began a very funny time when we could test and try our demo. We decided to play the “Neither yes, nor no” game. Once the call was picked up, the operator tried to push the guest to say either “Yes” or “No”. Whenever the guest said either of the two words, the call was automatically ended. 

We had plenty of time to stage our demo. And we could indeed showcase our IVR speech keyword detection demo in front of our colleagues and soon-to-be colleagues who joined us in the evening. Everything went so well that it was finally decided during our sprint retrospective to share our work.


## FUNCTIONAL CONCLUSION

This live speech-to-text keyword detection demo was a very basic - yet useful - way to help emergency call centers enhance the quality of their services. With the Wazo programmable platform, we offer the opportunity to develop much more sophisticated ways to deal with peak visitor encumbrance, including automatic platform scaling, location-based sorting and routing, coupling IVR and AI, … 


## KEY TAKEAWAYS

- We had a lot of fun during these three days and were able to meet talented and really nice developers. It was a great opportunity to share our passion for our project.

- The functional output of this hackathon was quite interesting and allowed us to produce very encouraging results in a very short time frame based on the Wazo development platform.

We would like to thank the participants, but also the part of the Wazo Quebec team who went to France to host this hackathon. We will clearly do this type of event again in the future.



In conclusion, we remind you that Wazo is still [hiring developers](http://wazo.io/#jobs) in Canada or in France, or as a talented remote developer anywhere on the globe. So, if you have any interest in open-source programmable telecom, please let us know!

Wazo, unlock your communication.
