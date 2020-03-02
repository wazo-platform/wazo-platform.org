import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../Layout';

export default ({ pageContext: { content, title = 'Home' }}) => (
  <Layout pageTitle={`UC Use Case Doc: ${title}`} breadcrumbs={[{ link: '/uc-doc',
                                                                  label: 'UC Use Case Doc',
                                                                  active: true }]} className="contribute">
    <Helmet>
      <title>{title} - UC Use Case Doc - Wazo Platform</title>
    </Helmet>
    <div className="container principal">
      <div dangerouslySetInnerHTML={{ __html: content}} />
    </div>
  </Layout>
);
