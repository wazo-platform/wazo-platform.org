Title: A conference with Uncle Bob
Date: 2012-11-05 13:35
Author: gsanderson
Slug: a-conference-with-uncle-bob
Status: published

Hello to everyone following the XiVO blog ! My name is Gregory Eric
Sanderson Turcot Temlett MacDonnell Forbes. I've been working on the
XiVO software team for 2 months now and the time has come to publish my
first official blog post. Enjoy ;)

At the end of last september, the XiVO team had the amazing chance of
attending a talk given by none other than Robert C. Martin himself ! Mr.
Martin, also known as "Uncle Bob", is a highly experienced software
developer with over 30 years of experience. The subject of his talk was
seemingly simple: What should we expect from a professional software
developer ? More that you would think. Uncle bob divided his talk into
about a dozen different expectations. Here is my personal interpretation
for each expectation he gave.

You will not ship shit
----------------------

Pretty provocative for a first expectation, eh ?

Why is this even on the list ? If programmers are professionals, then
they should already be shipping quality code, right ? The reality is
that programmers have to deal with issues that can easily lower the
quality of their software:Tight deadlines, small budget, crappy code,
infuriating clients, overly complex architectures, etc. Bad habits are
hard to break, so when you start shipping shit, it becomes easier to do
so again and again.

But here's a thought: Software is being found increasingly more often in
critical systems, like pacemakers for example. What happens if a
programmer ships faulty software directly into a person's heart ? When
the software that wedevelop can tip the balance between life and death,
then as professionals, we should never need to "ship shit". At the very
least, we should always aim to never do so.

You will ship all the time
--------------------------

Stories about unkempt deadlines or missed release dates are all over the
internet. Worse yet, sometimes software is delivered on time, but
upgrades become catastrophic.

Let's face it, there will always be situations where a client who would
like additional feature X to be ready within 2 weeks, but in the end it
takes 2 months to develop. So what can you do to make the situation
better ? Well, by making sure you're always being ready to ship at a
moment's notice. Shipping all the time might seem impossible the first
time you consider it, but it forces you to develop certain habits that
make your software more stable. Namely,

-   **Easier deployments**. Your deployment strategy needs to be simple,
    fast, and automated. Once that's in place, you no longer need to
    plan your upgrades since you can re-use your automated procedure
-   **Client satisfaction**. The client no longer needs to wait to get
    the latest version of your software
-   **Less time wasted**. Less time spent on shipping and upgrades means
    more time to work on more important stuff

How do you ship all the time ? One way is through Continuous
Integration, but it isn't the only approach. What's important is to find
a way that works well with your software and your team.

Inexpensive Adaptability
------------------------

The concept of evolution is key here. Code that doesn't evolve is prone
to stagnation and becomes harder to adapt, leading to technical debt.
How do you make sure your code doesn't stagnate ? As Uncle Bob would
say: "you need to flex your code" You can test the adaptability of your
software by looking at how complex it would be to suddenly change a
major component of the system. For example: try changing the database,
use another protocol, redesign the UI. The less changes that are needed,
the more adaptive your code becomes. One example of potential
adaptability that you might consider is the SQL vs NoSQL debate. If you
suddenly needed to change from one to the other, how much effort and how
much code would you need to change ? The less there is, the better.

Extreme Quality
---------------

As professionals, we should always aim to produce the best work that we
can. Here's my personal list of what I consider to be quality work:

-   Clean code
-   Code that is easy to modify
-   Clear and concise documentation
-   Simple architecture designs
-   Tests that cover all known use cases
-   Reasonnable and honest estimates
-   Calm Attitude

Quality also means dealing with our mistakes. Some mistakes can be
simple to fix, others might be impossible to re-mediate. What's most
important, is that we always ask ourselves "What can I do so that I
don't repeat the same mistake next time ? "At the end of the day, we
should be proud of our job and the work we have done, knowing that we
have accomplished the best that was possible.

