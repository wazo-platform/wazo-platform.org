import Link from '@docusaurus/Link';
import { usePluginData } from '@docusaurus/useGlobalData';
import ModuleRow from '@site/src/plugins/documentation/ModuleRow';
import type {
  DocModule,
  DocSection,
} from '@site/src/plugins/documentation/builder';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

// the services highlighted on the homepage, in display order; everything else
// about them (title, description, icon, which links exist) comes from the
// documentation plugin so this section cannot drift from /documentation
const FEATURED = [
  'authentication',
  'application',
  'configuration',
  'contact',
  'webhook',
  'cdr',
];

type DocumentationData = {
  sections: DocSection[];
  overviewPages: string[];
};

const HomepageServices = () => {
  const { sections, overviewPages } = usePluginData(
    'documentation-pages-build',
  ) as DocumentationData;

  const modules: Record<string, DocModule> = Object.assign(
    {},
    ...sections.map((section) => section.modules),
  );
  const overviews = new Set(overviewPages);

  return (
    <section className="container">
      <div className={styles.header}>
        <div>
          <Heading as="h2" className={styles.title}>
            Every service, documented
          </Heading>
          <p className={styles.subtitle}>
            Each micro-service ships with an overview, a REST reference, a live
            console and event schemas.
          </p>
        </div>
        <Link className={styles.allLink} to="/documentation">
          All API references
        </Link>
      </div>
      <div className="doc-rows">
        {FEATURED.filter((moduleName) => modules[moduleName]).map(
          (moduleName) => (
            <ModuleRow
              key={moduleName}
              moduleName={moduleName}
              module={modules[moduleName]}
              hasOverview={overviews.has(moduleName)}
            />
          ),
        )}
      </div>
    </section>
  );
};

export default HomepageServices;
