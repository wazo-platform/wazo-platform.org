import React from 'react';
import ReactMarkdown from 'react-markdown';

import Layout from '../Layout';

export default ({ pageContext: { installUCDoc }}) => (
  <Layout section="install" pageTitle="Getting started: Unified Communication" breadcrumbs={[{ link: '/install/unified-communication', label: 'Install', active: true }]}>
    <section id="install" className="about section">
      <div className="container">
        <ReactMarkdown source={installUCDoc} />
      </div>
    </section>
  </Layout>
);
