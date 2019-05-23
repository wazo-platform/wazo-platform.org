const github = require('octonode');
const config = require('../../config');

const ghClient = github.client(config.githubToken);

export const getRepo = (name) => ghClient.repo(name);

export const retrieveGithubFiles = async (repo, basePath = '/', regexp) => {
  const files = await repo.contentsAsync(basePath, 'master');

  await Promise.all(
    files[0].map(async file => {
      const repoName = basePath.split('/')[0];

      if (file.type === 'dir') {
        return retrieveGithubFiles(repo, file.path, regexp);
      }

      // if (file.name.split('.')[1] === 'puml') {
      //   const contentResponse = await repo.contentsAsync(file.path, 'master');
      //   const content = Buffer.from(
      //     contentResponse[0].content,
      //     'base64'
      //   ).toString('utf-8');
      //
      //   return fs.writeFileSync(`/tmp/${repoName}-${file.name}`, content);
      // }

      if (file.name === 'description.md') {
        const contentResponse = await repo.contentsAsync(file.path, 'master');
        overviews[repoName] = Buffer.from(
          contentResponse[0].content,
          'base64'
        ).toString('utf-8');
      }
    })
  );
};
