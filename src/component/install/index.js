import React from 'react';
import ReactMarkdown from 'react-markdown';
import Helmet from 'react-helmet';

import Layout from '../Layout';

export default ({ pageContext: { installDoc }}) => (
  <Layout breadcrumbs={[{ link: '/install', label: 'Install', active: true }]} className="body-green">
    <Helmet>
      <title>Getting Started</title>
    </Helmet>

    <div className="doc-wrapper">
      <section id="install" className="about section">
        <div className="container">
          <ReactMarkdown source={installDoc} />
        </div>
      </section>
    </div>
  </Layout>
);
