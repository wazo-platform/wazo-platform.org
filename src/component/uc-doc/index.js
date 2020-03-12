import React from 'react';
import Helmet from 'react-helmet';
import { Link } from "gatsby"
import Layout from '../Layout';

const breadcrumbs = [{ link: '/uc-doc', label: 'UC Use Case Doc', active: true }]

export default ({ pageContext: { content, title = 'Home' }}) => (
  <Layout pageTitle={`UC Use Case Doc: ${title}`} breadcrumbs={breadcrumbs} className="contribute">
    <Helmet>
      <title>{title} - UC Use Case Doc - Wazo Platform</title>
    </Helmet>

    <div className="container principal">
      <div className="main-content main-content-on-right-side">
        <div className="main-content-left-col">
          {/* @todo... make a walker to auto-generate menu from folder structure */}
          <div className="secondary-navigation">
            <h2>Table of Contents</h2>
            <ul>
              <li><Link to="/uc-doc/">Wazo Documentation</Link></li>
              <li><Link to="/uc-doc/introduction/">Introduction</Link></li>
              <li>
                <Link to="/uc-doc/installation/">Installation</Link>
                <ul>
                  <li><Link to="/install/unified-communication/">Install System</Link></li>
                  <li><Link to="/uc-doc/installation/postinstall/">Post install</Link></li>
                </ul>
              </li>
              <li><Link to="/uc-doc/upgrade/">Upgrade</Link></li>
              <li><Link to="/uc-doc/system/">System</Link></li>
              <li><Link to="/uc-doc/ecosystem/devices/">Devices</Link></li>
              <li><Link to="/uc-doc/administration/">Administration</Link></li>
              <li><Link to="/uc-doc/contact_center/">Contact Center</Link></li>
              <li><Link to="/uc-doc/high_availability/">High Availability</Link></li>
              <li><Link to="/uc-doc/api_sdk/">API/SDK</Link></li>
              <li><Link to="/uc-doc/contributors/">Contributors</Link></li>
              <li><Link to="/uc-doc/troubleshooting/">Troubleshooting</Link></li>
              <li><Link to="/uc-doc/community/">Community Doc</Link></li>
              <li><Link to="/uc-doc/attribution/">Attribution</Link></li>
            </ul>
          </div>
        </div>

        <div className="main-content-right-col" dangerouslySetInnerHTML={{ __html: content}} />
      </div>
    </div>
  </Layout>
);
