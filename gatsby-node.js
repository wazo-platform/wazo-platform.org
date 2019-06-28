const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { execSync } = require('child_process');
const showdown = require('showdown');
const algoliasearch = require('algoliasearch');
const striptags = require('striptags');

const config = require('./config');

const markdownConverter = new showdown.Converter();
const overviews = {};
let hasSearch = config.algolia && !!config.algolia.appId && !!config.algolia.apiKey;

let algoliaIndex = null;

if (hasSearch) {
  const algoliaClient = algoliasearch(config.algolia.appId, config.algolia.apiKey);
  algoliaIndex = algoliaClient.initIndex('wazo-doc-overview');
  algoliaIndex.setSettings(
    {
      attributeForDistinct: 'title',
      attributesToHighlight: ['title', 'content'],
      attributesToSnippet: ['content'],
      distinct: true,
    },
    err => {
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

  console.info("processing " + dir);

  files.forEach((file) => {
    const filePath = dir + '/' + file;

    if (fs.statSync(filePath).isDirectory()) {
      walk(filePath);
    } else if (file === 'description.md') {
      overviews[dirname] = fs.readFileSync(filePath, 'utf8');
    }
  })
};

exports.createPages = async ({ actions: { createPage } }) => {
  const sections = yaml.safeLoad(
    fs.readFileSync('./content/sections.yaml', { encoding: 'utf-8' })
  );
  const allModules = sections.reduce((acc, section) => {
    Object.keys(section.modules).forEach(moduleName => (acc[moduleName] = section.modules[moduleName]));
    return acc;
  }, {});

  const getModuleName = repoName =>
    Object.keys(allModules).find(moduleName => {
      const { repository } = allModules[moduleName];

      return (
        repository &&
        repoName ===
          repository
            .split('-')
            .splice(1)
            .join('-')
      );
    });

  // Helper to generate page
  const newPage = (modulePath, component, context) =>
    createPage({
      path: modulePath,
      component: path.resolve(`src/component/${component}.js`),
      context,
    });

  // Retrieve all diagrams
  const diagramOutputDir = path.resolve('public/diagrams/');
  execSync(`mkdir -p ${diagramOutputDir}`);
  execSync(`rm -rf ${diagramOutputDir}/*`);
  walk('content');

  // Generate puml to svg
  console.info(`generating svg diagrams in ${diagramOutputDir}...`);
  execSync(
    `for f in $(find content -name '*.puml'); do cp $f ${diagramOutputDir}/$(basename $(dirname $f))-$(basename $f); done; java -jar $JAVA_HOME/lib/plantuml.jar -tsvg ${diagramOutputDir}/*.puml; rm -f ${diagramOutputDir}/*.puml`
  );

  // Update algolia index
  if (hasSearch) {
    await new Promise(resolve => algoliaIndex.clearIndex(resolve));
    const algoliaObjects = Object.keys(overviews).reduce((acc, repoName) => {
      const moduleName = getModuleName(repoName);
      const module = allModules[moduleName];
      const htmlContent = markdownConverter.makeHtml(overviews[repoName]);
      const content = striptags(htmlContent);

      acc.push({
        repository: repoName,
        moduleName,
        title: module.title,
        description: module.description,
        content,
      });

      return acc;
    }, []);

    algoliaIndex.addObjects(algoliaObjects);
  }

  // Create homepage
  await newPage('/', 'index', { sections, overviews });

  // Create api pages
  sections.forEach(section =>
    Object.keys(section.modules).forEach(moduleName =>
      newPage(`/api/${moduleName}.html`, 'api', {
        moduleName,
        module: section.modules[moduleName],
      })
    )
  );

  // Create overview pages
  Object.keys(allModules).forEach(moduleName => {
    const module = allModules[moduleName];
    const repoName = module.repository;
    if (!repoName) {
      return;
    }

    newPage(`/overview/${moduleName}.html`, 'overview', {
      overview: overviews[repoName.split('-')[1]],
      moduleName,
      module,
    });
  });
};
