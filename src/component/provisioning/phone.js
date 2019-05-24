import React  from 'react';
import Helmet from 'react-helmet';

import Layout from '../layout';
const { slugify } = require('../../utils');

export default ({ pageContext: { name, vendor, phone } }) => {
  const breadcrumbs = [
    { url: '/provisioning/vendors.html', label: 'Provd plugins' },
    { url: `/provisioning/${slugify(vendor)}.html`, label: vendor },
  ];

  return (
    <Layout breadcrumbs={breadcrumbs} currentPageName={name}>
      <Helmet bodyAttributes={{ class: 'body-primary' }}>
        <title>Provd plugins for {name} - Wazo project documentation for developers</title>
      </Helmet>
      <div className="doc-wrapper">
        <div className="container">
          <div id="doc-header" className="doc-header text-center">
            <h1 className="doc-title">{name}</h1>
            <img src={`/provisioning/${slugify(vendor)}-${name}.png`} alt=""/>
          </div>

          {JSON.stringify(phone)}
        </div>
      </div>
    </Layout>
  );
}
