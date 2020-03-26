import React, { useEffect, useState } from 'react';
import { Link } from "gatsby"

import { tableOfContentLinksOrdering } from './utils'

// Generate openMenu based on the current URL
const generateDefaultOpenMenu = () => {
  const pathParts = typeof window === 'object' ? window.location.pathname.split("/") : [];
  const defaultOpenMenus = [];

  pathParts.forEach((part, index) => {
    if(index > 0) {
      const partialParts = pathParts.slice(0, index + 1);
      defaultOpenMenus.push(generateKeyFromPath(partialParts.join("/")))
    }
  })

  return defaultOpenMenus;
}

const generateKeyFromPath = (path) => {
  let keyPath = path;

  // Remove starting slash
  if(keyPath[0] === "/") {
    keyPath = keyPath.slice(1, keyPath.length)
  }

  // Remove ending slash
  if(keyPath[keyPath.length - 1] === "/") {
    keyPath = keyPath.slice(0, keyPath.length - 1)

  }

  return keyPath.replace(/\//g, '-')
}

export default () => {
  const defaultOpenMenus = generateDefaultOpenMenu();
  const [links, setLinks] = useState(null)
  const [openMenus, setOpenMenus] = useState(defaultOpenMenus)
  let undefinedKeyIndex = 0;

  useEffect(() => {
    fetch('/json/uc-doc-submenu.json', {
      method: 'GET',
      headers: {}
    }).then(response => response.json()).then(data => {
      setLinks(data['uc-doc']);
    })
  }, []);


  // Helpers
  // --------
  const getListItemClasses = (currentClass, itemKey) => {
    const openClassName = openMenus.includes(itemKey) ? 'open' : '';
    const currentClassName = defaultOpenMenus.includes(itemKey) ? 'current' : '';

    return [currentClass, openClassName, currentClassName].filter(className => Boolean(className)).join(" ");
  }

  const formatLinkTitle = title => title.replace(/\\/g, "");

  // Handler
  // ---------
  const handleMenuClick = (e, itemKey) => {
    e.preventDefault();

    if(openMenus.includes(itemKey)) {
      setOpenMenus(openMenus.filter(menuKey => menuKey !== itemKey))
    }else{
      setOpenMenus([...openMenus, itemKey])
    }
  }

  // Render functions
  // ---------
  const renderLoading = () => <p className="secondary-navigation-empty">Loading ...</p>

  const renderLinksRecurse = (linksObject) => {
    const subLinksKeys = Object.keys(linksObject);
    let itemKey;

    if(subLinksKeys.length >= 2) {
      const { self, ...subLinks } = linksObject;
      if(self) {
        itemKey = generateKeyFromPath(self.path);
      }else{
        itemKey = `undefined-self-${undefinedKeyIndex}`
        undefinedKeyIndex++;
      }

      let titlesSortedKeys = Object.keys(subLinks).sort((a, b) =>  {
        // Reverse order when version in title
        if(/\/upgrade_notes_details\/[0-9]/.test(subLinks[a].self.path)) {
          return subLinks[a].self.title > subLinks[b].self.title ? -1 : 1
        }else{
          return subLinks[a].self.title > subLinks[b].self.title ? 1 : -1
        }
      })

      // Extra sorting
      titlesSortedKeys = tableOfContentLinksOrdering(itemKey, titlesSortedKeys)

      return (
        <li key={itemKey} className={getListItemClasses('seconday-navigation-submenu', itemKey)}>
          <a href={self.path} onClick={(e) => handleMenuClick(e, itemKey)}>{ self ? formatLinkTitle(self.title) : 'More'  }</a>
          <ul>
            { titlesSortedKeys.map(subLinksKey => renderLinksRecurse(linksObject[subLinksKey])) }
          </ul>
        </li>
      )

    }else if(subLinksKeys.length === 1){
      itemKey = generateKeyFromPath(linksObject[subLinksKeys[0]].path);

      return (
        <li key={itemKey} className={getListItemClasses('', itemKey)}>
          <Link to={linksObject[subLinksKeys[0]].path}>{ formatLinkTitle(linksObject[subLinksKeys[0]].title) }</Link>
        </li>
      )
    }
  }

  const renderLinks = () => {
    return (
      <ul>
        <li><Link to="/uc-doc/">Wazo Documentation</Link></li>
        { renderLinksRecurse(links['introduction']) }
        { renderLinksRecurse(links['installation']) }
        { renderLinksRecurse(links['upgrade']) }
        { renderLinksRecurse(links['system']) }
        { renderLinksRecurse(links['ecosystem']) }
        { renderLinksRecurse(links['administration']) }
        { renderLinksRecurse(links['contact_center']) }
        { renderLinksRecurse(links['high_availability']) }
        { renderLinksRecurse(links['api_sdk']) }
        { renderLinksRecurse(links['contributors']) }
        { renderLinksRecurse(links['troubleshooting']) }
        { renderLinksRecurse(links['community']) }
        { renderLinksRecurse(links['attribution']) }
      </ul>
    )
  }

  return (
    <div className="secondary-navigation">
      <h2>Table of Contents</h2>
      { links ? renderLinks() : renderLoading() }
    </div>
  );
}
