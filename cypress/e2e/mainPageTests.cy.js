const { mainPage } = require("../support/pageObjects/mainPage")

describe('Verify critical elements are present, add item to bucket, and add to fav', () => {
    beforeEach(() => {
        cy.visit('/ua/');
    });

    it('Verify critical elements are present, add item to bucket, and add to fav', () => {
        mainPage.checkForElementsVisability();
        mainPage.addToBucketTest();
        mainPage.addToFavorite();
    });
});

describe('Verify filter panel, visibility, and functionality of slider filter', () => {
    before(() => {
        cy.fixture('sliderParams').then(function (testData) {
            this.sliderParams = testData;
        });
    });

    beforeEach(() => {
        cy.visit('/ua/');  // You can keep this or adjust as needed for this test case
    });

    it('Verify filter panel, visibility and functionality of slider filter', function () {
        mainPage.openCloseFilterPanelVerifyPosition();
        this.sliderParams.forEach((sliderParam) => {
        mainPage.openFilterPanelVerifySliderFiltering(sliderParam.style, sliderParam.styleOnlyLeft, sliderParam.styleOnlyRight);
        });
        mainPage.closeAllFilters(); 
        mainPage.checkAlertForPhoneCall();
    });
});