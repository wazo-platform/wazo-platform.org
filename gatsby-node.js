const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { exec } = require('child_process');
const github = require('octonode');
const showdown = require('showdown');
const algoliasearch = require('algoliasearch');
const striptags = require('striptags');

const config = require('./config');

const markdownConverter = new showdown.Converter();
const ghClient = github.client(config.githubToken);
const repo = ghClient.repo('wazo-pbx/wazo-doc-ng');
const overviews = {};

// const algoliaClient = algoliasearch(
//   config.algolia.appId,
//   config.algolia.apiKey
// );
// const index = algoliaClient.initIndex('wazo-doc-overview');
// index.setSettings({
//   attributeForDistinct: 'title',
//   attributesToHighlight: ['title', 'content'],
//   attributesToSnippet: ['content'],
//   distinct: true,
// });

const retrieveGithubFiles = async (basePath = '/') => {
  const files = await repo.contentsAsync(basePath, 'master');

  await Promise.all(
    files[0].map(async file => {
      const repoName = basePath.split('/')[0];

      if (file.type === 'dir') {
        return retrieveGithubFiles(file.path);
      }

      if (file.name.split('.')[1] === 'puml') {
        const contentResponse = await repo.contentsAsync(file.path, 'master');
        const content = Buffer.from(
          contentResponse[0].content,
          'base64'
        ).toString('utf-8');

        return fs.writeFileSync(`/tmp/${repoName}-${file.name}`, content);
      }

      if (file.name === 'description.md') {
        const contentResponse = await repo.contentsAsync(file.path, 'master');
        overviews[repoName] = Buffer.from(
          contentResponse[0].content,
          'base64'
        ).toString('utf-8');
      }
    })
  );
};

exports.createPages = async ({ actions: { createPage } }) => {
  const sections = yaml.safeLoad(
    fs.readFileSync('./data/sections.yaml', { encoding: 'utf-8' })
  );
  const allModules = sections.reduce((acc, section) => {
    Object.keys(section.modules).forEach(
      moduleName => (acc[moduleName] = section.modules[moduleName])
    );
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
  exec(`mkdir -p ${diagramOutputDir}`);
  exec(`rm -rf ${diagramOutputDir}/*`);
  await retrieveGithubFiles();

  // Generate puml to svg
  exec(
    `java -jar $JAVA_HOME/lib/plantuml.jar -tsvg /tmp/*.puml -o ${diagramOutputDir}`
  );

  // // Update algolia index
  // await new Promise(resolve => index.clearIndex(resolve));
  // const algoliaObjects = Object.keys(overviews).reduce((acc, repoName) => {
  //   const moduleName = getModuleName(repoName);
  //   const module = allModules[moduleName];
  //   const htmlContent = markdownConverter.makeHtml(overviews[repoName]);
  //   const content = striptags(htmlContent);

  //   acc.push({
  //     repository: repoName,
  //     moduleName,
  //     title: module.title,
  //     description: module.description,
  //     content,
  //   });

  //   return acc;
  // }, []);

  // index.addObjects(algoliaObjects);

  // Create homepage
  await newPage('/', 'index', { sections });

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
  Object.keys(overviews).forEach(repoName => {
    const moduleName = getModuleName(repoName);

    if (!moduleName) {
      return;
    }

    const module = allModules[moduleName];

    newPage(`/overview/${moduleName}.html`, 'overview', {
      overview: overviews[repoName],
      moduleName,
      module,
    });
  });
};
