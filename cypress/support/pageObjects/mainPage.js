export class MainPage {

    profile_enter = '[href*="private/enter"]'
    logoImageLink = '[src*="mario/images/logo"]'
    language_drop_down = '#switch-lang2'
    main_menu_drop_down = '[class*="navbar"]'
    submit_search = '[class*="fa fa-search"]'
    product_links = '[href*="ua/catalog"]'
    addToBucketButton = '[class*="buy_btn"]'
    addToWishlistButton = 'label > .wish-text'
    add_to_bucket_pop_up = '#shk_prodHelper'
    addToBucketConfirmButton = '#shk_confirmButton'
    sizeSelection = '[for*="size__"]'
    bucket_button = '.shop-cart-head > strong'
    telNumberToDial = '[href*="tel:+380"]' 
    orderCallButton = '[href*="zakazat-zvonok"]'
    profile_enter = '[href*="private/enter"]'
    oldPrice = '[class="price-old"]'
    newestPrice = '[class*="shk-price"]'
    shopCard = '#shopCart>:first-child'
    motoText = '.logo > small'
    addToCardButton = '.buy_btn_rework'
    newcomingsCategory = 'div > div > [href*="novinki-magazina/novinki-zhenskoj"]'
    openFilterButton = 'div > #showFilter'
    filterBlock = '.filter-body > div'
    cancelFilterButton = 'form > .filter-reset'
    sliderContur = '.ui-slider-range'
    sliderButtonRight = '#range_price > a:nth-child(3)'
    sliderButtonLeft = '#range_price > a:nth-child(2)'
    shoeTypeFilterOptions = 'div.filter_block_type-view-shoes'
    seasonTypeFilterOptions = 'div.filters-block-season'
    sizeTypeFilterOptions = 'div.filters-block-size'
    styleTypeFilterOptions = 'div.filters-block-style'
    orderCallAlertCloseButton = '.fancybox-close'


    
    logoText = 'Логотип Mario Muzi'
    mainLinksTest = 'Взуття Новинки Знижки'
    newcomingTitile = 'Новинки жіночого взуття'
    alertOrderCallText = 'Залиште свій номер і ми Вам передзвонимо'
    bucketAddButtonText = 'Додати у кошик'
    addToFavText = 'Додати в список бажань'
    popUpBucketText = 'Виберіть розмір'
    popUpCinfirmBucketText = 'Додати'
    bucketText = 'Ваша корзина'
    telNumber = '+380'
    orderCallText = 'Замовити дзвінок'
    orderSubmitName = 'Оформлення замовлення'
    motoTextValue = 'обираючи нас - ви обираєте краще!'
    removeFromFavText = 'Прибрати зі списку бажань'
    filterOpenText = ' Фильтры'
    filterCloseText = 'Вiдмiнити всі фільтри'
    sliderDefaultRangeValue = 'left: 0%; width: 100%;'
    leftSliderDefaultValue = 'left: 0%;'
    rightSliderDefaultValue = 'left: 100%;'

    checkForElementsVisability(){
        cy.get(this.bucket_button).should('be.visible').should('contain.text', this.bucketText);
        cy.get(this.motoText).should('be.visible').should('have.text', this.motoTextValue);
        cy.get(this.addToCardButton).each((item) => {
            cy.wrap(item).invoke('text').then((text) => {
                expect(text.trim()).to.equal(this.bucketAddButtonText);
            });
        });
    }

    checkAlertForPhoneCall(){        
            cy.get(this.orderCallButton).should('be.visible').and('contain', this.orderCallText).click();        
            cy.on('window:alert', (alertText) => {
              expect(alertText).to.equal(this.alertOrderCallText);
              cy.get(this.orderCallAlertCloseButton).should('be.visible').click();
            });
        
    }

    addToBucketTest(){
        cy.get(this.addToBucketButton).first().should('be.visible').click();
        cy.get(this.sizeSelection).first().scrollIntoView().should('be.visible').click();
        cy.get(this.addToBucketConfirmButton).should('be.visible').click();
        cy.get(this.shopCard).should('be.visible').click();

    }

    addToFavorite(){
        cy.get(this.addToWishlistButton).each((item) => {
            cy.wrap(item).invoke('text').then((text) => {
                expect(text.trim()).to.equal(this.addToFavText);
            });
        });
        cy.get(this.addToWishlistButton).first().scrollIntoView().should('be.visible').click();
        cy.get(this.addToWishlistButton).first().scrollIntoView().should('have.text', this.removeFromFavText);
        cy.get(this.addToWishlistButton).first().scrollIntoView().should('be.visible').click();
        cy.get(this.addToWishlistButton).first().scrollIntoView().should('have.text', this.addToFavText);
    }

    openCloseFilterPanelVerifyPosition(){
        cy.get(this.newcomingsCategory).should('be.visible').and('contain.text', this.newcomingTitile).click();
        cy.get(this.filterBlock).should('be.visible').should('have.css', 'left', '0px');
        cy.get(this.cancelFilterButton).should('be.visible').and('contain.text', this.filterCloseText).and('have.css', 'font-size', '13px');
    }

    openFilterPanelVerifySliderFiltering(sliderRangeValue, leftSliderValue, rightSliderValue){
        cy.get(this.sliderContur).should('be.visible').invoke('attr', 'style', sliderRangeValue)
        .should('have.attr', 'style', sliderRangeValue);
        cy.get(this.sliderButtonLeft).should('be.visible').invoke('attr', 'style', leftSliderValue).should('have.attr', 'style', leftSliderValue);
        cy.get(this.sliderButtonRight).should('be.visible').invoke('attr', 'style', rightSliderValue).should('have.attr', 'style', rightSliderValue);
    }

    closeAllFilters(){
        cy.get(this.cancelFilterButton).should('be.visible').click();
        cy.get(this.sliderContur).should('be.visible').and('have.attr', 'style', this.sliderDefaultRangeValue);
        cy.get(this.sliderButtonLeft).should('be.visible').and('have.attr', 'style', this.leftSliderDefaultValue);
        cy.get(this.sliderButtonRight).should('be.visible').and('have.attr', 'style', this.rightSliderDefaultValue);
    }

    verfiyFiltersOptionsAreOpened(){
        cy.get(this.shoeTypeFilterOptions).should('be.visible').and('have.attr', 'class').and('contain', 'active');
        cy.get(this.seasonTypeFilterOptions).should('be.visible').and('have.attr', 'class').and('contain', 'active');
        cy.get(this.sizeTypeFilterOptions).should('be.visible').and('have.attr', 'class').and('contain', 'active');
        cy.get(this.styleTypeFilterOptions).should('be.visible').and('have.attr', 'class').and('contain', 'active');
    }

}

export const mainPage = new MainPage()