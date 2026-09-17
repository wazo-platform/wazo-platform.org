import BrowserOnly from '@docusaurus/BrowserOnly';
import Link from '@docusaurus/Link';
import PageHero from '@site/src/components/PageHero';
import Layout from '@theme/Layout';
import { useCallback, useState } from 'react';
import 'swagger-ui-react/swagger-ui.css';

import type { ApiCredentials } from './ApiToolbar';
import ApiToolbar from './ApiToolbar';
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
      <PageHero
        title={`API Console — ${module.title}`}
        description="Try the API against your own Wazo engine: set its base URL and credentials, then explore."
      />
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
                    const url = new URL(req.url);
                    if (baseUrl) {
                      // the spec's own scheme/host reach the request through
                      // swagger's Schemes picker, which the console hides --
                      // so pin it to the engine the toolbar points at
                      const target = new URL(baseUrl);
                      url.protocol = target.protocol;
                      url.host = target.host;
                      // make sure it starts with /api
                      if (url.pathname.indexOf('/api') === -1) {
                        url.pathname = `/api/${getServiceName(module.redocUrl)}${url.pathname}`;
                      }
                      req.url = url.toString();
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
