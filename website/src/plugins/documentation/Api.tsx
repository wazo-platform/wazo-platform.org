import BrowserOnly from '@docusaurus/BrowserOnly';
import Layout from '@theme/Layout';

import Canonical from './Canonical';
import type { DocModule } from './builder';
import { getModuleSpecUrl } from './helper';
import './documentation.css';

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

const Api = ({ route }: Props) => {
  const { moduleName, module } = route?.customData || {};

  return (
    <Layout title={`API Reference - ${module.title}`} noFooter>
      <Canonical path={`/documentation/api/${moduleName}`} />
      <BrowserOnly fallback={<div className="doc-loading">Loading…</div>}>
        {() => {
          const RedocStandalone = require('./RedocBrowser').default;
          return (
            <RedocStandalone
              options={redocOptions}
              specUrl={getModuleSpecUrl(module)}
            />
          );
        }}
      </BrowserOnly>
    </Layout>
  );
};

export default Api;
