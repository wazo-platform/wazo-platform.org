const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { execSync } = require('child_process');
const showdown = require('showdown');
const algoliasearch = require('algoliasearch');
const striptags = require('striptags');

const config = require('./config');

const markdownConverter = new showdown.Converter();
const overviews = {};
const forDeveloper = !!process.env.FOR_DEVELOPER;
let hasSearch = config.algolia && !!config.algolia.appId && !!config.algolia.apiKey;

let algoliaIndex = null;

if (hasSearch) {
  const algoliaClient = algoliasearch(config.algolia.appId, config.algolia.apiKey);
  algoliaIndex = algoliaClient.initIndex('wazo-doc-overview');
  algoliaIndex.setSettings(
    {
      attributeForDistinct: 'title',
      attributesToHighlight: ['title', 'content'],
      attributesToSnippet: ['content'],
      distinct: true,
    },
    err => {
      if (err) {
        hasSearch = false;
        console.error('Algolia error:' + err.message);
      }
    }
  );
}

const walk = dir => {
  const files = fs.readdirSync(dir);
  const dirname = dir.split('/').pop();

  console.info('processing ' + dir);

  files.forEach(file => {
    const filePath = dir + '/' + file;

    if (fs.statSync(filePath).isDirectory()) {
      walk(filePath);
    } else if (file === 'description.md') {
      overviews[dirname] = fs.readFileSync(filePath, 'utf8');
    }
  });
};

const getArticles = async createPage => {
  const dir = './content/blog';
  const articles = [];
  const files = fs.readdirSync(dir);
  console.info('generating articles');
  files.forEach((file, key) => {
    const filePath = `${dir}/${file}`;

    const content = fs.readFileSync(filePath, 'utf8');
    const body = content.split("\n").splice(8).join("\n");
    const options = {};
    content.split("\n").splice(0, 7).forEach(row => {
      const [key, value] = row.split(': ');
      options[key.toLowerCase()] = value;
    });

    const summaryNumWords = 40;
    options.summary = striptags(markdownConverter.makeHtml(body)).split(' ').splice(0, summaryNumWords).join(' ');

    const url = `/blog/${options.slug}`;
    
    if (!fs.statSync(filePath).isDirectory() && options.status === 'published') {
      console.info(`generating article ${key}`);

      articles.push(options);

      createPage({
        path: url,
        component: path.resolve(`src/component/blog/article.js`),
        context: {
          ...options,
          body,
        },
      })
    }
  });
  return articles;
};

exports.createPages = async ({ actions: { createPage } }) => {
  const installDoc = fs.readFileSync('./content/install.md', 'utf8');
  const contributeDoc = fs.readFileSync('./content/contribute.md', 'utf8');
  const rawSections = yaml.safeLoad(fs.readFileSync('./content/sections.yaml', { encoding: 'utf-8' }));
  // when FOR_DEVELOPER is set do not filter section, otherwise only display what is not for developer
  const sections = rawSections.filter(section => !forDeveloper ? !section.developer : true);
  const contributeDocs = fs.readdirSync('./content/contribute').reduce(function(acc, file) {
    if (file.split('.').pop() === 'md') {
      var p = './content/contribute/' + file;
      acc[p] = fs.readFileSync(p, 'utf8');
    }
    return acc;
  }, {});
  const allModules = sections.reduce((acc, section) => {
    Object.keys(section.modules).forEach(moduleName => (acc[moduleName] = section.modules[moduleName]));
    return acc;
  }, {});

  console.log('contributeDocs ' + contributeDocs);

  const getModuleName = repoName =>
    Object.keys(allModules).find(moduleName => {
      const { repository } = allModules[moduleName];

      return (
        repository &&
        repoName ===
          repository.replace('wazo-', '')
      );
    });

  // Helper to generate page
  const newPage = (modulePath, component, context) =>
        createPage({
          path: modulePath,
          component: path.resolve(`src/component/${component}.js`),
          context,
        });

  // Retrieve all diagrams
  const diagramOutputDir = path.resolve('public/diagrams/');
  execSync(`mkdir -p ${diagramOutputDir}`);
  execSync(`rm -rf ${diagramOutputDir}/*`);
  walk('content');

  // Generate puml to svg
  console.info(`generating svg diagrams in ${diagramOutputDir}...`);
  execSync(
    `for f in $(find content -name '*.puml'); do cp $f ${diagramOutputDir}/$(basename $(dirname $f))-$(basename $f); done; java -jar $JAVA_HOME/lib/plantuml.jar -tsvg ${diagramOutputDir}/*.puml; rm -f ${diagramOutputDir}/*.puml`
  );

  // Update algolia index
  if (hasSearch) {
    await new Promise(resolve => algoliaIndex.clearIndex(resolve));
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

    algoliaIndex.addObjects(algoliaObjects);
  }

  const articles = await getArticles(createPage);

  // Create homepage
  await newPage('/', 'index');

  // Create doc page
  await newPage('/documentation', 'documentation/index', { sections, overviews });
  // Create install page
  await newPage('/install', 'install/index', { installDoc });
  // Create contribute page
  await newPage('/contribute', 'contribute/index', { content: contributeDoc });
  // Create blog page
  await newPage('/blog', 'blog/index', { articles });

  // Create contribute pages
  Object.keys(contributeDocs).forEach(fileName => {
    const rawContent = contributeDocs[fileName].split("\n");
    const title = rawContent[0];
    rawContent.shift();
    rawContent.shift();
    const content = rawContent.join("\n");
    var p = '/contribute/' + path.basename(fileName, '.md');
    console.log('generating ' + p);
    newPage(p, 'contribute/index', { content, title });
  });

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
      overview: overviews[repoName.replace('wazo-', '')],
      moduleName,
      module,
    });
  });
};
