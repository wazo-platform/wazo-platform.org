const buildPages = require('./src/builder/pages');

exports.createPages = async ({ actions: { createPage } }) => {
  await buildPages(createPage);
};