QA will find nothing
--------------------

Programmers are responsible for the quality of the code they develop.
Therefore, they should also be responsible for making sure that there
are no bugs in what they give to QA. Using QA as a fallback for writing
more code without checking for bugs is a bad habit to take. Small bugs
from time to time is an acceptable limit, but if QA comes back with a
list of bugs every time, then it's probably a sign that the programmer
isn't taking the quality of his code seriously. As Uncle Bob said during
the conference, "QA should find nothing. They should even ask themselves
why they exist"

We cover for each other
-----------------------

Teamwork isn't just about cooperation with other teammates, it's also
about sharing knowledge. When you have people in a team that specialize
in a certain domain, you risk losing all the experience that he's
acquired if ever he suddenly disappears. To make sure a team can
continue going forwards, even in unexpected situations, there should
always be more that one person who has the know how for any and every
Class or module in your code. How do you go about sharing that
experience ? One way is through pair programming, but it certainly isn't
the only way. Try finding what works best with all the members of your
team.

Honest estimates
----------------

Programmers estimate their tasks everyday, but how many of those
estimates are "honest" ? Honest estimates means giving a straight answer
instead of changing numbers to fit time constraints or a budget. It
means giving a time range (for example: 1 to 3 weeks) instead of a time
limit that will probably be busted. It also means readjusting an
estimate the moment you realize the first one won't work anymore.
Keeping estimates honest shows that you are commited to your work. It
also gives decision makers a better picture of the complexity of the
work at hand.

Automation
----------

One of the things Uncle Bob said that really struck me was "As people
whose job is to automate things, I can't believe how much time
programmers spend repeating the same mundane tasks". I have to admit, he
has a point. The time we spend writing code compared to the time we take
to test it can boggle the mind. That time that could be well spent
working on other tasks equally as important, like improving code
structure for example. Although tests can be automated through
techniques like TDD or BDD, the principle of automation can also apply
to any recurrent task that's part of your daily development tasks.

Let me give you an example from my team leader: At the beginning of
every sprint, he needs to generate a series of charts showing various
statistics about the project. Before, he would manually copy numbers in
a spreadsheet and generate the chart every week. Now that he's automated
the chart generation, he can spend more time with his team.

Continuous aggressive learning
------------------------------

"As programmers, we must learn to learn." Here are a few things that a
programmer needs to keep up with in order to do his job: hardware,
software, programming languages, operating systems, libraries,
frameworks. The speed at which these things can evolve is so quick that
it becomes ever more important to take the time to learn about changes
and keep up to date. Uncle Bob even suggested that the time you take to
learn these things should be separate from the time spent at work since
this represents a personal investment that enables you to stay
professional. Continuous learning is a key skill in our ever-evolving
profession. Those who fail to adapt risk falling behind.

Mentoring
---------

Another approach to continuous learning is to teach. Mentoring is a way
of checking if you have a mastery of your knowledge since you need to be
proficient with your subject to teach successfully. It is also a way of
guiding other people on the path to professional software development.
Finally, mentoring can also be seen as a form of team work: there will
be more people who share the same knowledge (see "We cover for each
other" above)

Conclusion
----------

I really enjoyed listening to Robert C. Martin's conference. I still
consider myself as a young programmer, and this talk has convinced me of
the importance of taking some personal time to investigate what I
personally need to change in order to, one day, proudly proclaim myself
as a "professional programmer". What I also appreciated from the talk
was Uncle Bob's focus on goals instead of techniques. In other words, no
matter what methodology or technology you prefer using (TDD, BDD, Agile,
Waterfall, C++, python, .net, java, or whatever else) we should never
lose sight of what we should be doing to stay proud about the best job
out there: programming.

That's it for my first blog post folks ! I hope you enjoyed it and look
forward to my next one. If you'd like to discuss more about what i've
written, you're more than welcome to leave comments.

</p>

