import BrowserOnly from '@docusaurus/BrowserOnly';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { useCallback, useState } from 'react';
import 'swagger-ui-react/swagger-ui.css';

import type { ApiCredentials } from './ApiToolbar';
import ApiToolbar from './ApiToolbar';
import Canonical from './Canonical';
import type { DocModule } from './builder';
import { getModuleSpecUrl, getServiceName } from './helper';
import './documentation.css';

type Props = {
  route: {
    customData?: {
      moduleName: string;
      module: DocModule;
      modules: Record<string, DocModule>;
      authUrl?: string;
    };
  };
};

const Console = ({ route }: Props) => {
  const { moduleName, module, modules, authUrl } = route?.customData || {};
  const [{ apiKey, baseUrl }, setCredentials] = useState<ApiCredentials>({
    apiKey: '',
    baseUrl: '',
  });

  const onCredentialsChange = useCallback(
    (credentials: ApiCredentials) => setCredentials(credentials),
    [],
  );

  const pathname = new URL(module.redocUrl).pathname;

  return (
    <Layout title={`Console - ${module.title}`}>
      <Canonical path={`/documentation/console/${moduleName}`} />
      <ApiToolbar
        pathname={pathname}
        authUrl={authUrl}
        onChange={onCredentialsChange}
      />
      <div className="container doc-console">
        <div className="doc-console__siblings">
          {Object.keys(modules).map(
            (m) =>
              modules[m].redocUrl && (
                <Link
                  key={m}
                  to={`/documentation/console/${m}`}
                  className={m === moduleName ? 'active' : ''}
                >
                  {modules[m].title}
                  <div className="doc-console__subtitle">
                    {modules[m].repository}
                  </div>
                </Link>
              ),
          )}
        </div>
        <div className="doc-console__main doc-api-light">
          <BrowserOnly fallback={<div className="doc-loading">Loading…</div>}>
            {() => {
              const SwaggerUI = require('./SwaggerUIBrowser').default;
              return (
                <SwaggerUI
                  url={
                    baseUrl ? `${baseUrl}${pathname}` : getModuleSpecUrl(module)
                  }
                  docExpansion="none"
                  tryItOutEnabled
                  requestInterceptor={(req) => {
                    // make sure it starts with /api
                    const url = new URL(req.url);
                    if (baseUrl && url.pathname.indexOf('/api') === -1) {
                      let overridedUrl = `${url.origin}/api/${getServiceName(module.redocUrl)}${url.pathname}`;
                      if (url.search) {
                        overridedUrl += url.search;
                      }
                      req.url = overridedUrl;
                    }
                    // if there's content in the apiKey field, let's use it
                    if (apiKey) {
                      const parts = apiKey.split(':', 2);
                      if (parts.length > 1) {
                        req.headers.Authorization = `Basic ${btoa(apiKey)}`;
                        // biome-ignore lint/performance/noDelete: header must be absent, not undefined
                        delete req.headers['X-Auth-Token'];
                      } else if (apiKey !== '') {
                        req.headers['X-Auth-Token'] = apiKey;
                        // biome-ignore lint/performance/noDelete: header must be absent, not undefined
                        delete req.headers.Authorization;
                      }
                    }
                    return req;
                  }}
                />
              );
            }}
          </BrowserOnly>
        </div>
      </div>
    </Layout>
  );
};

export default Console;
