const buildPages = require('./src/builder/pages');
const buildDiagrams = require('./src/builder/diagrams');
const buildSearch = require('./src/builder/search');

exports.createPages = async ({ actions: { createPage } }) => {
  console.info('⚡️ Building pages...');
  await buildPages(createPage);

  console.info('⚡️ Building diagrams...');
  await buildDiagrams();

  console.info('⚡️ Building search index ...');
  await buildSearch();

  console.info('✨ All done !');
};
