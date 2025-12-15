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
    timeout: 30 *1000, // timeouts if any. this can be removed for default value which is 30 seconds.
    expect : {
        timeout: 15 *1000, // assertion timeouts if any. this can be removed for default value which is 30 seconds.
    },

    reporter: 'html',

  use: {
    browserName: 'chromium', // which browser to use
    headless : false,
    //screenshot: 'on',
    trace: 'retain-on-failure' //off, on, retain-on-failure,

  },

});