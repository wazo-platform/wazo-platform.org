const fs = require('fs');
const yaml = require('js-yaml');
const github = require('octonode');

const config = require('../../config');

const ghClient = github.client(config.githubToken);
let cachedOverviews = null;
let cachedSections = null;
let cachedModules = null;

const getRepo = name => ghClient.repo(name);

const retrieveGithubFiles = async (repo, basePath = '/', regexp, branch = 'master', encoding = 'utf-8') => {
  const files = await repo.contentsAsync(basePath, branch);

  const results = await Promise.all(
    files[0].map(async file => {
      const results = { [basePath]: {} };
      if (file.type === 'dir') {
        return retrieveGithubFiles(repo, file.path, regexp, branch, encoding);
      }

      if (file.name.match(regexp)) {
        const contentResponse = await repo.contentsAsync(file.path, branch);
        results[basePath][file.name] = Buffer.from(contentResponse[0].content, 'base64').toString(encoding);
      }

      return results;
    })
  );

  return results.reduce((acc, obj) => {
    obj &&
      Object.keys(obj).forEach(basePath => {
        Object.keys(obj[basePath]).forEach(fileName => {
          if (!(basePath in acc)) {
            acc[basePath] = {};
          }
          acc[basePath][fileName] = obj[basePath][fileName];
        });
      });

    return acc;
  }, {});
};

const getOverviews = async () => {
  if (cachedOverviews) {
    return cachedOverviews;
  }

  cachedOverviews = await retrieveGithubFiles(getRepo('wazo-pbx/wazo-doc-ng'), '/', /description\.md/);
  Object.keys(cachedOverviews).forEach(basePath => {
    const repoName = basePath.split('/')[0];
    cachedOverviews[repoName] = cachedOverviews[basePath]['description.md'];
  });

  return cachedOverviews;
};

const getSections = () => {
  if (cachedSections) {
    return cachedSections;
  }

  cachedSections = yaml.safeLoad(fs.readFileSync('./data/sections.yaml', { encoding: 'utf-8' }));

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
  retrieveGithubFiles,
  getRepo,
};
