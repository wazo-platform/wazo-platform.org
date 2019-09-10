const { getSections, getAllModules, getOverviews, readFileContent } = require('./utils');

module.exports = async newPage => {
  const sections = getSections();
  const allModules = getAllModules();
  const installDoc = readFileContent('install.md');
  const contributeDoc = readFileContent('contribute.md');
  const overviews = getOverviews();

  // Create homepage
  newPage('/', 'index', { sections });
  // Create doc page
  newPage('/documentation', 'documentation/index', { sections, overviews });
  // Create install page
  newPage('/install', 'install/index', { installDoc });
  // Create contribute page
  newPage('/contribute', 'contribute/index', { contributeDoc });

  // Create api pages
  sections.forEach(section =>
    Object.keys(section.modules).forEach(moduleName =>
      newPage(`/documentation/api/${moduleName}.html`, 'documentation/api', {
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

    newPage(`/documentation/overview/${moduleName}.html`, 'documentation/overview', {
      overview: overviews[repoName.split('-')[1]],
      moduleName,
      module,
    });
  });
};
