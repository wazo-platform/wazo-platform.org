const { getSections, getAllModules, getOverviews, getModuleName } = require('./utils');

module.exports = async newPage => {
  const sections = getSections();
  const allModules = getAllModules();
  const overviews = await getOverviews();

  // Create homepage
  newPage('/', 'index', { sections });

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
