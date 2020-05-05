import React  from 'react';

import Layout from '../Layout';
const slugify = require('../../builder/slugify');

const breadcrumbs = [{
  url: '/provisioning/vendors', label: 'Provd plugins',
}];

export default ({ pageContext: { name, vendor } }) => (
  <Layout pageTitle={`<a href="/provisioning/vendors">Provd Plugins:</a> ${name}`} breadcrumbs={breadcrumbs} currentPageName={name}>
    <div className="doc-wrapper provisioning-vendor">
      <div className="container">
        <div className="section-block">
          <div className="row">
            {Object.keys(vendor).map(phoneName => (
              <div className="col-md-4 col-12 mb-3">
                <div className="card">
                  <a className="card-header" href={`/provisioning/${slugify(name)}/${slugify(phoneName)}`}>{phoneName}</a>
                   <div className="body">
                      <a className="phone-picture" href={`/provisioning/${slugify(name)}/${slugify(phoneName)}`}>
                        <img src={`/provisioning/${slugify(name)}-${slugify(phoneName)}.png`} alt={phoneName} />
                      </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Layout>
);
