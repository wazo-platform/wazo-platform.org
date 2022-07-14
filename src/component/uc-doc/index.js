import React from 'react';
import Helmet from 'react-helmet';

import Layout from '../Layout';
import TableOfContents from './TableOfContents';

const breadcrumbs = [{ link: '/uc-doc', label: 'UC Use Case Doc', active: true }]

const Page = ({ pageContext: { content, title = 'Home' }}) => (
  <Layout pageTitle="Unified Communication Use Cases" PageTitleComponent="p" breadcrumbs={breadcrumbs} className="template-uc-doc contribute">
    <Helmet>
      <title>{title} - Unified Communication Use Cases - Wazo Platform</title>
    </Helmet>

    <div className="container principal">
      <div className="main-content main-content-on-right-side">
        <div className="main-content-left-col">
          <TableOfContents />
        </div>

        <div className="main-content-right-col">
          <h1>{ title }</h1>
          <div dangerouslySetInnerHTML={{ __html: content}} />
        </div>
      </div>
    </div>
  </Layout>
);

export default Page
