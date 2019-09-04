import React from 'react';
import ReactMarkdown from 'react-markdown';
import Helmet from 'react-helmet';

import Layout from '../documentation/Layout';

export default ({ pageContext: { contributeDoc }}) => (
  <Layout breadcrumbs={[{ link: '/contribute', label: 'Contribute', active: true }]} className="body-green">
    <Helmet>
      <title>Contributing</title>
    </Helmet>

    <div className="doc-wrapper">
      <section id="install" className="about section">
        <div className="container">
          <ReactMarkdown source={contributeDoc} />
        </div>
      </section>
    </div>
  </Layout>
);
