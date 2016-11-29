'use strict';

const config = require('config'),
    express = require('express'),
    fs = require('fs'),
    pug = require('pug'),
    request = require('request'),
    winston = require('winston');

const app = express();

let host = config.get("env.HOST"),
    port = config.get("env.PORT");

winston.level = config.get("env.LOG_LEVEL");

// set the home directory of the static javascript files for pug to use
app.use(express.static(__dirname + '/views/scripts'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    // Compile the templates to js functions and create a template.js file that the client can use
    let productFunctionName = 'productTemplate';
    let product = pug.compileFileClient(__dirname + '/assets/pug/product_div_template.pug',
        {name: productFunctionName});

    // Do not want to include the runtime functions again so set the inlineRuntimeFunctions flag to false
    // When the inlineRuntimeFunctions is false the compiler uses 'pug.' instead of 'pug_'; so replacement is needed
    let mainFunctionName = 'mainProductTemplate';
    let mainProduct = pug.compileFileClient(__dirname + '/assets/pug/mainProduct_div_template.pug',
        {name: mainFunctionName, inlineRuntimeFunctions: false}).replace(/pug\./g, 'pug_');


    fs.writeFileSync(__dirname + '/views/scripts/compiled/templates.js', product + mainProduct);

    res.render('index', {
        mainFunctionName: mainFunctionName,
        productFunctionName: productFunctionName
    });
});

// Retrieve the product information from the provided API
app.get('/getProducts', (req,res) => {

    // Best Buy Product API Example
    // let productAPI = config.get('BestBuy');
    // let url = productAPI.url + productAPI.api_key;

    // Best Buy Example, JSON response saved locally
    let url = config.get('BestBuyJson.url');

    // Do not use request for local sample json examples
    if(url.includes('http')) {
        //sets the search term to use for the API request.
        let searchTerm = "microsoft";
        url = url.replace(/searchTerm/,searchTerm);

        request(url, (error, response, body) => {
            if (error) winston.log('error', `The request to ${url} failed with: ${error}`);
            if (!error && response.statusCode == 200) {
                res.send(JSON.parse(body).products);
            }
        });
    }
    else {
        let jsonSample = require(url);
        res.send(jsonSample.products);
    }

});

app.listen(port, host, () => {
    winston.log('info', `Your shopping catalog is available at ${host}:${port}`);
});