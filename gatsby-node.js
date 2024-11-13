const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { execSync } = require('child_process');
const showdown = require('showdown');
const algoliasearch = require('algoliasearch');
const striptags = require('striptags');
const RSS = require('rss');

const config = require('./config');
const constants = require('./src/contants');

const buildProvisioning = require('./src/builder/provisioning');

const markdownConverter = new showdown.Converter();
const overviews = {};
const corporate = !!process.env.CORPORATE;

const siteUrl = corporate ? 'http://developers.wazo.io' : 'https://wazo-platform.org';
const siteTitle = 'Wazo Platform Blog';

let hasSearch = config.algolia && !!config.algolia.appId && !!config.algolia.apiKey;

let algoliaIndex = null;

if (hasSearch) {
  console.info('Enabling Algolia search');
  const algoliaClient = algoliasearch(config.algolia.appId, config.algolia.apiKey);
  const algoliaKeyIndex = corporate ? constants.algoliaIndexDeveloper : constants.algoliaIndexPlatform;
  algoliaIndex = algoliaClient.initIndex(algoliaKeyIndex);

  algoliaIndex.setSettings(
    {
      attributeForDistinct: 'title',
      attributesToHighlight: ['title', 'content'],
      attributesToSnippet: ['content'],
      distinct: true,
    },
    (err) => {
      if (err) {
        hasSearch = false;
        console.error('Algolia error:' + err.message);
      }
    }
  );
}

const walk = (dir) => {
  const files = fs.readdirSync(dir);
  const dirname = dir.split('/').pop();

  console.info('processing ' + dir);

  files.forEach((file) => {
    const filePath = dir + '/' + file;

    if (fs.statSync(filePath).isDirectory()) {
      walk(filePath);
    } else if (file === 'description.md') {
      overviews[dirname] = fs.readFileSync(filePath, 'utf8');
    }
  });
};

const getArticles = async (graphql, newPageRef) => {
  console.info('generating articles');
  const articlesResponses = await graphql(`
    {
      allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/blog/" },
          frontmatter: { status: { eq: "published" } }
        }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            id
            fileAbsolutePath
            frontmatter {
              author
              category
              date(formatString: "DD MMMM YYYY")
              slug
              status
              tags
              title
            }
            html
            algoliaContent: excerpt(format: PLAIN, pruneLength: 10000)
            summary: excerpt(format: PLAIN, pruneLength: 250, truncate: true)
          }
        }
      }
    }
  `);

  // Handle errors
  if (articlesResponses.errors) {
    reporter.panicOnBuild(`Error while running "blog articles" GraphQL query.`);
    return;
  }

  const articles = [];

  var rssFeed = new RSS({
    title: siteTitle,
    description: 'Wazo Platform - An Open Source project to build your own IP telecom platform.',
    language: 'en',
    image_url: `${siteUrl}/images/og-image.jpg`,
    feed_url: `${siteUrl}/rss.xml`,
    site_url: `${siteUrl}/`,
  });

  articlesResponses.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const options = {
      summary: node.summary,
      ...node.frontmatter,
    }

    const blogPath = `/blog/${options.slug}`;
    console.info(`- generating article: ${blogPath}`);

    articles.push(options);
    const articleContext = {
      ...options,
      content: node.html,
      description: node.summary,
      algoliaContent: node.algoliaContent,
    };
    newPageRef(blogPath, 'blog/article', articleContext);

    rssFeed.item({
      title: options.title,
      description: options.summary + '...',
      url: `${siteUrl}${blogPath}`,
      author: options.author,
      categories: [options.category],
      date: options.date.indexOf(':') !== -1 ? options.date : `${options.date} 14:00:00`,
      enclosure: {
        url: `${siteUrl}/images/og-image.jpg`, // @todo change image, change when og:image per article
      },
    });
  });

  console.log('generating articles rss feed');
  fs.writeFile(__dirname + '/public/rss.xml', rssFeed.xml({ indent: true }), (err) => {
    if (err) console.log(err);
  });

  return articles;
};

const getTutorials = async (graphql, newPageRef) => {
  console.info('generating tutorials');
  const tutorialsResponse = await graphql(`
    {
      allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/tutorials/" },
          frontmatter: { status: { eq: "published" } }
        }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            id
            fileAbsolutePath
            frontmatter {
              author
              category
              date(formatString: "DD MMMM YYYY")
              slug
              status
              tags
              title
              ogimage
              thumbnail
            }
            html
            algoliaContent: excerpt(format: PLAIN, pruneLength: 10000)
            summary: excerpt(format: PLAIN, pruneLength: 250, truncate: true)
          }
        }
      }
    }
  `);

  // Handle errors
  if (tutorialsResponse.errors) {
    reporter.panicOnBuild(`Error while running "tutorials" GraphQL query.`);
    return;
  }

  const tutorials = [];

  // files.forEach((file, key) => {
  tutorialsResponse.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const options = {
      summary: node.summary,
      ...node.frontmatter,
    }

    const tutorialPath = `/tutorials/${options.slug}`;
    console.info(`- generating tutorial: ${tutorialPath}`);

    tutorials.push(options);

    const tutorialContext = {
      ...options,
      content: node.html,
      description: options.summary,
      algoliaContent: node.algoliaContent,
    };
    newPageRef(tutorialPath, 'tutorials/tutorial', tutorialContext);
  });

  return tutorials;
};

