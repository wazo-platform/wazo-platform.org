import React from 'react';
import Layout from '../component/Layout';

const Page = ({ pageContext: { news } }) => (
  <Layout pageTitle="Page not found">
    <div
      style={{
        height: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span>There is no spoon.</span>
    </div>
  </Layout>
);

export default Page
