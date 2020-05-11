import React, { useEffect, useState, useRef } from 'react';
import 'graphiql/graphiql.min.css';
import GraphiQL from 'graphiql';
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
  },
  loading: {
    height: '50vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}

export default ({ pageContext: { moduleName, module, modules }}) => {
  const graphqlRef = useRef(null);
  const url = new URL(module.redocUrl);

  const pathnameArr = url.pathname.split('/');
  const pathname = `/api/${pathnameArr[2]}/${pathnameArr[3]}/graphql`;
  
  const [{ apiKey, baseUrl }, setCookie] = useCookies(['apiKey', 'baseUrl']);

  const [tempBaseUrl, setTempBaseUrl] = useState(baseUrl || '');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scrollPos, setScrollPos] = useState(null);

  const handleScroll = () => {
    setScrollPos(window.scrollY);
  };

  const handleResize = () => {
    if (graphqlRef.current) {
      graphqlRef.current.style.height = `${window.innerHeight - 305}px`;
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  let buttonLabel = 'Validate';
  if (loading) {
    buttonLabel = 'Loading...';
  }else if(apiKey && apiKey.indexOf(':') === -1){
    buttonLabel = 'Reset';
  }

  const validate = () => {
    if(apiKey && apiKey.indexOf(':') === -1) {
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
  };

  const setBaseUrl = () => {
    if (tempBaseUrl === '') {
      setCookie('apiKey', '');
    }
    setCookie('baseUrl', tempBaseUrl);
  }

  function graphQLFetcher(graphQLParams) {
    return fetch(`${baseUrl}${pathname}`, {
      method: 'post',
      headers: {
        'X-Auth-Token': apiKey,
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(graphQLParams),
    }).then(response => response.json());
  }

  return (
    <Layout pageTitle={`GraphQL - ${module.title}`}>
      <div style={scrollPos > 60 ? styles.fixed : styles.normal}>
        <input
          onChange={e => setTempBaseUrl(e.target.value)}
          onBlur={() => setBaseUrl()}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              setBaseUrl();
            }}}
          id="input_baseUrl"
          name="baseUrl"
          placeholder="https://<YOUR_WAZO_IP>"
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
          value={pathname}
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
            }}}
          value={apiKey}
        />
        <button
          className="btn btn-primary btn-sm"
          type="button"
          id="explore"
          onClick={() => validate()}
        >{buttonLabel}</button>
      </div>
      <div id="graphiql" ref={graphqlRef}>
        <GraphiQL ref={graphqlRef} fetcher={graphQLFetcher} editorTheme="cm-s-material" />
      </div>
    </Layout>
  );
}
