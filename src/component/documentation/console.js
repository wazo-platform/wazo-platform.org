import React, { useState } from 'react';
import Helmet from 'react-helmet';
import SwaggerUI from 'swagger-ui-react';
import { Link } from 'gatsby';
import 'swagger-ui-react/swagger-ui.css';

import Layout from '../Layout';

const inputStyle = {
  width: '100%',
  padding: '5px 8px',
  marginRight: 10
};

export default ({ pageContext: { moduleName, module, modules }}) => {
  const url = new URL(module.redocUrl);
  const [tempBaseUrl, setTempBaseUrl] = useState(module.redocUrl);
  const [apiKey, setApiKey] = useState('');

  const buttonStyle = {
    display: 'block',
    borderBottom: '1px solid #ddd',
    padding: '8px 0',
    width: 160,
    color: '#000',
    marginRight: 20
  }

  const getServiceName = () => {
    const url = new URL(tempBaseUrl);
    const path = url.pathname.split('/');
    return path[2];
  }

  return (
    <Layout pageTitle={`Console - ${module.title}`} breadcrumbs={[{ link: '/install', label: 'Install', active: true }]} className="body-green">
      <Helmet>
        <title>Console - {module.title}</title>
      </Helmet>

      <section id="console" className="console section">
        <div
          style={{
            position: 'fixed',
            top: 40,
            zIndex: 2,
            background: '#eee',
            left: 0,
            padding: '10px 5vw',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 20
          }}
        >
          <input
            placeholder={`http://example.com${url.pathname}`}
            onChange={e => setTempBaseUrl(e.target.value)}
            id="input_baseUrl"
            name="baseUrl"
            type="text"
            style={inputStyle}
            value={tempBaseUrl}
            />
          <input
            placeholder="api_key"
            id="input_apiKey"
            name="apiKey"
            type="text"
            style={inputStyle}
            onChange={e => setApiKey(e.target.value)}
            value={apiKey}
          />
          {/* <button id="explore" onClick={() => setBaseUrl(tempBaseUrl)}>Explore</button> */}
        </div>
        <div className="container" style={{ display: 'flex' }}>
          <div style={{ margin: '60px 0' }}>
            {Object.keys(modules).map(m => {
              
              return <Link to={`/documentation/console/${m}`} style={{ ...buttonStyle, color: m === moduleName ? '#ccc' : '#000' }}>{modules[m].title}</Link>
            })}
          </div>
          <div style={{ position: 'relative', flex: 1 }}>
            {!!window && (
              <SwaggerUI
                url={tempBaseUrl}
                requestInterceptor={req => {
                  // make sure it starts with /api
                  const url = new URL(req.url);
                  if (url.pathname.indexOf('/api') === -1) {
                    req.url = `${url.origin}/api/${getServiceName()}${url.pathname}`;
                  }
                  // if there's content in the apiKey field, let's use it
                  if(apiKey) {
                    const parts = apiKey.split(":", 2);
                    if(parts.length > 1) {
                        const auth = "Basic " + btoa(apiKey);
                        req.headers['Authorization'] = auth;
                        delete req.headers['X-Auth-Token'];
                      } else if (apiKey != "") {
                        req.headers['X-Auth-Token'] = apiKey;
                        delete req.headers['Authorization'];
                    }
                  } 
                  console.log('req', req, url, module);
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