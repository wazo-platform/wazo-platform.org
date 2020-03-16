import React, { useEffect, useState } from 'react';
import { Link } from "gatsby"

const renderLinksRecurse = (linksObject) => {
  const { self, ...subLinks } = linksObject;
  if(!self) {
    // @todo: support upgrade/19-03 folder
    return <li><Link to="#">@TODOOOO folder without self ?</Link></li>
  }

  const subLinksKeys = Object.keys(subLinks);
  const itemKey = self.path.replace(/\//g, '-');

  if(subLinksKeys.length > 0) {
    return (
      <li key={itemKey}>
        <a href="#">{ self.title }</a>
        <ul>
          { subLinksKeys.map(subLinksKey => renderLinksRecurse(subLinks[subLinksKey])) }
        </ul>
      </li>
    )
  }else{
    return (
      <li key={itemKey}>
        <Link to={self.path}>{ self.title }</Link>
      </li>
    )
  }
}

export default () => {
  const [links, setLinks] = useState(null)

  useEffect(() => {
    fetch('/json/uc-doc-submenu.json', {
      method: 'GET',
      headers: {}
    }).then(response => response.json()).then(data => {
      setLinks(data['uc-doc']);
    })
  }, []);

  const renderLoading = () => <p className="secondary-navigation-empty">Loading ...</p>

  const renderLinks = () => {
    return (
      <ul>
        <li><Link to="/uc-doc/">Wazo Documentation</Link></li>
        { renderLinksRecurse(links['introduction']) }
        {/* @todo: installation we should add <Link to="/install/unified-communication/">Install System</Link> */}
        { renderLinksRecurse(links['installation']) }
        { renderLinksRecurse(links['upgrade']) }
        { renderLinksRecurse(links['system']) }
        {/* @todo: Should we should ecosystem */}
        { renderLinksRecurse(links['ecosystem']["devices"]) }
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
