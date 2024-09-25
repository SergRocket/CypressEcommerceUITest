
export class SearchPage {

    input_field = '#search-input'
    submit_search = '[class*="fa fa-search"]'
    search_results = '[class="search_result"]'
    newcomings_button = '[href*="catalog/novinki-magazina"]'
    searchWord = '.search_word'
    searchResultBlock = '.catalog-block > [action*="rezultat-poiska"] > .img-block'

    invalidSearchQuery = 'xyz'
    

    invalidSearch(){
        cy.get(this.input_field).should('be.visible').type(this.invalidSearchQuery).type('{enter}')
        cy.get(this.search_results).should('be.visible').then( resultText => {
            expect(resultText.text()).to.contain(this.invalidSearchQuery)
            cy.wrap(resultText).find(this.searchWord).should('exist');
        })        
    }

    validSearchQuery(searchQuery){          
            cy.get(this.input_field).should('be.visible').type(searchQuery).type('{enter}'); 
            cy.get(this.searchResultBlock).find('a').should('have.attr', 'href').and('contain', searchQuery);
            let hrefValues = [];
            cy.get(this.searchResultBlock).find('a').each((aComponent) => {
                cy.wrap(aComponent).should('have.attr', 'href').then((href) => {
                    hrefValues.push(href);
                });
              }).then(() => {
                const uniqueHrefsValues = new Set(hrefValues);
                expect(hrefValues.length).to.equal(uniqueHrefsValues.size);
              });            
    }


}

export const searchPage = new SearchPage()