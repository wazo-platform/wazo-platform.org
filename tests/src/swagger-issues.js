const puppeteer = require('puppeteer');

process.setMaxListeners(Infinity);

const baseUrl = process.argv[2];
const SWAGGER_ERROR_MESSAGE = 'Something went wrong...';
let hasError = false;

(async () => {
  const url = `${baseUrl}/documentation`;
  console.log(`Checking swagger issues for ${url}`);
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--single-process', '--disable-web-security', '--disable-dev-profile'],
  });
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector('h1');

  const links = await page.evaluate(() => {
    return Array.from(document.getElementsByClassName('api-reference')).map(node => node.href);
  });

  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    console.log(`Checking ${link} ...`);

    await page.goto(link);
    await page.waitForSelector('h1');

    const error = await page.evaluate(() => {
      return document.getElementsByTagName('h1')[0].innerText;
    });

    if (error === SWAGGER_ERROR_MESSAGE) {
      console.error(`Swagger error in page: ${link}`);
      hasError = true;
    }
  }

  await browser.close();
  process.exit(hasError ? 1 : 0);
})();
