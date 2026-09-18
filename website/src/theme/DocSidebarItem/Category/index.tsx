import { useLocation } from '@docusaurus/router';
import Category from '@theme-original/DocSidebarItem/Category';
import type { Props } from '@theme/DocSidebarItem/Category';
import type { MouseEvent } from 'react';

const samePath = (a: string | undefined, b: string) =>
  !!a && a.replace(/\/$/, '') === b.replace(/\/$/, '');

/* Two gaps in the stock category header:

   1. A category can only `link` to a doc of its own plugin instance, so the UC
      entries mirrored into docsSidebar (see sidebars.ts) carry their target in
      customProps. Promoting it to item.href is all the theme needs to render a
      clickable header.

   2. On the page that header already points at, clicking it re-navigates to
      where you already are and forces the section open. There the row should
      behave as the collapse toggle sitting next to it instead.

   Props that are not the theme's own land on its <Link>, and the spread comes
   last, so onClick below replaces the handler it would have used. */
const CategoryWrapper = (props: Props) => {
  const { pathname } = useLocation();
  const { href: linkedHref } = (props.item.customProps ?? {}) as {
    href?: string;
  };
  const href = props.item.href ?? linkedHref;
  const item = href ? { ...props.item, href } : props.item;

  if (!samePath(href, pathname)) {
    return <Category {...props} item={item} />;
  }

  const toggleInstead = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    event.currentTarget.parentElement
      ?.querySelector<HTMLButtonElement>('button.menu__caret')
      ?.click();
  };

  return <Category {...props} item={item} {...{ onClick: toggleInstead }} />;
};

export default CategoryWrapper;
