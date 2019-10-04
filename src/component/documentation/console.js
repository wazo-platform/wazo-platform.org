import React from 'react';
import Helmet from 'react-helmet';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';


import Layout from '../Layout';

export default ({ pageContext: { moduleName, module }}) => {
  return (
    <Layout pageTitle={`Console - ${module.title}`} breadcrumbs={[{ link: '/install', label: 'Install', active: true }]} className="body-green">
      <Helmet>
        <title>Console - {module.title}</title>
      </Helmet>

      <section id="console" className="console section">
        <div className="container">
          <SwaggerUI
            url={module.redocUrl}
            deepLinking
          />
        </div>
      </section>

    </Layout>
  );
}