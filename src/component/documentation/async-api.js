import React from 'react';
import { Link } from 'gatsby';

import AsyncApiComponent from './AsyncApiComponent';
import Layout from '../Layout';

const styles = {
  container: {
    display: 'flex',
  },
  listGroup: {
    margin: '60px 20px 60px 0',
  },
  subtitle: {
    fontSize: '.8em',
    color: '#999',
  },
  asyncapi: {
    position: 'relative',
    flex: 1,
  },
};

const getServiceName = raw => {
  const url = new URL(raw);
  const path = url.pathname.split('/');
  return path[2];
};

const Page = ({ pageContext: { moduleName, module, modules, auth_url } }) => (
  <Layout
    pageTitle={`API Events - ${module.title}`}
    breadcrumbs={[{ link: '/install', label: 'Install', active: true }]}
    className="body-green"
  >
    <section id="console" className="console section">
      <div className="container" style={styles.container}>
        <div className="list-group" style={styles.listGroup}>
          {Object.keys(modules).map(m => {
            return (
              modules[m].apiEvents && (
                <Link
                  key={m}
                  to={`/documentation/events/${m}`}
                  className={`list-group-item list-group-item-action ${m === moduleName ? 'disabled' : ''}`}
                >
                  {modules[m].title}
                  <div style={styles.subtitle}>{modules[m].repository}</div>
                </Link>
              )
            );
          })}
        </div>
        <div style={styles.asyncapi}>
          <AsyncApiComponent module={getServiceName(module.redocUrl)} />
        </div>
      </div>
    </section>
  </Layout>
);

export default Page;
