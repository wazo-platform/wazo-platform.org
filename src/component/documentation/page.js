import React from 'react';
import ReactMarkdown from 'react-markdown';
import Helmet from 'react-helmet';

import Layout from '../Layout';

export default ({ pageContext: { content, id, link, label }}) => (
  <Layout breadcrumbs={[{ link, label, active: true }]} className="body-green">
    <Helmet>
      <title>Contributing</title>
    </Helmet>

    <div className="doc-wrapper">
      <section id={label.toLowerCase()} className="about section">
        <div className="container">
          <ReactMarkdown source={content} />
        </div>
      </section>
    </div>
  </Layout>
);
