const puppeteer = require('puppeteer');

process.setMaxListeners(Infinity);

const baseUrl = process.argv[2];
const testedUrl = [];
// Chrome headless can't open these format:
const EXCLUDED_EXTENSIONS = ['yml'];

const checkUrl = async (browser, url, fromUrl) => {
  // @SPANKME: this should NOT stay
  // Jira links are a tad flaky and tend to mess with this check, skipping
  const isJira = url.indexOf('wazo-dev.atlassian.net') !== -1;
  if ((url.indexOf('http://server:8000') !== -1 && url !== fromUrl) || isJira) {
    return true;
  }

  if (testedUrl.indexOf(url) !== -1) {
    return true;
  }
  testedUrl.push(url);

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
    console.error(`Error in ${url} (from ${fromUrl}): ${err}`);
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
  process.exit(errorCode);
})();
