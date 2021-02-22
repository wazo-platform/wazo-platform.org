import React  from 'react';

import Layout from '../Layout';
import './provisioning.scss';
const slugify = require('../../builder/slugify');

const breadcrumbs = [{
  url: '/provisioning/vendors', label: 'Provd plugins',
}];

export default ({ pageContext: { name, vendor_plugins, vendor_images } }) => (
  <Layout pageTitle={`<a href="/provisioning/vendors">Provd Plugins:</a> ${name}`} breadcrumbs={breadcrumbs} currentPageName={name}>
    <div className="doc-wrapper provisioning-vendor">
      <div className="container">
        <div className="section-block">
          <div className="row">
            {Object.keys(vendor_plugins).map(phoneName => (
              <div className="col-md-4 col-12 mb-3" key={phoneName}>
                <div className="card">
                  <a className="card-header" href={`/provisioning/${slugify(name)}/${slugify(phoneName)}`}>{phoneName}</a>
                   <div className="body">
                      <a className="phone-picture" href={`/provisioning/${slugify(name)}/${slugify(phoneName)}`}>
                        {vendor_images && vendor_images.indexOf(`${slugify(phoneName)}.png`) !== -1 
                          ? <img src={`/provisioning/${slugify(name)}-${slugify(phoneName)}.png`} alt={phoneName} />
                          : <img src={`/provisioning/img-placeholder.png`} alt={phoneName} />}
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
