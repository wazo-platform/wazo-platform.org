import Helmet from 'react-helmet';
import React from 'react';
import Layout from '../Layout';
import ReactMarkdown from 'react-markdown';

export default ({ pageContext: { title, author, category, body, ogimage } }) => (
  <Layout pageTitle={title} className="article" section="tutorials">
    <Helmet>
      {ogimage && <meta property="og:image" content={`https://wazo-platform.org/images/tutorials/${ogimage}`} />}
    </Helmet>
    <div className="container main">
      <div className="article--content">
        <ReactMarkdown source={body} />

        <div className="article--content--footer">
          <span className="article--content--footer-author">{author}</span>
          <p>Category: {category}</p>
        </div>
      </div>
    </div>
  </Layout>
);
