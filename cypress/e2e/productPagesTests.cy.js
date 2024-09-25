const { productPage } = require("../support/pageObjects/productPage")
const { searchPage } = require("../support/pageObjects/searchPage")

describe('Tests to verify product page and critical elements visibility and url value', () =>{
    beforeEach(() => 
        cy.visit('/ua/'))
      before(() => {
        cy.fixture('productCardSearchQuery').then(function (testData) {
            this.searchQueries = testData;
        });
    });

   it('Tests to verify product page and critical elements visibility and url value', function () {
        this.searchQueries.forEach((searchQuery) => {
        searchPage.validSearchQuery(searchQuery.value); 
        productPage.openProductPage(searchQuery.value); 
        productPage.verifyElementsAreShownCorrectly(searchQuery.value);
        productPage.verifyPricePresentCorrectly(); 
        productPage.verifyProductIdSameInTitleAndUrl(searchQuery.value);    
      })    
    })


})