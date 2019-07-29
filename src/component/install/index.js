import React from 'react';
import ReactMarkdown from 'react-markdown';
import Helmet from 'react-helmet';

import Layout from './Layout';

export default ({ pageContext: { install_doc }}) => (
        <Layout>
        <title>Getting Started</title>

        <section id="install" className="about section">
        <div className="container">
        <ReactMarkdown
          source={install_doc}
        />
        </div>
        </section>
        </Layout>
);
