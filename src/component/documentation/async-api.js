import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { useCookies } from 'react-cookie';

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

const Page = ({ pageContext: { moduleName, module, modules, auth_url } }) => {
  const url = new URL(module.redocUrl);
  const [{ apiKey, baseUrl }, setCookie] = useCookies(['apiKey', 'baseUrl']);

  const [tempBaseUrl, setTempBaseUrl] = useState(baseUrl || '');
  const [tempPathname, setTempPathname] = useState(url.pathname);
  const [, setPathname] = useState(tempPathname);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scrollPos, setScrollPos] = useState(null);

  const handleScroll = () => {
    setScrollPos(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  let buttonLabel = 'Validate';
  if (loading) {
    buttonLabel = 'Loading...';
  } else if (apiKey && apiKey.indexOf(':') === -1) {
    buttonLabel = 'Reset';
  }

  const validate = () => {
    if (apiKey && apiKey.indexOf(':') === -1) {
      setError(null);
      setCookie('apiKey', '');
      return;
    };
    const authURL = new URL(auth_url);
    const auth = authURL.pathname.split('/');
    setLoading(true);
    fetch(`${baseUrl}/api/${auth[2]}/${auth[3]}/token`, {
      method: 'POST',
      headers: {
        Authorization: "Basic " + btoa(apiKey),
        accept: 'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ expiration: 3600 }),
    }).then(d => d.json()).then(response => {
      if (response.data && response.data.token) {
        setCookie('apiKey', response.data.token);
        setLoading(false);
      } else {
        throw new Error((response.reason && response.reason[0]) || 'Unknown Error')
      }
    })
      .catch(e => {
        console.warn(e);
        setLoading(false);
        setCookie('apiKey', '');
        setError(e);
      });
  };

  const setBaseUrl = () => {
    if (tempBaseUrl === '') {
      setCookie('apiKey', '');
    }
    setCookie('baseUrl', tempBaseUrl);
  }

  return (
    <Layout pageTitle={`Console - ${module.title}`} breadcrumbs={[{ link: '/install', label: 'Install', active: true }]} className="body-green">
      <section id="console" className="console section">
        <div
          style={scrollPos > 60 ? styles.fixed : styles.normal}
        >
          <input
            onChange={e => setTempBaseUrl(e.target.value)}
            onBlur={() => setBaseUrl()}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                setBaseUrl();
              }
            }}
            id="input_baseUrl"
            name="baseUrl"
            placeholder="https://<YOUR_WAZO_IP>"
            type="text"
            className="form-control"
            style={styles.input}
            value={tempBaseUrl}
          />

          <input
            onChange={e => setTempPathname(e.target.value)}
            onBlur={() => setPathname(tempPathname)}
            id="input_pathname"
            name="pathname"
            className="form-control"
            type="text"
            style={styles.input}
            value={tempPathname}
            disabled
          />

          <input
            placeholder={error || 'username:password'}
            id="input_apiKey"
            name="apiKey"
            type="text"
            className="form-control"
            style={styles.input}
            onChange={e => setCookie('apiKey', e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                validate();
              }
            }}
            value={apiKey}
          />
          <button
            className="btn btn-primary btn-sm"
            type="button"
            id="explore"
            onClick={() => validate()}
          >{buttonLabel}</button>
        </div>
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
}

export default Page
