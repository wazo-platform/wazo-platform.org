import React from 'react';
import ReactMarkdown from 'react-markdown';

import Layout from '../Layout';

export default ({ pageContext: { installDoc }}) => (
  <Layout pageTitle="Getting started" breadcrumbs={[{ link: '/install', label: 'Install', active: true }]}>
    <section id="install" className="about section">
      <div className="container">
        <ReactMarkdown source={installDoc} />
      </div>
    </section>
  </Layout>
);