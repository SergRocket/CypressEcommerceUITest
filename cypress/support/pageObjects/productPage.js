export class ProductPage {

 
   productInfo = '.product-info > div > h1'
   actualPrice = '.shk-price'
   oldPrice = '.price-old'
   addToCardButton = '.buy_btn_rework'
   quickBuyOption = '.btn-green'
   productFromSearchResults = '.img-block [href*="${searchQuery}"]'


   expectedTitle = 'Жіночі шкіряні босоніжки на підборах ${searchQuery}'
   queryValue = '29929'
   expectedPriceColors = 'rgb(213, 36, 12)'
   expectedAddToCardButtonColors = 'rgb(206, 47, 26)'
   expecyedQuickBuyOptionColors = 'linear-gradient(rgb(72, 150, 125) 0px, rgb(42, 121, 93) 100%)'


   getProductFromSearchResults(searchQuery) {
      return `.img-block [href*="${searchQuery}"]`;
   }

   getProductTitle (searchQuery) {
      return `Жіночі шкіряні босоніжки на пiдборах ${searchQuery}`
   }


   openProductPage(searchQuery){
      cy.get(this.getProductFromSearchResults(searchQuery)).should('be.visible').click();      
   }

   verifyElementsAreShownCorrectly(searchQuery){
      cy.get(this.productInfo).should('be.visible').and('contain.text', this.getProductTitle(searchQuery));
      cy.get(this.actualPrice).should('be.visible').and('have.css','color', this.expectedPriceColors);
      cy.get(this.addToCardButton).should('be.visible').and('have.css','background-color', this.expectedAddToCardButtonColors);
      cy.get(this.quickBuyOption).should('be.visible').and('have.css','background-image', this.expecyedQuickBuyOptionColors);
   }

   verifyPricePresentCorrectly(){
      let oldPriceValue;
      let actualPriceValue;
      
      cy.get(this.oldPrice).invoke('text').then((text) => {
      oldPriceValue = parseFloat(text.replace(/[^0-9.]/g, ''));
      });     

      cy.get(this.actualPrice).first().invoke('text').then((text) => {
      actualPriceValue = parseFloat(text.replace(/[^0-9.]/g, ''));
          expect(oldPriceValue).to.be.greaterThan(actualPriceValue);
      });
   }

   verifyProductIdSameInTitleAndUrl(searchQuery){
      cy.url().then((url) => {
         expect(url).to.contain(searchQuery);
     });
   }

}

export const productPage = new ProductPage()