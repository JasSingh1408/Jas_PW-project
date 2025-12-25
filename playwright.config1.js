// @ts-check

import { chromium, defineConfig, devices } from 'playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
    testDir: './PWtests', // which tests to run
    timeout: 30 * 1000, // timeouts if any. this can be removed for default value which is 30 seconds.
    expect: {
    timeout: 15 * 1000, // assertion timeouts if any. this can be removed for default value which is 30 seconds.
    },
    retries: 1,
    workers: 2, //number of parallel threads to run the tests. by default it is 5.
    reporter: 'html',
    // Projects are process to bundling the use properties like browser, headless or not etc.

    projects: [
        {
            name: 'edge-headless',
            use: {
                browserName: 'chromium',
                channel: "msedge", // which browser to use
                headless: true, // false or true or nothing
                screenshot: 'on', //off, on, retain-on-failure,
                trace: 'retain-on-failure' //off, on, retain-on-failure,
            }
        },
        {
            name: 'chrome-header',
            use: {
                browserName: 'chromium',
                headless: false, // false or true or nothing
                screenshot: 'on', //off, on, only-on-failure,
                
                trace: 'retain-on-failure', //off, on, retain-on-failure,
                
                viewport: { width: 720, height: 720} ,      //for the size of the browser. this can be used to test responsive design. for example mobile view.
                //...devices['iPhone 14']   // to emulate the device and verify the responsive design of the webapp.
                //ignoreHTTPSErrors: true,   // to ignore the https errors ike SSL certificate errors where ADVANCED option need to be clicked and accepted.
                //permissions: ['geolocation'],  // to allow the geolocation permission popup as accepted. where sometime browser ask for permission to access the location of the user.
                video: 'retain-on-failure' //off, on, retain-on-failure, on-first-retry only

            }
        }
    ],

});