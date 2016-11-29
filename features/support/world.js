'use strict';

const webdriver = require('selenium-webdriver'),
    assert = require('assert'),
    winston = require('winston');

//Use chrome as the default if no browser is specified
const browser = process.env.BROWSER || 'chrome';
winston.log('info',`Using a ${browser} web driver to test the following cucumber feature `);

/**
 * Create the driver to run the tests
 *
 * @returns {WebDriver} - returns the selenium driver to run the cucumber scenario
 */
function getDriver(){
    if (browser === 'firefox') {
        return new webdriver.Builder().withCapabilities({
            browserName: 'firefox',
            javascriptEnabled: true,
            acceptSslCerts: true
        }).build();
    } else {
        return new webdriver.Builder().withCapabilities({
            browserName: browser,
            javascriptEnabled: true,
            acceptSslCerts: true
        }).build();
    }
}

function World() {
    let driver = getDriver();
    let runtime = {
        driver: driver,         // the driver object of the provided browser name
        by: webdriver.By,       // expose the web driver By method in a lowercase version
        until: webdriver.until, // provide easy access to the web driver until method
        assert: assert          // expose assert to allow variable testing
    };

    // Expose each runtime variable globally for each step definition (makes the 'this.' prefix not required)
    Object.keys(runtime).forEach(key => {
        global[key] = runtime[key];
    });
}

module.exports = function () {
    this.World = World;
};
