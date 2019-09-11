Title: New schedule jquery widget for upcoming XiVO
Date: 2011-03-25 09:26
Author: gbour
Category: Software
Tags: skaro, web-interface, schedule, javascript, jquery, software
Slug: new-schedule-jquery-widget-for-upcoming-xivo
Status: published

<span class="Apple-style-span"
style="font-size: 15px; font-weight: bold; ">How to use it</span>

Click once on the field with calendar icon to show the widget. Click
again to hide it (or on the cross at title bar right's).Once visible,
you can define your intervals:

1.  for months and days
    -   select each month/day individually (a selected one move from
        gray to yellow background)
    -   all/none button allow toggling all values at once

2.  for the time interval
    -   click down start or end toggle, then slide to adjust the value
    -   for a fine adjustment, use mouse wheel or up/down keyboard keys

NOTE: **A datetime is considered in the schedule if it match all
intervals (months, month days, week days and hours)**.

Lets see with a quick example:  
  
[![example.png](/images/blog/xivo-schedule/.example_s.jpg "example.png, mar. 2011")](/images/blog/xivo-schedule/example.png "example.png")

We have selected workdays from January to April, 8AM to 7PM.

-   all datetimes with time lower than 8AM or higher than 7PM are out of
    the schedule
-   2011, march 25 9.30AM is in schedule, while 2012, march 25 9:30AM is
    out (first is a friday, while last is a sunday)

  
  
  
  
  
  
  
  
  
  

### Developpers: Including xivo-schedule in you pages

While developped for xivo, it can easily be integrated in other
projects. xivo-schedule support jquery-ui themes and is multilingual
(only french and english available at the moment).  
  
xivo-schedule widget require jquery (&gt;= 1.5), jquery-ui (&gt;=1.8)
and optionally jquery.mousewheel
(<http://brandonaaron.net/code/mousewheel/docs>).

``` {style="font-size:small;"}
<link rel="stylesheet"   href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.11/themes/ui-lightness/jquery-ui.css"   type="text/css" media="all" /><script type="text/javascript" src="http://code.jquery.com/jquery-1.5.1.min.js"></script><script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.11/jquery-ui.min.js"></script><script src="jquery.mousewheel.min.js"></script>
```

Then include xivo-schedule javascript and css files. Note that you can
also include langpack(s) you want to use.

``` {style="font-size:small;"}
<link type="text/css" href="xivo.schedule.css" rel="stylesheet" /><script type="text/javascript" src="../src/xivo.schedule.js"></script><script type="text/javascript" src="../src/xivo.schedule-fr.js"></script>
```

xivo-schedule required a text input to be attached to. If you want to
get schedule intervals back, you also need 4 others text fields (one for
months, monthdays, weekdays and time intervals), which will be filled
with intervals raw value when the user will manipulate schedule widget.

``` {style="font-size:small;"}
    <form>
      <div style="float:left">
        <input id="schedule" type="text" /><br/>
      </div>

      <div style="float:left; margin-left: 100px;">
        <label for="sched-months">months :</label><input id="sched-months"    type="text" disabled /><br/>
        <label for="sched-monthdays">month days :</label><input id="sched-monthdays" type="text" disabled /><br/>
        <label for="sched-weekdays">week days :</label><input id="sched-weekdays"  type="text" disabled /><br/>
        <label for="sched-hours">hours :</label><input id="sched-hours"     type="text" disabled />
      </div>
    </form>
```

Finally, you initialize your schedule widget:

``` {style="font-size:small;"}
<script type="text/javascript">  $(function(){    $('#schedule').schedule({      'language': 'fr',      'inputs': {          'months'   : $('#sched-months'),          'monthdays': $('#sched-monthdays'),          'weekdays' : $('#sched-weekdays'),          'hours'    : $('#sched-hours')      },      'defaults': {          'months'   : '1,3-6,11,12',          'monthdays': '1,3,5,8,10,12-13,15,17,20,22,24-25,27,29',          'weekdays' : '1,4-6',          'hours'    : '08:35-17:30'      }    });  });</script>
```

and voila! see attached file for the complete sample.

**xivo-schedule can be downloaded from [our git
repository](git://git.xivo.io/xivo-dalek.git) or [on
github](https://github.com/gbour/xivo-schedule)**

</p>

