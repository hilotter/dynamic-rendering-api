/* eslint-disable */
require('source-map-support').install();

const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

const isUrl = (url) => {
  return !!url.match(/https?:\/\//);
};

let browser = null;

exports.handler = async function (event) {
  const query = event.queryStringParameters;
  const url = query && query.url && decodeURI(query.url);
  if (!url || !isUrl(url)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'url required',
      }),
    };
  }

  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();

    // https://github.com/puppeteer/puppeteer/blob/main/src/common/DeviceDescriptors.ts
    const iPhone = puppeteer.devices['iPhone X'];
    await page.emulate(iPhone);

    await page.goto(url, { waitUntil: 'networkidle2' });
    const html = await page.content();

    await browser.close();

    return {
      statusCode: 200,
      body: html,
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 502, body: JSON.stringify({ message: error }) };
  }
};
