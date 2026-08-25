import BrowserOnly from '@docusaurus/BrowserOnly';
import PageHero from '@site/src/components/PageHero';
import Layout from '@theme/Layout';
import { useCallback, useState } from 'react';
import 'graphiql/graphiql.min.css';

import type { ApiCredentials } from './ApiToolbar';
import ApiToolbar from './ApiToolbar';
import Canonical from './Canonical';
import type { DocModule } from './builder';
import './documentation.css';

type Props = {
  route: {
    customData?: {
      moduleName: string;
      module: DocModule;
      authUrl?: string;
    };
  };
};

const GraphQLConsole = ({ route }: Props) => {
  const { moduleName, module, authUrl } = route?.customData || {};
  const [{ apiKey, baseUrl }, setCredentials] = useState<ApiCredentials>({
    apiKey: '',
    baseUrl: '',
  });

  const onCredentialsChange = useCallback(
    (credentials: ApiCredentials) => setCredentials(credentials),
    [],
  );

  const pathnameArr = new URL(module.redocUrl).pathname.split('/');
  const pathname = `/api/${pathnameArr[2]}/${pathnameArr[3]}/graphql`;

  const hasValidToken = apiKey && apiKey.indexOf(':') === -1;
  const show = baseUrl && hasValidToken;

  const graphQLFetcher = (graphQLParams: unknown) =>
    fetch(`${baseUrl}${pathname}`, {
      method: 'post',
      headers: {
        'X-Auth-Token': apiKey,
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(graphQLParams),
    }).then((response) => response.json());

  return (
    <Layout title={`GraphQL - ${module.title}`}>
      <Canonical path={`/documentation/graphql/${moduleName}`} />
      <PageHero
        title={`GraphQL — ${module.title}`}
        description="Query the service with GraphQL against your own Wazo engine."
      />
      <ApiToolbar
        pathname={pathname}
        authUrl={authUrl}
        onChange={onCredentialsChange}
      />
      <div className="doc-graphiql">
        {show ? (
          <BrowserOnly fallback={<div className="doc-loading">Loading…</div>}>
            {() => {
              const GraphiQL = require('./GraphiQLBrowser').default;
              return <GraphiQL fetcher={graphQLFetcher} />;
            }}
          </BrowserOnly>
        ) : (
          <div className="doc-loading">You need a valid URL and token</div>
        )}
      </div>
    </Layout>
  );
};

export default GraphQLConsole;
