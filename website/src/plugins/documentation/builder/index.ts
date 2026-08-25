import fs from 'node:fs';
import path from 'node:path';

import type { PluginModule } from '@docusaurus/types';
import { load } from 'js-yaml';

export type DocModule = {
  title: string;
  description: string;
  icon?: string;
  color?: string;
  repository?: string;
  redocUrl?: string;
  apiEvents?: boolean;
  graphql?: boolean;
  beta?: boolean;
  url?: string;
  overview?: boolean;
  repositoryLink?: boolean;
};

export type DocSection = {
  name: string;
  slug: string;
  corporate?: boolean;
  modules: Record<string, DocModule>;
};

type LoadedContent = {
  sections: DocSection[];
  overviews: Record<string, string>;
};

const SECTIONS_FILE = '../content/sections.yaml';
const OVERVIEW_DIR = './documentation';

const componentPath = (name: string) =>
  `@site/src/plugins/documentation/${name}`;

const shortName = (repository: string) => repository.replace('wazo-', '');

const loadOverviews = (sections: DocSection[]) => {
  const overviews: Record<string, string> = {};

  for (const section of sections) {
    for (const [moduleName, module] of Object.entries(section.modules)) {
      if (!module.repository || module.overview === false) {
        continue;
      }

      const dir = path.join(OVERVIEW_DIR, shortName(module.repository));
      if (!fs.existsSync(dir)) {
        continue;
      }

      for (const file of fs.readdirSync(dir)) {
        if (!file.endsWith('.md')) {
          continue;
        }

        const content = fs.readFileSync(path.join(dir, file), 'utf8');
        const pageName =
          file === 'description.md'
            ? moduleName
            : `${moduleName}-${file.replace('.md', '')}`;
        overviews[pageName] = content;
      }
    }
  }

  return overviews;
};

const plugin: PluginModule = async () => ({
  name: 'documentation-pages-build',

  async loadContent(): Promise<LoadedContent> {
    const allSections = load(
      fs.readFileSync(SECTIONS_FILE, 'utf8'),
    ) as DocSection[];
    const sections = allSections.filter(
      (section) => section.corporate !== true,
    );
    return { sections, overviews: loadOverviews(sections) };
  },

  async contentLoaded({ content, actions }) {
    const { sections, overviews } = content as LoadedContent;

    const allModules: Record<string, DocModule> = Object.assign(
      {},
      ...sections.map((section) => section.modules),
    );
    const authUrl = allModules.authentication?.redocUrl;

    actions.addRoute({
      path: '/documentation',
      component: componentPath('Landing.tsx'),
      exact: true,
      customData: { sections },
    });

    for (const section of sections) {
      for (const [moduleName, module] of Object.entries(section.modules)) {
        if (!module.redocUrl) {
          continue;
        }

        actions.addRoute({
          path: `/documentation/api/${moduleName}`,
          component: componentPath('Api.tsx'),
          exact: true,
          customData: { moduleName, module },
        });

        actions.addRoute({
          path: `/documentation/console/${moduleName}`,
          component: componentPath('Console.tsx'),
          exact: true,
          customData: { moduleName, module, modules: section.modules, authUrl },
        });

        if (module.apiEvents) {
          actions.addRoute({
            path: `/documentation/events/${moduleName}`,
            component: componentPath('Events.tsx'),
            exact: true,
            customData: { moduleName, module, modules: section.modules },
          });
        }

        if (module.graphql) {
          actions.addRoute({
            path: `/documentation/graphql/${moduleName}`,
            component: componentPath('GraphQLConsole.tsx'),
            exact: true,
            customData: { moduleName, module, authUrl },
          });
        }
      }
    }

    for (const [moduleName, module] of Object.entries(allModules)) {
      if (!module.repository || module.overview === false) {
        continue;
      }

      const prefix = `${moduleName}-`;
      const pageNames = Object.keys(overviews).filter(
        (name) => name === moduleName || name.startsWith(prefix),
      );

      for (const pageName of pageNames) {
        actions.addRoute({
          path: `/documentation/overview/${pageName}`,
          component: componentPath('Overview.tsx'),
          exact: true,
          customData: { pageName, module, overview: overviews[pageName] },
        });
      }
    }
  },
});

export default plugin;
