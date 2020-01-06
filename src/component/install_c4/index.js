import React from 'react';
import ReactMarkdown from 'react-markdown';

import Layout from '../Layout';

export default ({ pageContext: { installC4Doc }}) => (
  <Layout section="install" pageTitle="Getting started: Class 4" breadcrumbs={[{ link: '/install/class-4', label: 'Install', active: true }]}>
    <section id="install" className="about section">
      <div className="container">
        <ReactMarkdown source={installC4Doc} />
      </div>
    </section>
  </Layout>
);
