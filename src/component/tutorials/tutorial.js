import Helmet from 'react-helmet';
import React from 'react';

import Layout from '../Layout';

const Page = ({ pageContext: { title, author, category, content, ogimage } }) => (
  <Layout pageTitle={title} className="article" section="tutorials">
    <Helmet>
      {ogimage && <meta property="og:image" content={`https://wazo-platform.org/images/tutorials/${ogimage}`} />}
    </Helmet>
    <div className="container main">
      <div className="article--content">
        <div dangerouslySetInnerHTML={{ __html: content}} />

        <div className="article--content--footer">
          <span className="article--content--footer-author">{author}</span>
          <p>Category: {category}</p>
        </div>
      </div>
    </div>
  </Layout>
);

export default Page
