import React from 'react';
import Layout from '../component/Layout';

export default ({ pageContext: { news } }) => (
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
