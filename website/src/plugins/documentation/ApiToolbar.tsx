import { useEffect, useState } from 'react';

import { getStoredValue, setStoredValue } from './helper';

export type ApiCredentials = {
  apiKey: string;
  baseUrl: string;
};

type Props = {
  pathname: string;
  authUrl?: string;
  onChange: (credentials: ApiCredentials) => void;
};

// Toolbar to target a real Wazo engine: base URL + username:password that is
// exchanged for a token on wazo-auth, both persisted in localStorage.
const ApiToolbar = ({ pathname, authUrl, onChange }: Props) => {
  const [apiKey, setApiKey] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [tempBaseUrl, setTempBaseUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedApiKey = getStoredValue('apiKey');
    const storedBaseUrl = getStoredValue('baseUrl');
    setApiKey(storedApiKey);
    setBaseUrl(storedBaseUrl);
    setTempBaseUrl(storedBaseUrl);
    onChange({ apiKey: storedApiKey, baseUrl: storedBaseUrl });
  }, [onChange]);

  const update = (values: Partial<ApiCredentials>) => {
    const next = { apiKey, baseUrl, ...values };
    setApiKey(next.apiKey);
    setBaseUrl(next.baseUrl);
    setStoredValue('apiKey', next.apiKey);
    setStoredValue('baseUrl', next.baseUrl);
    onChange(next);
  };

  const hasValidToken = apiKey && apiKey.indexOf(':') === -1;

  let buttonLabel = 'Validate';
  if (loading) {
    buttonLabel = 'Loading...';
  } else if (hasValidToken) {
    buttonLabel = 'Reset';
  }

  const validate = () => {
    if (hasValidToken) {
      setError(null);
      update({ apiKey: '' });
      return;
    }
    if (!authUrl || !baseUrl) {
      return;
    }
    const auth = new URL(authUrl).pathname.split('/');
    setLoading(true);
    fetch(`${baseUrl}/api/${auth[2]}/${auth[3]}/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(apiKey)}`,
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ expiration: 3600 }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.data?.token) {
          update({ apiKey: response.data.token });
          setLoading(false);
        } else {
          throw new Error(response.reason?.[0] || 'Unknown Error');
        }
      })
      .catch((e) => {
        console.warn(e);
        setLoading(false);
        update({ apiKey: '' });
        setError(String(e.message || e));
      });
  };

  const applyBaseUrl = () => {
    if (tempBaseUrl === '') {
      update({ apiKey: '', baseUrl: '' });
      return;
    }
    update({ baseUrl: tempBaseUrl });
  };

  return (
    <div className="doc-toolbar">
      <input
        onChange={(e) => setTempBaseUrl(e.target.value)}
        onBlur={applyBaseUrl}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            applyBaseUrl();
          }
        }}
        name="baseUrl"
        placeholder="https://<YOUR_WAZO_IP>"
        type="text"
        value={tempBaseUrl}
      />
      <input name="pathname" type="text" value={pathname} disabled />
      <input
        placeholder={error || 'username:password'}
        name="apiKey"
        type="text"
        onChange={(e) => update({ apiKey: e.target.value })}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            validate();
          }
        }}
        value={apiKey}
      />
      <button type="button" onClick={validate}>
        {buttonLabel}
      </button>
    </div>
  );
};

export default ApiToolbar;
