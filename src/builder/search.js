const algoliasearch = require('algoliasearch');
const striptags = require('striptags');
const showdown = require('showdown');
const config = require('../../config');

const markdownConverter = new showdown.Converter();

const algoliaClient = algoliasearch(
  config.algolia.appId,
  config.algolia.apiKey
);


const index = algoliaClient.initIndex('wazo-doc-overview');
index.setSettings({
  attributeForDistinct: 'title',
  attributesToHighlight: ['title', 'content'],
  attributesToSnippet: ['content'],
  distinct: true,
});

export default async () => {
  // Update algolia index
  await new Promise(resolve => index.clearIndex(resolve));

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

  index.addObjects(algoliaObjects);
}
