const { searchPage } = require("../support/pageObjects/searchPage")

describe('Tests for user invalid and valid search requests', {viewportHeight: 720,viewportWidth: 1240,}, () =>{
    beforeEach(() => 
      cy.visit('/ua/'))
    before(() => {
      cy.fixture('searchQueries').then(function (testData) {
          this.searchQueries = testData;
      });
  });     

    it('Valid user search tests verification', function () {
      this.searchQueries.forEach((searchQuery) => {
      searchPage.validSearchQuery(searchQuery.value);    
    })    
  })

  it('Invalid user search tests verification', () => {
    searchPage.invalidSearch();
  })
  
})