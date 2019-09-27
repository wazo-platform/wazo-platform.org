const puppeteer = require('puppeteer');

process.setMaxListeners(Infinity);

const baseUrl = process.argv[2];
const testedUrl = [];

const checkUrl = async (page, url) => {
  try {
    let response = null;
    page.on('response', res => {
      if (res.url().indexOf('favicon.ico') === -1) {
        response = res;
      }
    });

    await page.goto(url, { waitUntil: 'networkidle2' });

    if (response && !response.ok()) {
      throw new Error(`status ${response.status()}`);
    }

    return true;
  } catch (err) {
    console.error(`Error in page: ${url}: ${err}`);
    return false;
  }
};

const crawlLinks = async (page, url) => {
  testedUrl.push(url);
  console.log(`Checking 404s in ${url} ...`);

  let hasError = !(await checkUrl(page, url));

  const links = await page.evaluate(() =>
    Array.from(document.getElementsByTagName('a')).map(node => node.href).map(url => url.split('#')[0]));

  const localLinks = Array.from(new Set(links.filter(link =>
    link.indexOf(baseUrl) !== -1 && link.indexOf('/blog') === -1)));

  for (let i = 0; i < localLinks.length; i++) {
    const link = localLinks[i];
    if (testedUrl.indexOf(link) !== -1 || link.indexOf('#') !== -1) {
      continue;
    }

    if (!(await checkUrl(page, link))) {
      hasError = true;
    }

    hasError = hasError || (await crawlLinks(page, link));
  }

  return hasError;
};

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  const hasError = await crawlLinks(page, baseUrl);

  await browser.close();
  process.exit(hasError ? 1 : 0);
})();
