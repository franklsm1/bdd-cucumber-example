"use strict";

/*global driver:true*/
/*eslint no-undef: "error"*/
module.exports = function () {
    this.After(function () {
        return driver.quit();
    });
};
