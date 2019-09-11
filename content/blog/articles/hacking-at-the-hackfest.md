Title: Hacking at the Hackfest
Date: 2012-11-08 13:45
Author: gsanderson
Slug: hacking-at-the-hackfest
Status: published

Hello once again XiVO followers ! What's this ? My first blog post has
barely been published and i've already written a second one ! But this
time, i'll be writing about something that will be more interesting for
1337 h@X0r\$ and the like: the Hackfest !

### Hackfest ? What's a Hackfest ?

The [Hackfest](http://www.hackfest.ca "Hackfest") is one of the biggest
events about computer security in the province of Quebec. This year,
more than 400 participants were treated to 2 days full of conferences
and hacking games like Lockpicking, Cyber warfare and Capture The Flag.

![Hackfest
cyberwar](/public/HackFest2012/.hackfest_cyberwar_m.jpg "Hackfest cyberwar, Nov 2012")

XiVO also participated in the Hackfest by giving a conference and
organising the XiVO pwn2own hacking game.

### What kind of conference ?

We gave a conference about the security and future of free
telecommunications, the slides are available in attachment of this post.
The conference was supposed to be given by our colleague [Nicolas
Bouliane](http://twitter.com/nicboul "Nicolas Bouliane's twitter feed"),
but unfortunately, he got sick a few days before the event. Me and my
SCRUM master gave the talk instead. Here's a picture of us during the
conference. As you can see, the room was pretty full !

[![Hackfest 2012: avencall
\#hf2012](http://farm9.staticflickr.com/8328/8147555929_6aa0caf977.jpg)](http://www.flickr.com/photos/hackfest2k9/8147555929/ "Hackfest 2012: avencall #hf2012 by hackfest.ca, on Flickr")

### What about the pwn2own ?

Hackers were given 48 hours to try and hack a standard XiVO server and
find the most exploits possible. As the game went on, clues were given
out through our twitter feed.

![XiVO twitter
feed](/public/HackFest2012/.xivo_twitter_feed_m.jpg "XiVO twitter feed, Nov 2012")

Once a hacker found an exploit, he could submit it to our scoreboard to
win points. At the end of the game, the top 3 teams with the most points
won cash prizes. Here's a screenshot of the scoreboard at the end of the
game.

![XiVO
Scoreboard](/public/HackFest2012/.xivo_score_board_m.jpg "XiVO Scoreboard, Nov 2012")

### So what happened ? Did you get hacked ?!

Yes ! As you can see from the scoreboard, 3 teams were able to find
quite a few exploits in XiVO. What surprised us most was the number of
hacks that were found on the web interface. Since XiVO is first and
foremost a telephony system, we thought that the hackers would
concentrate on hacking the telephone services (For example, control SIP
accounts, create fake telephones through the Provisionning service, DDoS
the Asterisk server) After all, the web interface is only used for
administrative purposes and isn't a critical piece of the XiVO server.
Instead, we got a total of 10 web exploits and only 1 telephone exploit.

### What happens now ?

The XiVO dev team is working on fixing all the exploits found during the
pwn2own. The fixes will be released in version 12.22 at the end of next
week.

All in all, we had great fun participating in the Hackfest. We're
already thinking about how we can make the game more exciting next year,
like how to encourage people to go explore more of XiVO's telephony
services.

Thanks again to the 3 teams who participated in XIVO's pwn2own
(RingZer0, Abed&Francis and Bitducks). We look forward to more hacking
next year !

</p>