const walk_md_files = (dir, path, acc, index) => {
  const files = fs.readdirSync(dir);

  console.info('scanning dir ' + dir);

  files.forEach((file) => {
    const filePath = dir + '/' + file;

    if (fs.statSync(filePath).isDirectory()) {
      if (file !== '.') {
        walk_md_files(filePath, path + file + '/', acc, index);
      }
    } else if (file === index) {
      console.info('storing index ' + path);
      acc[path] = fs.readFileSync(filePath, 'utf8');
    } else {
      const names = file.split('.');
      const ext = names.pop();
      const fname = names.pop();
      if (ext === 'md') {
        const p = path + fname;
        console.info('storing ' + p);
        acc[p] = fs.readFileSync(filePath, 'utf8');
      }
    }
  });
  return acc;
};

exports.createPages = async ({ graphql, actions: { createPage, createRedirect } }) => {
  console.log(`Building ${corporate ? 'developers.wazo.io' : 'wazo-platform.org'}`);
  try {
    fs.writeFile('config-wazo.js', `export const corporate = ${corporate ? 'true' : 'false'};`, () => null);
  } catch (e) {
    console.error(e);
  }

  // Init algolia index
  if (hasSearch) {
    await new Promise((resolve) => algoliaIndex.clearIndex(resolve));
  }

  const ecosystemDoc = fs.readFileSync('./content/ecosystem.md', 'utf8');
  const installDoc = fs.readFileSync('./content/use-cases.md', 'utf8');
  const installC4Doc = fs.readFileSync('./content/install-c4.md', 'utf8');
  const contributeDoc = fs.readFileSync('./content/contribute.md', 'utf8');
  const rawSections = yaml.load(fs.readFileSync('./content/sections.yaml', { encoding: 'utf-8' }));
  // when CORPORATE is set do not filter section, otherwise only display what is not for developer
  const sections = rawSections.filter((section) => (!corporate ? !section.corporate : true));
  const contributeDocs = walk_md_files('content/contribute', '', {}, 'description.md');
  const allModules = sections.reduce((acc, section) => {
    Object.keys(section.modules).forEach((moduleName) => (acc[moduleName] = section.modules[moduleName]));
    return acc;
  }, {});
  var algoliaObjects = [];

  const getModuleName = (repoName) =>
    Object.keys(allModules).find((moduleName) => {
      const { repository } = allModules[moduleName];

      return repository && repoName === repository.replace('wazo-', '');
    });

  // Helper to generate page
  const newPage = (pagePath, component, context) => {
    createPage({
      path: pagePath,
      component: path.resolve(`src/component/${component}.js`),
      context,
    });

    if (hasSearch && component !== '404') {
      const title = context ? (context.module ? context.module.title : context.title) : null;
      const description = context ? (context.module ? context.module.description : context.description) : null;

      if (!title) {
        return;
      }

      // Remove pagePath starting with a slash, causing issue with algolia
      let searchPagePath = pagePath;
      if (searchPagePath.indexOf('/') === 0) {
        searchPagePath = pagePath.substring(1);
      }

      algoliaObjects.push({
        title,
        description,
        content: context && context.algoliaContent ? context.algoliaContent : null,
        pagePath: searchPagePath,
      });
    }
  };

  // Retrieve all diagrams
  const diagramOutputDir = path.resolve('public/diagrams/');
  walk('content');

  // Generate puml to svg
  console.info(`generating svg diagrams in ${diagramOutputDir}...`);
  try {
    execSync(`make plantuml-diagrams DIAGRAM_DIRECTORY=${diagramOutputDir}`);
  } catch (e) {
    console.error('error generating diagrams', e);
  }
  console.info(`done generating svg diagrams`);

  // Create homepage
  await newPage('/', corporate ? 'corporate/index' : 'home/index', corporate ? { sections, overviews } : null);

  if (!corporate) {
    // Create doc page
    await newPage('/documentation', 'documentation/index', { sections, overviews });
    // Create install page
    await newPage('/use-cases', 'use-cases/index', { installDoc });
    // Create install-c4 page
    await newPage('/use-cases/class-4', 'install_c4/index', { installC4Doc });
    // Create contribute page
    await newPage('/contribute', 'contribute/index', { content: contributeDoc });
    // Create blog page
    const articles = await getArticles(graphql, newPage);
    await newPage('/blog', 'blog/index', { articles });
    // Create tutorials page
    const tutorials = await getTutorials(graphql, newPage);
    await newPage('/tutorials', 'tutorials/index', { tutorials });
    // Create ecosystem page
    await newPage('/ecosystem', 'ecosystem/index', { content: ecosystemDoc });

    // Create contribute pages
    Object.keys(contributeDocs).forEach((fileName) => {
      const rawContent = contributeDocs[fileName].split('\n');
      const title = rawContent[0];
      rawContent.shift();
      rawContent.shift();
      const content = rawContent.join('\n');
      var p = '/contribute/' + path.basename(fileName, '.md');
      console.log('generating ' + p);
      newPage(p, 'contribute/index', { content, title });
    });

    // Create uc-doc pages
    // ---------
    const ucDocsResponse = await graphql(`
      {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/uc-doc/" } }
          sort: { fields: [frontmatter___title], order: ASC }
        ) {
          edges {
            node {
              id
              fileAbsolutePath
              frontmatter {
                title
                subtitle
              }
              html
              algoliaContent: excerpt(pruneLength: 800)
              description: excerpt(pruneLength: 200)
            }
          }
        }
      }
    `);

    // Handle errors
    if (ucDocsResponse.errors) {
      reporter.panicOnBuild(`Error while running UC-DOC GraphQL query.`);
      return;
    }

    let dynamicUcDocMenu = {};
    ucDocsResponse.data.allMarkdownRemark.edges.forEach(({ node }) => {
      const pagePath = node.fileAbsolutePath.split('content/')[1].split('.')[0].replace('index', '');

      newPage(pagePath, 'uc-doc/index', {
        content: node.html,
        title: node.frontmatter.title,
        algoliaContent: node.algoliaContent,
        pagePath,
      });

      // Generate json file to make a dynamic submenu in /uc-doc
      const pathSteps = pagePath.split('/').filter((step) => step !== '');
      dynamicUcDocMenu = pathSteps.reduce((acc, val, index) => {
        let depthCursor = acc;
        for (var i = 0; i < index; i++) {
          depthCursor = depthCursor[pathSteps[i]];
        }
        if (!depthCursor[val]) {
          depthCursor[val] = {};
        }

        if (pathSteps.length - 1 === index) {
          depthCursor[val].self = {
            title: node.frontmatter.title,
            path: `/${pagePath}`,
          };
        }

        return acc;
      }, dynamicUcDocMenu);
    });

    // custom patch to provisioning
    dynamicUcDocMenu['uc-doc'].ecosystem.supported_devices = {
      self: {
        title: 'Supported Devices',
        path: '/uc-doc/ecosystem/supported_devices',
      },
    };

    const jsonFolder = `${__dirname}/public/json`;
    if (!fs.existsSync(jsonFolder)) {
      fs.mkdirSync(jsonFolder);
    }
    fs.writeFile(`${jsonFolder}/uc-doc-submenu.json`, JSON.stringify(dynamicUcDocMenu), (err) => {
      if (err) console.log(err);
    });
  }

  // Create api pages
  // ----------
  sections.forEach((section) =>
    Object.keys(section.modules).forEach((moduleName) =>
      newPage(`/documentation/api/${moduleName}.html`, 'documentation/api', {
        moduleName,
        module: section.modules[moduleName],
      })
    )
  );

  // Create console pages
  sections.forEach((section) =>
    Object.keys(section.modules).forEach(
      (moduleName) =>
        !!section.modules[moduleName].redocUrl &&
        newPage(`/documentation/console/${moduleName}`, 'documentation/console', {
          moduleName,
          module: section.modules[moduleName],
          modules: section.modules,
          auth_url: !section.modules[moduleName].corporate
            ? allModules['authentication'].redocUrl
            : section.modules['euc-authentication'].redocUrl,
        })
    )
  );

  // Create async-ap pages
  sections.forEach((section) =>
    Object.keys(section.modules).forEach(
      (moduleName) =>
        !!section.modules[moduleName].redocUrl &&
        newPage(`/documentation/events/${moduleName}`, 'documentation/async-api', {
          moduleName,
          module: section.modules[moduleName],
          modules: section.modules,
          auth_url: !section.modules[moduleName].corporate
            ? allModules['authentication'].redocUrl
            : section.modules['euc-authentication'].redocUrl,
        })
    )
  );

  // integrate graphiql @TEMP: restricting to 'contact'... for now i hope :)
  sections.forEach((section) =>
    Object.keys(section.modules).forEach(
      (moduleName) =>
        !!section.modules[moduleName].graphql &&
        newPage(`/documentation/graphql/${moduleName}`, 'documentation/graphql', {
          moduleName,
          module: section.modules[moduleName],
          modules: section.modules,
        })
    )
  );

  // Create overview and extra pages
  Object.keys(allModules).forEach((moduleName) => {
    const module = allModules[moduleName];
    const repoName = module.repository;
    if (!repoName) {
      return;
    }

    newPage(`/documentation/overview/${moduleName}.html`, 'documentation/overview', {
      overview: overviews[repoName.replace('wazo-', '')],
      moduleName,
      module,
    });

    const dir = 'content/' + repoName.replace('wazo-', '');
    const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
    files.forEach((file, key) => {
      if (file.endsWith('.md') && file != 'description.md') {
        const filePath = `${dir}/${file}`;
        const baseName = file.replace('.md', '');
        const content = fs.readFileSync(filePath, 'utf8');
        console.log(`generating /documentation/overview/${moduleName}-${baseName}.html`);
        newPage(`/documentation/overview/${moduleName}-${baseName}.html`, 'documentation/overview', {
          overview: content,
          moduleName,
          module,
        });
      }
    });
  });

  console.info('Building provisioning...');
  await buildProvisioning(newPage);

  // Update algolia index
  if (hasSearch) {
    algoliaIndex.addObjects(algoliaObjects);
  }

  // Generate redirect 301
  // ---------
  console.log('Generating 301 redirects');
  const generate301 = (fromPath, toPath) => {
    const enhancedFromPath = fromPath.endsWith('.html') ? fromPath : fromPath.endsWith('/') ? fromPath : `${fromPath}/`

    createRedirect({
      fromPath: enhancedFromPath,
      isPermanent: true,
      redirectInBrowser: true,
      toPath,
    });
  }

  if (corporate) {
    ['/api/nestbox-deployd.html', '/documentation/api/nestbox-deployd.html'].forEach((fromPath) => {
      generate301(fromPath, '/documentation/api/euc-deployd.html');
    });

    ['/api/nestbox-configuration.html', '/documentation/api/nestbox-configuration.html'].forEach((fromPath) => {
      generate301(fromPath, '/documentation/api/euc-configuration.html');
    });

    ['/api/nestbox-authentication.html', '/documentation/api/nestbox-authentication.html'].forEach((fromPath) => {
      generate301(fromPath, '/documentation/api/euc-authentication.html');
    });
  }

  generate301('/uc-doc/administration/contact_directories/general', '/uc-doc/administration/contact_directories');
  generate301('/uc-doc/administration/interconnections/introduction', '/uc-doc/administration/interconnections');
  generate301('/uc-doc/administration/provisioning/introduction', '/uc-doc/administration/provisioning');
  generate301('/uc-doc/administration/users', '/uc-doc/administration');
  generate301('/uc-doc/api_sdk/mobile/push_notification', '/uc-doc/api_sdk/mobile_push_notification');
  generate301('/uc-doc/api_sdk/mobile', '/uc-doc/api_sdk/mobile_push_notification');
  generate301('/uc-doc/contact_center/introduction', '/uc-doc/contact_center');
  generate301('/uc-doc/high_availability/introduction', '/uc-doc/high_availability');
  generate301('/uc-doc/installation/install-system', '/uc-doc/installation');
  generate301('/uc-doc/upgrade/introduction', '/uc-doc/upgrade');
  generate301('/uc-doc/upgrade/upgrade_specific_version/introduction', '/uc-doc/upgrade/upgrade_specific_version');
  generate301('/uc-doc/system/wazo-auth/introduction', '/uc-doc/system/wazo-auth');
  generate301('/uc-doc/system/wazo-confd/introduction', '/uc-doc/system/wazo-confd');
  generate301('/uc-doc/system/wazo-confgend/introduction', '/uc-doc/system/wazo-confgend');
  generate301('/uc-doc/system/wazo-dird/introduction', '/uc-doc/system/wazo-dird');
  generate301('/uc-doc/introduction', '/uc-doc');
  generate301('/uc-doc/attribution', '/uc-doc');
  generate301('/uc-doc/changelog', '/uc-doc');
  generate301('/uc-doc/upgrade/old_upgrade_notes', '/uc-doc/upgrade/archives/upgrade_notes');
  generate301('/uc-doc/upgrade/upgrade_from_wazo_18_03', '/uc-doc/upgrade/archives/upgrade_from_wazo_18_03');
  generate301('/uc-doc/upgrade/migrate_i386_to_amd64', '/uc-doc/upgrade/archives/migrate_i386_to_amd64');
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        mainCSS: !!process.env.CORPORATE
          ? path.resolve(__dirname, 'src/styles/corporate')
          : path.resolve(__dirname, 'src/styles/platform'),
      },
    },
  });
};
