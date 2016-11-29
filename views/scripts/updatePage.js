'use strict';

/**
 * Put the information about the clicked product into the main product div
 *
 * @param productDiv - The div element containing the information about the selected product
 */
// eslint-disable-next-line no-unused-vars
function putInMainProduct(productDiv){

    /* Since each product was created through the Pug template the order of the children and attributes is constant
     *  0 -> [input] 'view more' button
     *  1 -> [img] small thumbnail image
     *  2 -> [img] the 'hidden' regular thumbnail image
     *  3 -> [pre] description
     *  4 -> [ul] the 'hidden' more info object
     *  4.children[0...N] -> [li] bullet points of the features
     *  5 -> [pre] price
     */
    let product = productDiv.children;

    /* The above comment applies to the main element as well
     *  0 -> [div] main image div
     *  0.children.mainProductImg -> [img] the main image element
     *  1 -> [div] info about the product
     *  1.children.mainDescription.innerHTML -> [text] the main description of the product
     *  1.children.mainProductInfo -> [ul] contains li objects with the bulletted list of features
     *  2 -> [div] the div containing the price and the 'add to cart' button
     *  2.children.mainProductPrice.innerHTML ->  [text] The price of the product
     */
    let mainProduct = document.getElementById('mainProduct').children;

    mainProduct[0].children.mainProductImg.setAttribute('src', product[2].currentSrc);
    mainProduct[1].children.mainDescription.innerHTML = product[3].innerHTML;
    mainProduct[1].children.mainProductInfo.innerHTML = product[4].innerHTML;
    mainProduct[2].children.mainProductPrice.innerHTML = product[5].innerHTML;
}

/**
 * Create an alert pop-up containing the price of the main product
 *
 * @param mainButtonElement - The button element inside the main product div
 */
// eslint-disable-next-line no-unused-vars
function alertPrice(mainButtonElement){
    //TODO: make alert look cooler
    let price = mainButtonElement.parentElement.children.mainProductPrice.innerHTML;
    alert(`The price is: ${price}`);
}

