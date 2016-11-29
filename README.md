# bdd-cucumber-example
A BDD example using cucumber, selenium-webdriver, Pug, and pure vanilla JS for the front end (with pre-compiled pug).

The application is a Catalog of sorts that pulls from the Best Buy API and shows different available products.

*Built using: node v4.6.2 (npm v2.15.11) on a Mac, but should work on all platforms with different versions of node

### Behavior Driven Development (BDD)
BDD combines test driven development (TDD) with a human readable aspect. It provides software development and management teams with shared tools and a shared process to collaborate on software development.

For example, so say a manager or customer says:
"I need a shopping catalog. It has to have a main product at the top with a large image and more info about the product. It also needs to show all of the products that can be selected below it. Those selections need to have a smaller image and a way to select them to show at the top. Also one last thing, I need an add to cart button that pops up an alert with the price of the selected product"
    
The [store.feature file](https://github.com/franklsm1/bdd-cucumber-example/blob/master/features/store.feature) shows how the description is turned into a human readable file that is actually part of the code. It is used in [browser_steps.js](https://github.com/franklsm1/bdd-cucumber-example/blob/master/features/step_definitions/browser_steps.js) to run the test cases.

### Installing and Using
Install everything needed to run the app and all the test scripts 

- 'npm install'

There are some dev dependencies that do not need to be loaded to run the main app ‘npm start’.
	
- You can be skip installing these by using ‘npm install --production’
- This will break the running of the ‘watch’ and ‘test’ script

As a default the application uses a local JSON response that is saved in `./assets/json/bestBuyResponse.json` this can be changed to using the actual API by doing the following: 

- Uncomment [lines 47 and 48 in server.js](https://github.com/franklsm1/bdd-cucumber-example/blob/master/server.js#L47) 
- Comment out line 51 in server.js
- Get a free API token from [Best Buy](https://developer.bestbuy.com/documentation/getting-started)
- Insert that token into the [config file](https://github.com/franklsm1/bdd-cucumber-example/blob/master/config/default.json#L9)

### Run scripts
Watch script:
 
- Initially runs the app and restarts it whenever any new changes are made to js,css, or pug files
- ‘npm run watch’

Test scripts:

- Runs the linter and cucumberJS tests located under the `./features` dir
- Note: The app has to be currently running before running any cucumber tests
- 'npm test' for chrome testing or 'npm run firefox' for firefox testing
- If you want to see some cucumber tests fail comment out [this line](https://github.com/franklsm1/bdd-cucumber-example/blob/master/views/scripts/updatePage.js#L36)
  
### Possible problems that may be hit
  - If wanting to run the cucumberJS tests inside an IDE you may need to download the chrome driver, unzip it, and ensure it is on your path
  - [Driver Download Link](https://chromedriver.storage.googleapis.com/index.html?path=2.25/)
  - To test with firefox you may need to change the name of the application in the Applications directory
  - For example ‘IBM firefox’ -> ‘firefox’, this allows the selenium web driver to pick it up
  
### Random Notes that gave me greys while creating this project
  - Requests encodes ‘&’ into its html key which ruins any URL passed from the server to the client
  - When compiling Pug templates with `inlineRuntimeFunctions` set to false the compiler uses 'pug.' instead of 'pug_', so replacement is needed. See the Pug pre-compilation [example in server.js] (https://github.com/franklsm1/bdd-cucumber-example/blob/master/server.js#L31)
  - In cucumber you cannot use a callback function with promises (some weird magic)
  - For cucumber step names you can not use the `() =>` ES6 syntax, things just blow up
  - Returned promises need to have the inner then blocks return something as well (otherwise it is run out of order)
  - This is a sweet way to pass a dynamic variable to an onClick function when creating dynamic buttons ->
    `button.onclick = ((variableRef => () => functionXYZ(variableRef)))(variable)`

