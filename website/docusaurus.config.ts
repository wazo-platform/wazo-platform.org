import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';
import 'dotenv/config';
import REDIRECTS from './redirects';
import pluginsDocumentationInit from './src/plugins/documentation/builder/index';
import pluginsProvisioningInit from './src/plugins/provisioning/builder/index';

const config: Config = {
  title: 'Wazo Platform',
  tagline: 'An Open Source project to build your own IP telecom platform',
  favicon: 'images/favicon.ico',
  staticDirectories: ['static'],
  future: {
    experimental_faster: true,
  },
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  // Set the production url of your site here
  url: 'https://beta.wazo-platform.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'wazo-platform', // Usually your GitHub org/user name.
  projectName: 'wazo-platform.org', // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  headTags: [
    {
      tagName: 'link',
      attributes: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
  ],
  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap',
  ],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    // image: 'images/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      logo: {
        alt: 'Wazo Platform',
        src: 'images/logo-light.svg',
        srcDark: 'images/logo-horiz.svg',
      },
      items: [
        { to: '/documentation', label: 'API References', position: 'left' },
        {
          type: 'dropdown',
          label: 'Unified Communication',
          position: 'left',
          to: '/docs/intro',
          items: [
            { to: '/docs/intro', label: 'Introduction' },
            { to: '/uc-doc/installation', label: 'Installation' },
            {
              to: '/docs/tutorials/authenticate-user-wazo-api',
              label: 'Tutorials',
            },
          ],
        },
        { to: '/docs/contribute', label: 'Contribute', position: 'left' },
        { to: '/release-notes', label: 'Release notes', position: 'left' },
        {
          href: 'https://github.com/wazo-platform',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Introduction',
              to: '/docs/intro',
            },
            {
              label: 'Install the platform',
              to: '/uc-doc/installation',
            },
            {
              label: 'Unified Communication guide',
              to: '/uc-doc',
            },
            {
              label: 'API references',
              to: '/documentation',
            },
            {
              label: 'Tutorials',
              to: '/docs/tutorials/authenticate-user-wazo-api',
            },
          ],
        },
        {
          title: 'Use cases',
          items: [
            {
              label: 'Unified Communication',
              to: '/use-cases#unified-communication',
            },
            {
              label: 'Contact center',
              to: '/use-cases#programmable-contact-center',
            },
            {
              label: 'AI voice applications',
              to: '/use-cases#ai-assisted-voice-applications',
            },
            {
              label: 'Embedded communications',
              to: '/use-cases#embedded-communications',
            },
            {
              label: 'All use cases',
              to: '/use-cases',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Contribute',
              to: '/docs/contribute',
            },
            {
              label: 'Mattermost',
              href: 'https://mm.wazo.community/wazo-platform/',
            },
            {
              label: 'Forum',
              href: 'https://wazo-platform.discourse.group/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Release notes',
              to: '/release-notes',
            },
            {
              label: 'Ecosystem',
              to: '/ecosystem',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/wazo-platform',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Wazo Platform`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ['ini', 'ruby', 'shell-session'],
    },
    mermaid: {
      theme: { light: 'neutral', dark: 'dark' },
    },
    ...(process.env.ALGOLIA_APP_ID
      ? {
          algolia: {
            appId: process.env.ALGOLIA_APP_ID,
            apiKey: process.env.ALGOLIA_API_KEY,
            indexName: process.env.ALGOLIA_INDEX_NAME,
          },
        }
      : {}),
  } satisfies Preset.ThemeConfig,
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'uc-doc',
        path: 'uc-doc',
        routeBasePath: 'uc-doc',
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        blogTitle: 'Release notes',
        id: 'release-notes',
        routeBasePath: 'release-notes',
        path: './release-notes',
        authorsMapPath: '../blog/authors.yml',
        blogSidebarCount: 15,
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: REDIRECTS,
      },
    ],
    pluginsProvisioningInit,
    pluginsDocumentationInit,
  ],
};

export default config;
