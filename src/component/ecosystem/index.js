import React from 'react';
import ReactMarkdown from 'react-markdown';
import Helmet from 'react-helmet';
import Layout from '../Layout';

export default ({ pageContext: { content }}) => (
  <Layout pageTitle={`Ecosystem`} breadcrumbs={[{ link: '/ecosystem', label: 'Ecosystem', active: true }]} className="ecosystem">
    <Helmet>
      <title>Wazo Platform Ecosystem</title>
    </Helmet>
    <div className="container principal">
      <ReactMarkdown source={content} />
    </div>
  </Layout>
);
