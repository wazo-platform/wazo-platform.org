import React  from 'react';
import { withPrefix } from "gatsby"

import Layout from '../Layout';
import './provisioning.scss';
const slugify = require('../../builder/slugify');

const vendorsUrl = withPrefix('/uc-doc/ecosystem/supported_devices');

const breadcrumbs = [{
  url: vendorsUrl, label: 'Provd plugins',
}];

const Page = ({ pageContext: { name, vendor_plugins, vendor_images } }) => (
  <Layout pageTitle={`<a href="${vendorsUrl}">Provd Plugins:</a> ${name}`} breadcrumbs={breadcrumbs} currentPageName={name}>
    <div className="doc-wrapper provisioning-vendor">
      <div className="container">
        <div className="section-block">
          <div className="row">
            {Object.keys(vendor_plugins).map(phoneName => (
              <div className="col-md-4 col-12 mb-3" key={phoneName}>
                <div className="card">
                  <a className="card-header" href={withPrefix(`/provisioning/${slugify(name)}/${slugify(phoneName)}`)}>{phoneName}</a>
                   <div className="body">
                      <a className="phone-picture" href={withPrefix(`/provisioning/${slugify(name)}/${slugify(phoneName)}`)}>
                        {vendor_images && vendor_images.indexOf(`${slugify(phoneName)}.png`) !== -1 
                          ? <img src={withPrefix(`/provisioning/${slugify(name)}-${slugify(phoneName)}.png`)} alt={phoneName} />
                          : <img src={withPrefix(`/provisioning/img-placeholder.png`)} alt={phoneName} />}
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

export default Page
