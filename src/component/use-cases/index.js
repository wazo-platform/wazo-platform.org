import React from 'react';
import ReactMarkdown from 'react-markdown';

import Layout from '../Layout';

export default ({ pageContext: { installDoc }}) => (
  <Layout section="use-cases" pageTitle="Getting started" breadcrumbs={[{ link: '/use-cases', label: 'Use Cases', active: true }]}>
    <section id="use-cases" className="about section">
      <div className="container">
        <ReactMarkdown source={installDoc} />
      </div>
    </section>
  </Layout>
);
