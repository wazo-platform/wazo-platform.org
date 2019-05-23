const algoliasearch = require('algoliasearch');
const striptags = require('striptags');
const showdown = require('showdown');

const config = require('../../config');
const { getAllModules, getModuleName, getOverviews } = require('./utils');

const markdownConverter = new showdown.Converter();

const algoliaClient = algoliasearch(
  config.algolia.appId,
  config.algolia.apiKey
);

const overviewIndex = algoliaClient.initIndex('wazo-doc-overview');
index.setSettings({
  attributeForDistinct: 'title',
  attributesToHighlight: ['title', 'content'],
  attributesToSnippet: ['content'],
  distinct: true,
});

module.exports = async () => {
  // Reset algolia index
  await new Promise(resolve => overviewIndex.clearIndex(resolve));

  const overviews = await getOverviews();
  const allModules = await getAllModules();

  const algoliaObjects = Object.keys(overviews).reduce((acc, repoName) => {
    const moduleName = getModuleName(repoName);
    const module = allModules[moduleName];
    const htmlContent = markdownConverter.makeHtml(overviews[repoName]['description.md']);
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

  overviewIndex.addObjects(algoliaObjects);
};
