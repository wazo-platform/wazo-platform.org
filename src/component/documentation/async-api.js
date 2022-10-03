import React from 'react';
import { Link } from 'gatsby';

import AsyncApiComponent from './AsyncApiComponent';
import Layout from '../Layout';


const shared = {
  display: 'flex',
  justifyContent: 'space-between',
  background: '#eee',
  padding: '10px 5vw',
  width: '100%',
};

const styles = {
  input: {
    width: '100%',
    padding: '5px 8px',
    marginRight: 10
  },

  button: {
    display: 'block',
    borderBottom: '1px solid #ddd',
    padding: '8px 0',
    minWidth: 160,
    color: '#000',
    marginRight: 20
  },

  subtitle: {
    fontSize: '.8em',
    color: '#999',
  },

  fixed: {
    position: 'fixed',
    top: 60,
    zIndex: 2,
    left: 0,
    boxShadow: '0 3px 5px rgba(0,0,0,.2)',
    ...shared,
  },
  normal: {
    ...shared,
  },
  loading: {
    height: '50vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}

const getServiceName = (raw) => {
  const url = new URL(raw);
  const path = url.pathname.split('/');
  return path[2];
}

const Page = ({ pageContext: { moduleName, module, modules, auth_url } }) => (
  <Layout pageTitle={`Console - ${module.title}`} breadcrumbs={[{ link: '/install', label: 'Install', active: true }]} className="body-green">
    <section id="console" className="console section">
      <div className="container" style={{ display: 'flex' }}>
        <div className="list-group" style={{ margin: '60px 20px 60px 0' }}>
          {Object.keys(modules).map(m => {

            return modules[m].apiEvents && <Link key={m} to={`/documentation/events/${m}`} className={`list-group-item list-group-item-action ${m === moduleName ? 'disabled' : ''}`}>
              {modules[m].title}
              <div style={styles.subtitle}>{modules[m].repository}</div>
            </Link>
          })}
        </div>
        <div style={{ position: 'relative', flex: 1 }}>
          <AsyncApiComponent module={getServiceName(module.redocUrl)} />
        </div>
      </div>
    </section>
  </Layout>
);

export default Page
