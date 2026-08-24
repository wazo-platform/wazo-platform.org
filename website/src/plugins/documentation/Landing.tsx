import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';
import Layout from '@theme/Layout';

import Canonical from './Canonical';
import type { DocModule, DocSection } from './builder';
import { iconifyName } from './helper';
import './documentation.css';

type Props = {
  route: {
    customData?: {
      sections: DocSection[];
    };
  };
};

const ModuleCard = ({
  moduleName,
  module,
}: {
  moduleName: string;
  module: DocModule;
}) => {
  const icon = iconifyName(module.icon);
  const overviewUrl = `/documentation/overview/${moduleName}`;
  const mainUrl =
    module.overview === false ? undefined : module.url || overviewUrl;

  return (
    <div id={moduleName} className="card doc-module-card">
      <div className="card__header">
        {mainUrl ? (
          <Link to={mainUrl} className="doc-module-card__title">
            {icon && <Icon icon={icon} width={32} height={32} />}
            <h3>
              {module.title}
              {module.beta && (
                <span className="badge badge--secondary">BETA</span>
              )}
            </h3>
          </Link>
        ) : (
          <div className="doc-module-card__title">
            {icon && <Icon icon={icon} width={32} height={32} />}
            <h3>
              {module.title}
              {module.beta && (
                <span className="badge badge--secondary">BETA</span>
              )}
            </h3>
          </div>
        )}
      </div>
      <div className="card__body">
        <p>{module.description}</p>
      </div>
      {!module.url && (
        <div className="card__footer doc-module-card__links">
          {module.overview !== false && <Link to={overviewUrl}>Overview</Link>}
          {module.redocUrl && (
            <Link to={`/documentation/api/${moduleName}`}>API Reference</Link>
          )}
          {module.redocUrl && (
            <Link to={`/documentation/console/${moduleName}`}>API Console</Link>
          )}
          {module.apiEvents && (
            <Link to={`/documentation/events/${moduleName}`}>API Events</Link>
          )}
          {module.graphql && (
            <Link to={`/documentation/graphql/${moduleName}`}>GraphQL</Link>
          )}
          {module.repositoryLink !== false && module.repository && (
            <a href={`https://github.com/wazo-platform/${module.repository}`}>
              <Icon icon="fa-brands:github" /> {module.repository}
            </a>
          )}
        </div>
      )}
    </div>
  );
};

const Landing = ({ route }: Props) => {
  const sections = route?.customData?.sections || [];

  return (
    <Layout
      title="Documentation for developers"
      description="Wazo Platform APIs and services documentation"
    >
      <Canonical path="/documentation" />
      <main className="container doc-landing">
        <h1>Documentation</h1>
        {sections.map((section) => (
          <section key={section.slug} id={section.slug}>
            <h2>{section.name}</h2>
            <div className="doc-landing__grid">
              {Object.entries(section.modules).map(([moduleName, module]) => (
                <ModuleCard
                  key={moduleName}
                  moduleName={moduleName}
                  module={module}
                />
              ))}
            </div>
          </section>
        ))}
      </main>
    </Layout>
  );
};

export default Landing;
