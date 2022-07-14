import React from 'react';
import ReactMarkdown from 'react-markdown';
import Layout from '../Layout';

const Page = ({ pageContext: { content }}) => (
  <Layout pageTitle={`Ecosystem`} breadcrumbs={[{ link: '/ecosystem', label: 'Ecosystem', active: true }]} className="ecosystem">
    <div className="ecosystem container principal">
      <ReactMarkdown children={content} />
    </div>
  </Layout>
);

export default Page
