Title: Agile Tour Québec 2014
Date: 2014-11-25 18:24
Author: sduthil
Category: Software
Slug: agile-tour-quebec-2014
Status: published

On november 5th 2014 some members of the XiVO dev team were at the
Centre des congrès de Québec for the Agile Tour 2014. The attendance was
around 800 people, with a fair share of managers and developers. The
XiVO dev team having an agile process for the last couple of years was
interested in the new good practices and an opportunity to exchange
experiences with other people.

### First keynote by Michael Feathers (author of Working Effectively with Legacy Code)

The main idea we got from this keynote is the importance of metrics. I'd
like to compare this with code optimization: if you only read the code
and try to optimize everything that you find by only reading, you will
probably waste your time because you won't be optimizing in the right
spot. The first thing to do in order to optimize code is profiling: you
run the code and measure which portion of the code uses the most
resource (CPU, memory, etc.). Only then can you know where you should
put your efforts to get the best amelioration. In the same way, about
code quality, you may find some spots where the quality is pretty bad,
but you may miss the most important spot. The right metrics can give you
that: where you should put your efforts to get the best amelioration of
code quality and reduction of maintenance. Here are two examples:

-   for a given period, list the count of commits per file: it gives you
    the files that need the most maintenance, which are probably where
    you should improve code quality. Usually, 20% of the files get 80%
    of the commits.
-   evolution of the average length of source files: it gives you an
    idea of the "aging" of your code base. Usually, the average will
    tend to grow fast after some time.

One of the danger with metrics it to use them as goal instead of using
them as an indicator of success. For example, aiming for 100% unit-test
coverage or for a high number of new tests may result in better numbers
on paper, but the result in the code quality and maintainability could
be disastrous.Incomplete or badly designed tests adds complexity to the
software without adding value. In these situation, adding tests may only
increase the technical debt.

### Félix Antoine Bourbonnais – Agile coach

The introduction to this presentation was formulated around the
following question: "What is going to be the next big challenge that
your software will have to address in the next 5 or 10 years?"

The right answer is : "We don't care". This answer lead us to some best
practices to keep software maintainable and to be able to adapt to
changes:

-   Interfaces
-   Interfaces
-   Polymorphism
-   Interfaces

### Second keynote by Jurgen Appelo - author of Management 3.0

Most questions that M. Appelo receives from participants in his workshop
are about changing other people:

-   How can I make my team do...
-   How can we make the upper management understand that...
-   How can I change this person's ...

The answer to these questions in most cases is: don't. A keep to success
is to improve yourself, not others. Try and keep challenging your
techniques, behavior and see if you can do better.

His book is available for free on <http://m30.me> and contains a long
list of interesting ideas to get people to know their co-workers better
and share good experiences.

### Michael Ouellet - agile team leader

The main idea of this talk was: don't waste your precious brain time and
move forward, think constructive. To do that, you must be able to
identify what wastes your time. Based on the book Positive Intelligence
from Shirzad Chamine, M. Ouellet gives us a list of "saboteurs" which
represent types of behaviour that lead to a waste of time, such as the
Judge, the Victim, the Avoider or the Hyper-Achiever. We all have all
these saboteurs, and they all express to some degree. Identifying which
saboteur caused you to think this negative thought or do that
non-constructive action is the first step for blocking the saboteurs. M.
Ouellet insisted on two points: the worst saboteur is the Judge, it is
always there and the best course of action to reduce the effects of
saboteurs in a team is to show the example, not try to impose your
vision, joining the recommandation of J. Appelo.

References:

-   [http://positiveintelligence.com/ove...](http://positiveintelligence.com/overview/power-potential/ "http://positiveintelligence.com/overview/power-potential/")
-   [https://www.youtube.com/watch?v=-zd...](https://www.youtube.com/watch?v=-zdJ1ubvoXs "https://www.youtube.com/watch?v=-zdJ1ubvoXs")

### Hugo Emond

Hugo Emond presented the feedback from a SCRUM project with a team
distributed over two continents in different timezones. The presentation
was about the techniques that worked best to obtain good results. Some
best practices:

-   A first meeting between the members of the team
-   High quality tools for the meetings, webcam and microphones, the
    later being very important
-   100% presence on meetings, no cellphones, no mail, etc
-   Keep an informal communication channel open at all time to share non
    professional communication such as jokes and personal news
-   Respect and be aware of cultural differences
-   Keep the timezone in mind when asking for the awareness of team
    members

The missing point from this experience that could have benefited our
team is a way to do a good sprint review with many participants,
technical or not, from many locations. At the moment, we do conference
calls with a blog post to share screenshots and links. We are still
missing a good way to do our demos.

</p>

