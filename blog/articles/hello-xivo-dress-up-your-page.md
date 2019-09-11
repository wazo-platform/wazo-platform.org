Title: Hello XiVO, dress-up your page
Date: 2012-11-05 15:58
Author: jhlavacek
Category: Software
Tags: web-interface, i18n, development
Slug: hello-xivo-dress-up-your-page
Status: draft

Our [last article on XiVO web
interface](/index.php?post/2012/10/29/Hello-XiVO%2C-add-your-own-web-page-to-XiVO-web-interface)
show how to add a new page and integrate it to one of menus. Let's have
a closer look at the page structure in order to get the XiVO
look'n'feel.

Menus and heading with user login panel can be added simply in a
following way:

~~~
$menu = &$_TPL->get_module('menu');
 $menu->set_top('top/user/'.$_USR->get_info('meta'));
 $menu->set_left('left/service/ipbx/'.$ipbx->get_name());
~~~


The `$_TPL` variable is an instance of the `dwho_tpl` class used to
generate the page. Using this variable you can add menus. The heading
with the current user login panel is added by the `set_top` method,
current user is available via the `$_USR` variable. The last line adds
the left menu panel. The variable `$ipbx` hold the name of IPBX used
(nowadays Asterisk) and it's reserved for interface customization.

A customized toolbar can be added by the following line:

~~~
$menu->set_toolbar('toolbar/service/ipbx/'.$ipbx->get_name().'/call_management/recording');
~~~


and preparing the “recording.php” file in the
@@src/tpl/www/bloc/menu/toolbar/service/ipbx/asterisk/call\_management/.
See some other file in the toolbar directory for an example.

The BODY!!!

~~~

~~~


The page is generated and displayed using the `display()` method of the
`dwho_tpl` class :

~~~
$_TPL->display('index');
~~~


The parameter given is the page used to process general tasks like check
login, load css and js files, variable instantiation etc. This page is
loaded from `src/www/service/ipbx/index.php`.Used head and foot are
defined in the template and inserted automatically based on templates in
`src/tpl/www/bloc/`).An example of a complete page in colours of XiVO:

~~~
<?php
    $menu = &$_TPL->get_module('menu');
    $menu->set_top('top/user/'.$_USR->get_info('meta'));
    $menu->set_left('left/service/ipbx/'.$ipbx->get_name());
    //$menu->set_toolbar('toolbar/service/ipbx/'.$ipbx->get_name().'/call_management/recording');

    $_TPL->display('index');
  ?>
~~~


</p>

