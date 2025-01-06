const puppeteer = require('puppeteer');
const axios = require('axios');

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

  // Gigaset wiki links are flaky
  if (url.indexOf('https://teamwork.gigaset.com/gigawiki') !== -1) {
    return true;
  }

  // wazo.io website links are flaky
  if (url.indexOf('https://wazo.io') !== -1) {
    return true;
  }

  // Don't check for mail URLs
  if (url.indexOf('mailto:') !== -1) {
    return true;
  }

  // tldrlegal.com responds status 403
  if (url.indexOf('tldrlegal.com') !== -1) {
    return true;
  }

  // gnu.org responds status 429 when crawling multiple URLs in a row
  if (url.indexOf('www.gnu.org') !== -1) {
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

  if (!isUrlLocal) {
    let result = false;
    let statusCode = null;
    await axios
      .get(url)
      .then(response => {
        result = true;
        console.log(response.status, result);
      })
      .catch(error => {
        let message = null;
        if (!error.response) {
          message = `Error in ${url} (from ${fromUrl}): Could not get a response: ${error.message}`;
        } else {
          message = `Error in ${url} (from ${fromUrl}): status code ${error.response.status}`;
        }
        console.error(message);
        errorUrl.push(message);
      });
    return result;
  }

  try {
    let responses = [];
    const browserPage = await browser.newPage();
    let result = true;

    // One response event for each file on the page
    browserPage.on('response', res => {
      if (res.url().indexOf('favicon.ico') !== -1) {
        return;
      }
      responses.push(res);
    });

    await browserPage.goto(url, { waitUntil: 'networkidle2' });

    const mainResponse = responses.find(response => response.url() === url);
    const isResponseFailed = response => response && response.status() >= 400;
    const failedResponses = responses.filter(response => isResponseFailed(response));
    const allResponsesOk = failedResponses.length === 0;
    if (isResponseFailed(mainResponse) || (isUrlLocal && !allResponsesOk)) {
      throw new Error(
        `statuses ${failedResponses.map(response => (response ? response.status() : 'unknown'))}`
      );
    }

    let links = await browserPage.evaluate(() =>
      Array.from(document.getElementsByTagName('a')).map(node => node.href)
    );

    await browserPage.close();

    for (let i = 0; i < links.length; i++) {
      const rawLink = links[i];
      const isLinkLocal = rawLink.indexOf(baseUrl) !== -1;

      // avoid local duplicates with trailing slash
      const link = isLinkLocal ? rawLink.replace(/\/+$/, '') : rawLink;

      const isAnchorLink = link.indexOf('#') !== -1;
      if (isAnchorLink) {
        continue;
      }

      const alreadyTested = testedUrl.indexOf(link) !== -1;
      if (alreadyTested) {
        continue;
      }

      // Do not crawl external link in external url
      const isExternalLinkFromExternalPage = !isUrlLocal && !isLinkLocal;
      if (isExternalLinkFromExternalPage) {
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
