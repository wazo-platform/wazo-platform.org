const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const { execSync } = require('child_process');

let cachedOverviews = null;
let cachedSections = null;
let cachedModules = null;
let cachedPlugins = null;

const walk = (basePath, regexp, encoding = 'utf8') => {
  const files = fs.readdirSync(basePath);
  const dirname = basePath.split('/').pop();
  let results = { [dirname]: {} };

  files.forEach(file => {
    const filePath = basePath + '/' + file;
    const stat = fs.lstatSync(filePath);

    // Do not follow symlinks to avoid max recursion on OSX with filename in different case
    // eg: Ringlist.xml symlink to RINGLIST.XML
    if (stat.isSymbolicLink()) {
      return;
    }

    if (stat.isDirectory()) {
      results = { ...results, ...walk(filePath, regexp, encoding) };
    } else if (file.match(regexp)) {
      results[dirname][file] = fs.readFileSync(filePath, encoding);
    }
  });

  return results;
};

const getOverviews = () => {
  if (cachedOverviews) {
    return cachedOverviews;
  }

  cachedOverviews = walk('content', /description\.md/);

  Object.keys(cachedOverviews).forEach(basePath => {
    const repoName = basePath.split('/')[0];
    if ('description.md' in cachedOverviews[basePath]) {
      cachedOverviews[repoName] = cachedOverviews[basePath]['description.md'];
    }
  });

  return cachedOverviews;
};

const getProvisioningPlugins = () => {
  if (cachedPlugins) {
    return cachedPlugins;
  }

  // Clone the repo
  const repoPath = '/tmp/wazo-provd-plugins';
  execSync(`
    rm -rf ${repoPath};
    git clone https://github.com/wazo-platform/wazo-provd-plugins.git ${repoPath};
  `);

  const pluginInfoFiles = walk(repoPath, /plugin-info/);
  cachedPlugins = {};

  // Parse plugin-info files
  Object.keys(pluginInfoFiles).forEach(basePath => {
    Object.keys(pluginInfoFiles[basePath]).forEach(fileName => {
      try {
        const content = JSON.parse(pluginInfoFiles[basePath][fileName]);
        Object.keys(content.capabilities).forEach(capabilityName => {
          const [vendor, phone, firmware] = capabilityName.split(', ');
          if (!(vendor in cachedPlugins)) {
            cachedPlugins[vendor] = {};
          }
          if (!(phone in cachedPlugins[vendor])) {
            cachedPlugins[vendor][phone] = {};
          }

          cachedPlugins[vendor][phone][firmware] = content.capabilities[capabilityName];
        });
      } catch (error) {
        console.log('json error in ', basePath, fileName, error);
      }
    });
  });

  delete cachedPlugins['*'];

  return cachedPlugins;
};

const readFileContent = filePath =>
  fs.readFileSync(path.resolve(__dirname + `../../../content/${filePath}`), { encoding: 'utf-8' });

const getSections = () => {
  if (cachedSections) {
    return cachedSections;
  }

  cachedSections = yaml.safeLoad(readFileContent('sections.yaml'));

  return cachedSections;
};

const getAllModules = () => {
  if (cachedModules) {
    return cachedModules;
  }

  cachedModules = getSections().reduce((acc, section) => {
    Object.keys(section.modules).forEach(moduleName => (acc[moduleName] = section.modules[moduleName]));
    return acc;
  }, {});

  return cachedModules;
};

const getModuleName = repoName => {
  const allModules = getAllModules();

  return Object.keys(allModules).find(moduleName => {
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
};

module.exports = {
  getModuleName,
  getAllModules,
  getSections,
  getOverviews,
  getProvisioningPlugins,
  readFileContent,
  walk,
};
