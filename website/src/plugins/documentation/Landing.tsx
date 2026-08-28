import PageHero from '@site/src/components/PageHero';
import Layout from '@theme/Layout';

import ModuleRow from './ModuleRow';
import type { DocSection } from './builder';
import './documentation.css';

type Props = {
  route: {
    customData?: {
      sections: DocSection[];
      overviewPages: string[];
    };
  };
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
