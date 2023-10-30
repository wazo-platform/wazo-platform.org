const puppeteer = require('puppeteer');

process.setMaxListeners(Infinity);

const baseUrl = process.argv[2];
const testedUrl = [];
const errorUrl = [];
// Chrome headless can't open these format:
const EXCLUDED_EXTENSIONS = ['yml'];

function isUrlWhitelisted(url, fromUrl) {
  // Jira links are a tad flaky and tend to mess with the process, skipping
  const isJira = url.indexOf('wazo-dev.atlassian.net') !== -1;
  if (isJira) {
    return true;
  }

  // Puppeteer has trouble handling binaries, let's take a few out of the equation
  const isBinary = url.match(/\.(odt|pdf|sh|cfg|dia|conf)$/);
  if (isBinary) {
    return true;
  }

  // There are a few dynamically-generated example URLs (redoc), let's skip them also
  if (url.indexOf('//my-service') !== -1) {
    return true;
  }

  // User-specific Github link for listing active PR
  if (url.indexOf('https://github.com/pulls?') !== -1) {
    return true;
  }

  // API doc referencing Microsoft API
  if (url.indexOf('https://graph.microsoft.com/v1.0/me/contacts') !== -1) {
    return true;
  }

  // API doc referencing example.com
  if (url.indexOf('example.com') !== -1) {
    return true;
  }

  // Youtube links are hard to open with automated tools
  if (url.indexOf('youtu.be') !== -1) {
    return true;
  }

  return false;
}

const checkUrl = async (browser, url, fromUrl) => {
  if (!url || url === '' || testedUrl.indexOf(url) !== -1) {
    return true;
  }

  testedUrl.push(url);

  if (isUrlWhitelisted(url)) {
    console.log(`Skipping ${url} (from: ${fromUrl}) ...`);
    return true;
  }

  const extensionParts = url.split('.');
  const extension = extensionParts[extensionParts.length - 1];
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
    let responses = [];
    const browserPage = await browser.newPage();
    let result = true;

    // One response event for each file on the page
    browserPage.on('response', (res) => {
      if (res.url().indexOf('favicon.ico') !== -1) {
        return;
      }
      responses.push(res);
    });

    await browserPage.goto(url, { waitUntil: 'networkidle2' });

    const mainResponse = responses.find((response) => response.url() === url);
    const isResponseFailed = (response) => response && response.status() >= 400;
    const failedResponses = responses.filter((response) => isResponseFailed(response));
    const allResponsesOk = failedResponses.length === 0;
    if (isResponseFailed(mainResponse) || (isUrlLocal && !allResponsesOk)) {
      throw new Error(`statuses ${failedResponses.map((response) => response.status())}`);
    }

    let links = await browserPage.evaluate(() =>
      Array.from(document.getElementsByTagName('a')).map((node) => node.href)
    );

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

      result = (await checkUrl(browser, link, url)) && result;
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
    // Listing problem URLs, instead of have to scour the logs
    console.error('###### PROBLEMS\n', errorUrl.join('\n'));
  }

  process.exit(errorCode);
})();
