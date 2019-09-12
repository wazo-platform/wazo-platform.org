import React from 'react';
import ReactMarkdown from 'react-markdown';
import Helmet from 'react-helmet';
import Layout from '../Layout';

export default ({ pageContext: { content, title = 'Home' }}) => (
  <Layout pageTitle={`Contribute: ${title}`} breadcrumbs={[{ link: '/contribute', label: 'Contribute', active: true }]} className="contribute">
    <Helmet>
      <title>{title} - Wazo Platform</title>
    </Helmet>
    <div className="container principal">
      <ReactMarkdown source={content} />
    </div>
  </Layout>
);