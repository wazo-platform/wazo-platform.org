import React from 'react';
import ReactMarkdown from 'react-markdown';

import Layout from '../Layout';

const Page = ({ pageContext: { installDoc }}) => (
  <Layout pageTitle="Installation" breadcrumbs={[{ link: '/install', label: 'Install', active: true }]} className="body-green">
    <section id="install" className="about section">
      <div className="container">
        <ReactMarkdown children={installDoc} />
      </div>
    </section>
  </Layout>
);

export default Page
