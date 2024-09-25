const { mainPage } = require("../support/pageObjects/mainPage")
const { accountPage } = require("../support/pageObjects/accountPage")


describe('Tests for user login/logout and add item to the bucket', () =>{
  beforeEach(() => 
    cy.visit('/ua/'))

    it('User login verification positive', () => {
      accountPage.loginToAccount()
    })

    it('User logout verification', () => {
      accountPage.logoutFromAccount()
    })

    it('Contact info verification', ()=> {
      accountPage.vefiryTelValueOnMainPage()
      accountPage.vefirySckedulerValuesOnMainPage()
    })

    it('Prices values and currency test verification', ()=> {
      accountPage.verfiyOldPriceValues()
      accountPage.verfiyNewPriceValues()
      accountPage.verfiyOldAndNewPriceValues()
    })

    it('Sorting verification tests', ()=> {
      accountPage.sortingSelection()
      accountPage.selectRandomSortingOption()
    })
})