const puppeteer = require('puppeteer');
const path = require('path')

const TIMEOUT_MS = 5000;
const run = async () => {
    const loginUrl = `https://vuhuykhanh-3.cybozu-dev.com/login?saml=off`;
    console.log(`Open ${loginUrl}`);
    try {
        
        let launchOptions = { headless: false, args: ['--start-maximized'] };
        const browser = await puppeteer.launch(launchOptions);
        const page = await browser.newPage();
        await page.goto(loginUrl);
        await page.waitFor(".form-username-slash", { timeout: TIMEOUT_MS });
        await page.type(".form-username-slash > input.form-text", 'cybozu');
        await page.type(".form-password-slash > input.form-text", 'cybozu');
        console.log(111);
        await page.click('.login-button');
        
        await page.waitForNavigation({
            timeout: TIMEOUT_MS,
            waitUntil: "domcontentloaded"
        });
        console.log(222);
    
        const customizeUrl = `https://vuhuykhanh-3.cybozu-dev.com/k/admin/system/customize/`;
        await page.goto(customizeUrl);

        console.log(333);
        await page.waitForSelector("#jsFiles_DESKTOP-browse", {
        timeout: TIMEOUT_MS
        });
        await page.click('#jsFiles_DESKTOP-browse > .plupload > input[type="file"]');
        const file = await page.$('#jsFiles_DESKTOP-browse > .plupload > input[type="file"]')
            
        const filePath = path.relative(process.cwd(), __dirname + '/customPortalTemplate.js');
        console.log(filePath);
        
        await file.uploadFile(
            'C:/KimCuc/RD/portal/portal-builder-client/customPortalTemplate.js'
        );
        console.log(5555);
        await page.click('input[type="submit"]');
        // console.log(666);

        // await page.waitForSelector(".notifier-body-cybozu", {
        //     hidden: true,
        //     timeout: TIMEOUT_MS
        // });
        
        console.log(7777);
        // browser.close();
    } catch (e) {
        console.log(e);
        
    }
}
run()