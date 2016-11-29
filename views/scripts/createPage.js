'use strict';

const request = new XMLHttpRequest();

/**
 * Retrieve the JSON response from the URL containing catalog info and build the web page
 *
 * @param pugProductFunction - the Pug template function that builds a catalog product HTML
 * @param pugMainFunction - the Pug template function that builds the main product HTML
 */
// eslint-disable-next-line no-unused-vars
function loadProducts(pugProductFunction, pugMainFunction){
    request.open('GET', '/getProducts', true);
    request.onload = () => {

        if (request.status === 200) {
            populatePage(pugProductFunction, pugMainFunction)
        } else {
            // The target server was reached, but an error was returned
        }
    };
    request.onerror = () => {
        // There was a connection error of some sort
    };
    request.send();
}

/**
 * Parse the JSON response from the request and use it to build the page
 *
 * @param pugProductFunction - the Pug template function that builds a catalog product HTML
 * @param pugMainFunction - the Pug template function that builds the main product HTML
 */
function populatePage(pugProductFunction, pugMainFunction){
    let productList = JSON.parse(request.responseText);
    let catalog = document.getElementById('catalog');

    let first = true;
    productList.forEach((product) => {
        if (product.name && product.salePrice && product.features && product.mediumImage && product.largeImage) {
            let info = {
                price: '$' + product.salePrice,
                description: product.name,
                //only get the first 3 features
                moreInfo: product.features.slice(0, 3),
                smImg: product.mediumImage,
                regImg: product.largeImage
            };
            if (first) populateMainProduct(pugMainFunction, info);
            first = false;
            populateCatalog(pugProductFunction, catalog, info)
        }
    });
}

/**
 * Build the main product div using the Pug template that was compiled by the server on startup
 *
 * @param pugMainFunction the Pug template function that builds the main product HTML
 * @param info - the variables to pass to the Pug template
 */
function populateMainProduct(pugMainFunction, info){
    let mainProductDiv = document.getElementById('mainProduct');
    mainProductDiv.innerHTML = pugMainFunction(info);
}

/**
 * Build a normal product div using the Pug template that was compiled by the server on startup
 *
 * @param pugProductFunction - the Pug template function that builds a catalog product HTML
 * @param catalog - the div object holding all the products
 * @param info - the variables to pass to the Pug template
 */
function populateCatalog(pugProductFunction, catalog, info) {
    let div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = pugProductFunction(info);

    //set the button click to return the current div
    // eslint-disable-next-line no-undef
    div.getElementsByClassName('_button')[0].onclick = ((productDiv => () => putInMainProduct(productDiv)))(div);

    //Create a div for the product and append it to the catalog
    catalog.appendChild(div);
}