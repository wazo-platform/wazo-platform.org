import React from 'react';
import ReactMarkdown from 'react-markdown';

import Layout from '../Layout';

const Page = ({ pageContext: { installC4Doc }}) => (
  <Layout section="install" pageTitle="Getting started: Class 4" breadcrumbs={[{ link: '/install/class-4', label: 'Install', active: true }]}>
    <section id="install" className="about section">
      <div className="container">
        <ReactMarkdown children={installC4Doc} />
      </div>
    </section>
  </Layout>
);

export default Page
