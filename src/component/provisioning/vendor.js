import React  from 'react';
import Helmet from 'react-helmet';

import Layout from '../layout';
const { slugify } = require('../../utils');

const breadcrumbs = [{
  url: '/provisioning/vendors.html', label: 'Provd plugins',
}];

export default ({ pageContext: { name, vendor } }) => (
  <Layout breadcrumbs={breadcrumbs} currentPageName={name}>
    <Helmet bodyAttributes={{ class: 'body-primary' }}>
      <title>Provd plugins for {name} - Wazo project documentation for developers</title>
    </Helmet>
    <div className="doc-wrapper">
      <div className="container">
        <div id="doc-header" className="doc-header text-center">
          <h1 className="doc-title">{name}</h1>
        </div>

        <div className="section-block">
          <div className="row">
            {Object.keys(vendor).map(phoneName => (
              <div className="col-md-4 col-12 mb-3">
                <div className="theme-card">
                  <a className="phone-picture" href={`/provisioning/${slugify(phoneName)}.html`}>
                    <img src={`/provisioning/${slugify(name)}-${phoneName}.png`} alt=""/>
                  </a>
                   <div className="card-block">
                    <h4 className="card-title">{phoneName}</h4>
                  </div>
                  <a href={`/provisioning/${slugify(phoneName)}.html`} className="mask">&nbsp;</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Layout>
);
