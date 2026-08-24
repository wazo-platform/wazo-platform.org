import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { useEffect, useRef, useState } from 'react';
import '@asyncapi/react-component/styles/default.min.css';

import Canonical from './Canonical';
import type { DocModule } from './builder';
import { getServiceName } from './helper';
import './documentation.css';

const SERVER_ROOT = 'https://asyncapi.wazo.community/wazo-platform';

const asyncApiConfig = {
  schemaID: 'custom-spec',
  show: {
    errors: false,
  },
};

const AsyncApi = ({ service }: { service: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [none, setNone] = useState(true);

  useEffect(() => {
    (async () => {
      setNone(false);
      setLoading(true);

      const filename = `wazo-${service.replace('-', '_')}.yml`;

      try {
        const response = await fetch(`${SERVER_ROOT}/${filename}`);
        if (response.status !== 200) {
          throw new Error(
            `There are no event listing available for service "${service}"`,
          );
        }

        const schema = await response.text();

        const AsyncApiStandalone = require('@asyncapi/react-component/browser/standalone');
        await AsyncApiStandalone.render(
          { schema, config: asyncApiConfig },
          ref.current,
        );
      } catch (e) {
        console.warn(e);
        setNone(true);
      }

      setLoading(false);
    })();
  }, [service]);

  return (
    <>
      {(loading || none) && (
        <div className="doc-loading">
          {loading && <span>Loading events…</span>}
          {none && (
            <h5>No event listing is provided for service "{service}"</h5>
          )}
        </div>
      )}
      <div ref={ref} />
    </>
  );
};

type Props = {
  route: {
    customData?: {
      moduleName: string;
      module: DocModule;
      modules: Record<string, DocModule>;
    };
  };
};

const Events = ({ route }: Props) => {
  const { moduleName, module, modules } = route?.customData || {};

  return (
    <Layout title={`API Events - ${module.title}`}>
      <Canonical path={`/documentation/events/${moduleName}`} />
      <div className="container doc-console">
        <div className="doc-console__siblings">
          {Object.keys(modules).map(
            (m) =>
              modules[m].apiEvents && (
                <Link
                  key={m}
                  to={`/documentation/events/${m}`}
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
        <div className="doc-console__main">
          <AsyncApi service={getServiceName(module.redocUrl)} />
        </div>
      </div>
    </Layout>
  );
};

export default Events;
