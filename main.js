const puppeteer = require('puppeteer');
const { getRandomItem } = require('./assets/utils/getRandomItem.js')

const botConfiguration = {
    headless: 'new',
    timeout: 0,
    executablePath:
        process.env.NODE_ENV === "production"
            ? process.env.PUPPETEER_EXECUTABLE_PATH
            : puppeteer.executablePath(),
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
function generateRandomPhoneNumber() {
    const firstTwoDigits = ['70', '80', '90', '81', '91'];
    const randomFirstTwoDigits = firstTwoDigits[Math.floor(Math.random() * firstTwoDigits.length)];
    const lastEightDigits = Math.floor(100000000 + Math.random() * 900000000).toString().slice(1);
    return randomFirstTwoDigits + lastEightDigits;
}

async function fireAPIRequest() {
    while (true) { // Infinite loop
        try {
            const browser = await puppeteer.launch(botConfiguration);

            let userAgent = await getRandomItem('./assets/json/list-of-UA.json');

            const password = generateRandomString(Math.floor(Math.random() * (10 - 6 + 1)) + 6);
            const phone = generateRandomPhoneNumber();
            console.log(phone, password);

            const page = await browser.newPage();

            await page.setUserAgent(userAgent);

            await page.setDefaultNavigationTimeout(0);
            await page.setDefaultTimeout(0);

            await page.setRequestInterception(true);
            // terminate StyleSheetList,fontf file and images to increase load time and reduce resource usage
            page.on('request', (req) => {
                if (req.resourceType() == 'font' || req.resourceType() == 'image' || req.url().includes('hm.js')) {
                    req.abort();
                }
                else {
                    req.continue();
                }
            });

            await page.goto('https://ng.cashmaple.com/sign/up?invite_code=6364567');
            console.log('Registration page loaded');

            await page.waitForSelector('input');

            const inputHandles = await page.$$('input');

            // Type phone number into the first input box
            await inputHandles[0].type(phone);

            // Type password into the last two input boxes
            await inputHandles[1].type(password);
            await inputHandles[2].type(password);

            const buttonHandles = await page.$$('button');
            if (buttonHandles.length > 0) {
                await buttonHandles[0].click();
            } else {
                console.error('No button found');
            }

            console.log('Registration for ', phone, password, ' is successful');

            await page.waitForNavigation(),
                console.log('Browser is closing...');
                console.log('========================================================');
            setTimeout(function () {
                browser.close();
            }, 5000);
        } catch (err) {
            console.log('An error just occured. ', err)
        }
    }
}

fireAPIRequest();
