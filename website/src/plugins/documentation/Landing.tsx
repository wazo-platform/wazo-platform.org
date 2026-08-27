import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';
import PageHero from '@site/src/components/PageHero';
import Layout from '@theme/Layout';

import type { DocModule, DocSection } from './builder';
import { iconifyName } from './helper';
import './documentation.css';

type Props = {
  route: {
    customData?: {
      sections: DocSection[];
      overviewPages: string[];
    };
  };
};

const ModuleRow = ({
  moduleName,
  module,
  hasOverview,
}: {
  moduleName: string;
  module: DocModule;
  hasOverview: boolean;
}) => {
  const icon = iconifyName(module.icon);

  return (
    <div id={moduleName} className="doc-row">
      <div className="doc-row__icon">
        {icon && <Icon icon={icon} width={18} height={18} />}
      </div>
      <div className="doc-row__ident">
        <b>
          {module.title}
          {module.beta && <span className="doc-badge-beta">BETA</span>}
        </b>
        <span>{module.description}</span>
      </div>
      <div className="doc-row__links">
        {module.url && <a href={module.url}>GitHub</a>}
        {!module.url && hasOverview && (
          <Link to={`/documentation/overview/${moduleName}`}>Overview</Link>
        )}
        {module.redocUrl && (
          <Link
            to={`/documentation/api/${moduleName}`}
            className="api-reference"
          >
            API Reference
          </Link>
        )}
        {module.redocUrl && (
          <Link to={`/documentation/console/${moduleName}`}>Console</Link>
        )}
        {module.apiEvents && (
          <Link to={`/documentation/events/${moduleName}`}>Events</Link>
        )}
        {module.graphql && (
          <Link to={`/documentation/graphql/${moduleName}`}>GraphQL</Link>
        )}
      </div>
      <div className="doc-row__repo">
        {module.repositoryLink !== false && module.repository && (
          <a href={`https://github.com/wazo-platform/${module.repository}`}>
            {module.repository}
          </a>
        )}
      </div>
    </div>
  );
};

const Landing = ({ route }: Props) => {
  const sections = route?.customData?.sections || [];
  const overviewPages = new Set(route?.customData?.overviewPages || []);

  return (
    <Layout
      title="Documentation for developers"
      description="Wazo Platform APIs and services documentation"
    >
      <PageHero
        title="API Documentation"
        description="Every Wazo Platform service, with its overview, REST reference, live console and event schemas — everything you need to program the platform."
      >
        <div className="doc-hero-chips">
          {sections.map((section) => (
            <a key={section.slug} href={`#${section.slug}`}>
              {section.name}
            </a>
          ))}
        </div>
      </PageHero>
      <main className="container doc-landing">
        {sections.map((section) => (
          <section key={section.slug} id={section.slug}>
            <h2>{section.name}</h2>
            <div className="doc-rows">
              {Object.entries(section.modules).map(([moduleName, module]) => (
                <ModuleRow
                  key={moduleName}
                  moduleName={moduleName}
                  module={module}
                  hasOverview={overviewPages.has(moduleName)}
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
