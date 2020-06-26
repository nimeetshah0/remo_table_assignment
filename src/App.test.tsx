export {};
const puppeteer = require('puppeteer');

//create global variables to be used in the beforeAll function
let browser: any;
let page: any;

const TEST_RUNS = 1;

const runTheTest = async () => {
  browser = await puppeteer.launch(
    {
      headless: false // headless mode set to false so browser opens up with visual feedback
    }
  )
  page = await browser.newPage()
  await page.goto('http://localhost:3000');
  await page.waitForSelector('#signInAnon');
  await page.click('#signInAnon');
  await page.waitForSelector('.loggedInUser');
  return page.waitFor(2000)
  return browser.close();
}


describe('Login', () => {
  test('users can login', async () => {
    for (let index = 0; index < TEST_RUNS; index++) {
      await runTheTest();
    }
}, 1600000)});
