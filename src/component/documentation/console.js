import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import SwaggerUI from 'swagger-ui-react';
import { Link } from 'gatsby';
import 'swagger-ui-react/swagger-ui.css';
import { useCookies } from 'react-cookie';

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
  }
}

const getServiceName = (raw) => {
  const url = new URL(raw);
  const path = url.pathname.split('/');
  return path[2];
}

export default ({ pageContext: { moduleName, module, modules }}) => {
  const url = new URL(module.redocUrl);
  const [{ apiKey, baseUrl }, setCookie] = useCookies(['apiKey', 'baseUrl']);
  const [tempBaseUrl, setTempBaseUrl] = useState(baseUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scrollPos, setScrollPos] = useState(null);

  const handleScroll = () => {
    setScrollPos(window.scrollY);
  }

  useEffect(() => {
    if (!baseUrl) {
      setCookie('baseUrl', url.origin);
    }
  }, [baseUrl, setCookie, url.origin]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if(!baseUrl) return null;

  let buttonLabel = 'Validate';
  if (loading) {
    buttonLabel = 'Loading...';
  }else if(apiKey && apiKey.indexOf(':') === -1){
    buttonLabel = 'Reset';
  }

  return (
    <Layout pageTitle={`Console - ${module.title}`} breadcrumbs={[{ link: '/install', label: 'Install', active: true }]} className="body-green">
      <Helmet>
        <title>Console - {module.title}</title>
      </Helmet>

      <section id="console" className="console section">
        <div
          style={scrollPos > 60 ? styles.fixed : styles.normal}
        >
            <input
              onChange={e => setTempBaseUrl(e.target.value)}
              onBlur={() => setCookie('baseUrl', tempBaseUrl || url.origin)}
              id="input_baseUrl"
              name="baseUrl"
              type="text"
              className="form-control"
              style={styles.input}
              value={tempBaseUrl}
            />

            <input
              id="input_pathname"
              name="pathname"
              className="form-control"
              type="text"
              style={styles.input}
              value={url.pathname}
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
              value={apiKey}
            />
          <button className="btn btn-primary btn-sm" type="button" id="explore" disabled={apiKey === '' || loading} onClick={() => {
            if(apiKey.indexOf(':') === -1) {
              setError(null);
              setCookie('apiKey', '');
              return;
            };
            const authURL = new URL(modules.authentication.redocUrl);
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
              if(response.data && response.data.token) {
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
          }}>{buttonLabel}</button>
        </div>
        <div className="container" style={{ display: 'flex' }}>
          <div className="list-group" style={{ margin: '60px 20px 60px 0' }}>
            {Object.keys(modules).map(m => {
              
              return modules[m].redocUrl && <Link key={m} to={`/documentation/console/${m}`} className={`list-group-item list-group-item-action ${m === moduleName ? 'disabled' : ''}`}>
                {modules[m].title}
                <div style={styles.subtitle}>{modules[m].repository}</div>
              </Link>
            })}
          </div>
          <div style={{ position: 'relative', flex: 1 }}>
            {!!window && (
              <SwaggerUI
                url={`${baseUrl}${url.pathname}`}
                responseInterceptor={res => {
                  if (!res.ok) {
                    if(res.body.details && res.body.details.invalid_token){
                      setCookie('apiKey', '');
                      setError('Error: Invalid Token');
                    }else{
                      console.error(res.body && res.body.message);
                    }
                  }
                }}
                requestInterceptor={req => {
                  // make sure it starts with /api
                  const url = new URL(req.url);
                  if (url.pathname.indexOf('/api') === -1) {
                    req.url = `${url.origin}/api/${getServiceName(module.redocUrl)}${url.pathname}`;
                  }
                  // if there's content in the apiKey field, let's use it
                  if(apiKey) {
                    const parts = apiKey.split(":", 2);
                    if(parts.length > 1) {
                        const auth = "Basic " + btoa(apiKey);
                        req.headers['Authorization'] = auth;
                        delete req.headers['X-Auth-Token'];
                      } else if (apiKey !== '') {
                        req.headers['X-Auth-Token'] = apiKey;
                        delete req.headers['Authorization'];
                    }
                  }
                  return req;
                }}
              />
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}