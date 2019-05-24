import React  from 'react';
import Helmet from 'react-helmet';

import Layout from '../layout';
const { slugify } = require('../../utils');

const title = 'Provd plugins';

export default ({ pageContext: { plugins } }) => (
  <Layout currentPageName={title}>
    <Helmet bodyAttributes={{ class: 'body-primary' }}>
      <title>{title} - Wazo project documentation for developers</title>
    </Helmet>
    <div className="doc-wrapper">
      <div className="container">
        <div id="doc-header" className="doc-header text-center">
          <h1 className="doc-title">{title}</h1>
        </div>

        <div className="section-block">
          <div className="row">
            {Object.keys(plugins).map(vendor => (
              <div className="col-md-4 col-12 mb-3">
                <div className="theme-card">
                  <a className="vendor-picture" href={`/provisioning/${slugify(vendor)}.html`}>
                    <img src={`/provisioning/${slugify(vendor)}.png`} alt=""/>
                  </a>
                   <div className="card-block">
                    <h4 className="card-title">{vendor}</h4>
                  </div>
                  <a href={`/provisioning/${slugify(vendor)}.html`} className="mask">&nbsp;</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Layout>
);
