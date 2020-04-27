import React from 'react';
import ReactMarkdown from 'react-markdown';
import Layout from '../Layout';

const renderContributeTitle = title => title === 'Home' ? 'Contribute' : `Contribute: ${title}`

export default ({ pageContext: { content, title = 'Home' }}) => (
  <Layout pageTitle={renderContributeTitle(title)} breadcrumbs={[{ link: '/contribute', label: 'Contribute', active: true }]} className="contribute">
    <div className="container principal">
      <ReactMarkdown source={content} />
    </div>
  </Layout>
);