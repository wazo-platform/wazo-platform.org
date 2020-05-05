import React  from 'react';

import Layout from '../Layout';
const slugify = require('../../builder/slugify');

const title = 'Provd Plugins';

export default ({ pageContext: { plugins } }) => (
  <Layout pageTitle={title}>
    <div className="doc-wrapper provisioning-vendors">
      <div className="container">
        <div className="section-block">
          <div className="row">
            {Object.keys(plugins).map(vendor => (
              <div className="col-md-4 col-12 mb-3">
                <div className="card">
                  <a href={`/provisioning/${slugify(vendor)}`} className="card-header">{vendor}</a>
                  <div className="body">
                    <a href={`/provisioning/${slugify(vendor)}`}>
                      <img src={`/provisioning/${slugify(vendor)}.png`} alt=""/>
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
