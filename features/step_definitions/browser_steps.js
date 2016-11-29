'use strict';
let config = require('config');
let host = config.get("env.HOST"),
    port = config.get("env.PORT");

/*global driver:true by:true until:true assert:true*/
/*eslint no-undef: "error"*/
module.exports = function () {

    //Set global variables to store the price of the product that where the button clicked
    let productPrice, mainPrice;

    this.Given(/^I am on the store web page$/,{timeout: 10 * 1000}, () =>
        i_am_on_the_store_web_page(driver));

    this.When(/^I click on the "([^"]*)" button$/, (buttonName) =>
        i_click_on_a_button(buttonName, driver, by));

    this.Then(/^that product is shown in the mainProduct$/, () =>
        that_product_is_shown_in_the_mainProduct(driver, by, assert));

    this.Then(/^an alert appears with the correct price$/, () =>
        an_alert_appears_with_the_correct_price(driver, assert));

    /**
     * Check to ensure that the mainProductImg element id has a source (verifies that the page loaded)
     *
     * @param driver
     */
    function i_am_on_the_store_web_page(driver) {
        //reset the prices for each scenario run
        productPrice = mainPrice = 'free';

        driver.get(`${host}:${port}`);
        return driver.wait(until.elementLocated(by.id('mainProductImg')), 8 * 1000)
            .then(src => assert(src, `The mainProduct object does not contain an image, the page failed to load properly`));
    }

    /**
     * Simulate a button press and get the price of the product that has been clicked on (to compare with later)
     *
     * @param buttonName - The name of the button (retrieved from the step description in the 'store.feature' file)
     * @param driver
     * @param by
     */
    function i_click_on_a_button(buttonName, driver, by) {
        return driver.findElements(by.name(buttonName)).then(buttonArray => {

            // For 'View More' get the second button because the first corresponds to what is in the
            // mainProduct on load. Else it is the add to cart button, so there is only 1
            let buttonElement = buttonName === 'View More' ? buttonArray[1] : buttonArray[0];

            // Use the parent of the button to get the selected products price to compare with later
            let selectedDiv = buttonElement.findElement(by.xpath('..'));
            return selectedDiv.findElement(by.className('price')).getText()
                .then(price => {
                    buttonName === 'View More' ? productPrice = price : mainPrice = price;
                    return buttonElement.click();
                });
        });
    }

    /**
     * Ensure the clicked product has the same price as the main product (verifies that it was put in the main div)
     *
     * @param driver
     * @param by
     * @param assert
     */
    function that_product_is_shown_in_the_mainProduct(driver, by, assert) {
        return driver.findElement(by.id('mainProductPrice')).getText()
            .then(price => assert(price === productPrice,
                `The mainProduct price, ${price}, was not updated with the clicked price, ${productPrice}`));
    }

    /**
     * Ensure an alert appears with the correct price after the 'Add to Cart' button has been pressed
     *
     * @param driver
     * @param assert
     */
    function an_alert_appears_with_the_correct_price(driver, assert) {
        let alert = driver.switchTo().alert();
        return alert.getText()
            .then(text => {
                // If the 'View More' button was clicked before the 'Add to Cart' button assert using the product price
                let price = productPrice !== 'free' ? productPrice : mainPrice;
                assert(text.includes(price), `The alert text, ${text}, does not contain the correct product price, ${price}`);
                return alert.accept();
            });
    }

};

