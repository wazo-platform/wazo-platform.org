import React from 'react';
import ReactMarkdown from 'react-markdown';
import Layout from '../Layout';

export default ({ pageContext: { content, title = 'Home' }}) => (
  <Layout pageTitle={`Contribute: ${title}`} breadcrumbs={[{ link: '/contribute', label: 'Contribute', active: true }]} className="contribute">
    <div className="container principal">
      <ReactMarkdown source={content} />
    </div>
  </Layout>
);