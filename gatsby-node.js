const path = require('path');

const buildPages = require('./src/builder/pages');
const buildDiagrams = require('./src/builder/diagrams');
const buildSearch = require('./src/builder/search');
const buildProvisioning = require('./src/builder/provisioning');

exports.createPages = async ({ actions: { createPage } }) => {
  // Helper to generate page
  const newPage = (modulePath, component, context) =>
    createPage({
      path: modulePath,
      component: path.resolve(`src/component/${component}.js`),
      context,
    });

  console.info('⚡️ Building pages...');
  await buildPages(newPage);

  console.info('⚡️ Building diagrams...');
  await buildDiagrams();

  console.info('⚡️ Building search index ...');
  await buildSearch();

  console.info('⚡️ Building provisioning pages ...');
  await buildProvisioning(newPage);

  console.info('✨ All done !');
};
