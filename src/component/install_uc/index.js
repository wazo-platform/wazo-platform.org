import React from 'react';
import ReactMarkdown from 'react-markdown';

import Layout from '../Layout';

const Page = ({ pageContext: { installUCDoc }}) => (
  <Layout section="install" pageTitle="Getting started: Unified Communication" breadcrumbs={[{ link: '/uc-doc/installation/install-system', label: 'Install', active: true }]}>
    <section id="install" className="about section">
      <div className="container">
        <ReactMarkdown source={installUCDoc} />
      </div>
    </section>
  </Layout>
);

export default Page
