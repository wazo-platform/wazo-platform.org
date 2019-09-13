Title: Some more internationalization in XiVO (part 1)
Date: 2011-12-09 16:34
Author: sduthil
Category: Software
Tags: xivo 1.2, xivo, software, skaro, i18n
Slug: some-more-internationalization-in-xivo-part-1
Status: published

We recently had a few bugs in XiVO about non-ASCII characters, mainly
accented character, as we love them in French. We fixed the bugs, but
there will certainly be more. We then decided to push the test a little
further and try to flood a few data pipes with non-european Unicode
characters, to see if potentially anything could flow in those pipes.

Here's the result :![Japanese XiVO
Client](/images/blog/xivosoft/xivoclient-japanese.png "Japanese XiVO Client, déc. 2011")

We translated a few text fields in Japanese, even though it's probably
not perfect Japanese, it's a little better than plain stupid automatic
translation, thanks to one of our team members who knows a bit about
Japanese. Japanese Caller ID are also displayed fine in softphones, we
did not try real phones (yet).

This exercise had multiple benefits :

-   it allowed us to test the [XiVO Client internationalization
    procedure](https://wiki.xivo.io/index.php/XiVO_1.2-Skaro/CTI_XiVO_Client_Qt_Developer#Add_a_translation_for_the_XiVO_Client)
-   we know Unicode is accepted in the main modules of XiVO
-   we have the beginning of a Japanese translation for the XiVO Client
-   it was not very long, 3 hours tops
-   it was fun !

</p>

