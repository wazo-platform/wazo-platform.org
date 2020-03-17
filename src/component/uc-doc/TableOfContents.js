import React, { useEffect, useState } from 'react';
import { Link } from "gatsby"

const renderLinksRecurse = (linksObject) => {
  const subLinksKeys = Object.keys(linksObject);

  if(subLinksKeys.length >= 2) {
    const { self, ...subLinks } = linksObject;

    if(!self) {
      console.log(subLinksKeys, linksObject)
    }

    return (
      <li>
        <a href="#">{ self ? self.title : '@todo'  }</a>
        <ul>
          { Object.keys(subLinks).map(subLinksKey => renderLinksRecurse(linksObject[subLinksKey])) }
        </ul>
      </li>
    )

  }else if(subLinksKeys.length === 1){
    return (
      <li>
        <Link to={linksObject[subLinksKeys[0]].path}>{ linksObject[subLinksKeys[0]].title }</Link>
      </li>
    )
  }

  return <li>@todo no sublinke keys ???</li>
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
