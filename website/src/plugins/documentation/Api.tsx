import BrowserOnly from '@docusaurus/BrowserOnly';
import Layout from '@theme/Layout';
import { Suspense, lazy } from 'react';

import Canonical from './Canonical';
import type { DocModule } from './builder';
import { getModuleSpecUrl } from './helper';
import './documentation.css';

// redoc's browser bundle crashes when required synchronously (module init
// order); an async chunk avoids it and never runs during SSG.
const RedocStandalone = lazy(() =>
  import('redoc').then((m) => ({ default: m.RedocStandalone })),
);

type Props = {
  route: {
    customData?: {
      moduleName: string;
      module: DocModule;
    };
  };
};

const redocOptions = {
  pathInMiddlePanel: true,
  sortOperationsAlphabetically: true,
  sortTagsAlphabetically: true,
  theme: {
    typography: {
      fontSize: '15px',
      code: {
        fontSize: '14px',
        lineHeight: '1.5em',
      },
    },
    logo: {
      gutter: '30px',
    },
  },
};

const loading = <div className="doc-loading">Loading…</div>;

const Api = ({ route }: Props) => {
  const { moduleName, module } = route?.customData || {};

  return (
    <Layout title={`API Reference - ${module.title}`} noFooter>
      <Canonical path={`/documentation/api/${moduleName}`} />
      <div className="doc-api-light">
        <BrowserOnly fallback={loading}>
          {() => (
            <Suspense fallback={loading}>
              <RedocStandalone
                options={redocOptions}
                specUrl={getModuleSpecUrl(module)}
              />
            </Suspense>
          )}
        </BrowserOnly>
      </div>
    </Layout>
  );
};

export default Api;
