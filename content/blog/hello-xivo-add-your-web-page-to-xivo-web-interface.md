Title: Hello XiVO, Add Your Web Page to XiVO Web Interface
Date: 2012-10-29 08:33
Author: jylebleu
Category: Software
Tags: development, i18n, web-interface
Slug: hello-xivo-add-your-web-page-to-xivo-web-interface
Status: published

XiVO can be managed using a web interface. This interface is developed
in PHP language using a XiVO specific framework.

The idea of this post is to begin to demystify XiVO web interface
development.

#### Setting The Development Environment

First of all, we are going to set up of development environment. The
best is to enable nfs mount on your development workstation and to mount
the web interface development directory onto your XiVO virtual
machine.If your development projects is located in /projects/xivo-skaro,
the mount command can be :

~~~
mount -t nfs devipaddress:/projects/xivo-skaro/web-interface/src /usr/share/pf-xivo-web-interface
~~~


Now each time you will modify a file within the web-interface directory,
you can check your update by refreshing your browser.

#### XiVO Hello World Page

So let's start by writing a simple web page to display "Hello XiVO
world", doesn't remind you something ?

#### XiVO Actions, Applications and Objects.

![webi\_src.png](/images/blog/xivosoft/webi_src.png "webi_src.png, oct. 2012")XiVO
web interface is mainly composed of three types of elements :

-   actions, this is kind of controller, and will route the action to be
    done (list, create, edit) to the proper application
-   applications, to be considered as the business layer, contains the
    algorithm to be applied
-   objects, mainly where the persistence takes place.

There are many other components, but let's start first be this simple
view.

So if we need to display something, we have to follow these necessary
steps :

-   Write a simple PHP page as an action
-   Add this action in the authorized control list
-   Add it to the proper menu
-   Link the menu generated URL to the proper URL
-   Add necessary translations to XiVO translation files

### Writing The Page

Let's start with a simple page that we want to be displayed in the menu
"services -&gt; IPBX -&gt; Call management", edit a file
xivo-skaro/web-interface/src/action/www/service/ipbx/asterisk/call\_management/hellowivo.php

~~~
<?php
	echo "Hello XiVO world !";
?>
~~~


### XiVO Authorization Framework

You cannot still browse this new page because this page is not declared
within XiVO authorization framework. The list of available pages is
located in the file
xivo-skaro/web-interface/src/object/objectconf/acl/user.inc.Edit this
file and add this new action.

~~~
....
$array['tree']['service']['ipbx']['call_management']['pickup'] = true;
$array['tree']['service']['ipbx']['call_management']['schedule'] = true;
$array['tree']['service']['ipbx']['call_management']['cel'] = true;
$array['tree']['service']['ipbx']['call_management']['helloxivo'] = true;
.....
~~~


Now you can browse the page https://&lt;your xivo
host&gt;/service/ipbx/index.php/call\_management/helloxivo.

Create a XiVO user (menu Configuration-&gt; Management -&gt; Users) and
check the authorizations for this user (click on the small key icon next
to the user) and you will see that a new item appears under call
management.![webi\_acl.png](/images/blog/xivosoft/.webi_acl_m.jpg "webi_acl.png, oct. 2012")

### Translation

You can also note that an error message 'missing translation' is
displayed. This is a special marker to be sure that nobody forget to
write the translation strings. These translations are located in
directory src/i18n were a directory per language can be find.

Edit the file en\_US/conf/acl.i18n and add the translation
service-ipbx-call\_management-helloxivo and to not forget to add the
french translation, as in XiVO we always complete the french and english
translation.

Now we can display the new page, and can authorize a user to use this
new page, still to do is to be able to use this new page using XiVO
menu.

### XiVO Menu Entries

Edit
xivo-skaro/web-interface/src/tpl/www/bloc/menu/left/service/ipbx/asterisk.php,
add the menu entry :

~~~
........
		if(xivo_user::chk_acl('call_management','cel') === true):
			echo	'<dd id="mn-call_management--cel">',
				$url->href_html($this->bbf('mn_left_callmanagement-cel'),
						'service/ipbx/call_management/cel'),
				'</dd>';
		endif;
		if(xivo_user::chk_acl('call_management','helloxivo') === true):
			echo	'<dd id="mn-call_management--helloxivo">',
				$url->href_html($this->bbf('mn_left_callmanagement-helloxivo'),
						'service/ipbx/call_management/helloxivo'),
				'</dd>';
		endif;
		echo	'</dl>';
	endif;

........
~~~


Fix the translation by adding in
xivo-skaro/web-interface/src/i18n/en\_US/tpl/www/bloc/menu/left/service/ipbx/asterisk.i18n
the translation to mn\_left\_callmanagement-helloxivo

The menu is now correctly displayed, but you still cannot click on it to
display your new page. We must now register the menu URL within the XiVO
framework.

### XiVO URL Routing

Edit xivo-skaro/web-interface/src/object/objectconf/url.inc and add the
URL translation

~~~
.......
$array['service/ipbx/call_management/schedule'] = 'service/ipbx/index.php/call_management/schedule/';
$array['service/ipbx/call_management/voicemenu'] = 'service/ipbx/index.php/call_management/voicemenu/';
$array['service/ipbx/call_management/cel'] = 'service/ipbx/index.php/call_management/cel/';
$array['service/ipbx/call_management/helloxivo'] = 'service/ipbx/index.php/call_management/helloxivo/';

.......
~~~


Now you may click on the new menu entry and display the Hello XiVO world
page

![webi\_hello\_menu.png](/images/blog/xivosoft/webi_hello_menu.png "webi_hello_menu.png, oct. 2012")As
you may notice this page is not displayed using XiVO look and feel, but
that's another story.

</p>

