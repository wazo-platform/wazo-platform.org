import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';

import type { DocModule } from './builder';
import { iconifyName } from './helper';
import './documentation.css';

type Props = {
  moduleName: string;
  module: DocModule;
  hasOverview: boolean;
};

// One service row: icon, title/description, the links that actually have a
// route, and the repository. Shared by the /documentation landing and the
// homepage services section so the two never diverge.
const ModuleRow = ({ moduleName, module, hasOverview }: Props) => {
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

export default ModuleRow;
