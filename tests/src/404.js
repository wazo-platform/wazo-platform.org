const puppeteer = require('puppeteer');

process.setMaxListeners(Infinity);

const baseUrl = process.argv[2];
const testedUrl = [];
const errorUrl = [];
// Chrome headless can't open these format:
const EXCLUDED_EXTENSIONS = ['yml'];

const checkUrl = async (browser, url, fromUrl) => {

  if (!url || url === '' || testedUrl.indexOf(url) !== -1) {
    return true;
  }

  testedUrl.push(url);

  // Jira links are a tad flaky and tend to mess with the process, skipping
  const isJira = url.indexOf('wazo-dev.atlassian.net') !== -1;
  if (isJira) {
    console.log(`Skipping Jira ${url} (from: ${fromUrl}) ...`);
    return true;
  }

  // Puppeteer has trouble handling binaries, let's take a few out of the equation
  const isBinary = url.match(/\.(odt|pdf|sh|cfg)$/);
  if (isBinary) {
    console.log(`Skipping ${url.slice(-3).toUpperCase()} binary ${url} (from: ${fromUrl}) ...`);
    return true;
  }

  const extensionParts = url.split('.');
  const extension = extensionParts[extensionParts.length -1];
  const isUrlLocal = url.indexOf(baseUrl) !== -1;

  if (EXCLUDED_EXTENSIONS.indexOf(extension) !== -1) {
    return true;
  }

  console.log(`Checking ${url} (from: ${fromUrl}) ...`);

  // Don't check for mail URLs and we got 403s on tldrlegal.com ...
  if (url.indexOf('mailto:') !== -1 || url.indexOf('tldrlegal') !== -1) {
    return true;
  }

  try {
    let response = null;
    const browserPage = await browser.newPage();
    let result = true;

    browserPage.on('response', res => {
      if (res.url().indexOf('favicon.ico') === -1) {
        response = res;
      }
    });

    await browserPage.goto(url, { waitUntil: 'networkidle2' });

    if (response && response.status() > 401) {
      throw new Error(`status ${response.status()}`);
    }

    let links = await browserPage.evaluate(
      () =>
        Array.from(document.getElementsByTagName('a')).map(node => node.href));

    await browserPage.close();

    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      if (testedUrl.indexOf(link) !== -1 || link.indexOf('#') !== -1) {
        continue;
      }

      // Do not crawl external link in external url
      if (!isUrlLocal && link.indexOf(baseUrl) === -1) {
        continue;
      }

      result = await checkUrl(browser, link, url) && result;
    }

    return result;
  } catch (err) {
    const message = `Error in ${url} (from ${fromUrl}): ${err}`;
    console.error(message);
    errorUrl.push(message);
    return false;
  }
};

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const ok = await checkUrl(browser, baseUrl, baseUrl);

  await browser.close();
  const errorCode = ok ? 0 : 1;

  console.log(`Checking 404s exiting : ${errorCode}`);

  if (errorUrl.length) {
    console.error("###### PROBLEMS\n", errorUrl.join("\n"))
  }

  process.exit(errorCode);
})();
