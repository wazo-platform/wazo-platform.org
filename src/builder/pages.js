const fs = require('fs');

const { getRepo, retrieveGithubFiles } = require('./utils');

export default async (createPage) => {
  // Helper to generate page
  const newPage = (modulePath, component, context) =>
    createPage({
      path: modulePath,
      component: path.resolve(`src/component/${component}.js`),
      context,
    });

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

  const overviews = await retrieveGithubFiles(getRepo('wazo-pbx/wazo-doc-ng'), '/', 'description.md');

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
}
