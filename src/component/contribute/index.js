import React from 'react';
import ReactMarkdown from 'react-markdown';

import Layout from '../Layout';

export default ({ pageContext: { contributeDoc }}) => (
  <Layout pageTitle="Contribute" breadcrumbs={[{ link: '/contribute', label: 'Contribute', active: true }]}>
    <section id="contribute" className="section">
      <div className="container">
        <ReactMarkdown source={contributeDoc} />
      </div>
    </section>
  </Layout>
);