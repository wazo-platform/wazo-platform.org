import React from 'react';
import Helmet from 'react-helmet';

import Layout from '../Layout';
import TableOfContents from './TableOfContents';

const breadcrumbs = [{ link: '/uc-doc', label: 'UC Use Case Doc', active: true }]

export default ({ pageContext: { content, title = 'Home' }}) => (
  <Layout pageTitle={`UC Use Case Doc: ${title}`} breadcrumbs={breadcrumbs} className="template-uc-doc contribute">
    <Helmet>
      <title>{title} - UC Use Case Doc - Wazo Platform</title>
    </Helmet>

    <div className="container principal">
      <div className="main-content main-content-on-right-side">
        <div className="main-content-left-col">
          <TableOfContents />
        </div>

        <div className="main-content-right-col" dangerouslySetInnerHTML={{ __html: content}} />
      </div>
    </div>
  </Layout>
);
