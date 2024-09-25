
export class AccountPage {

    profile_enter = '[href*="private/enter"]'
    email_field = '[name="username"]'
    password_field = '[name="password"]'
    login_button = '[name="Login"]'
    forgot_password_button = '[href*="private/recovery-password"]'
    drop_down_menu = '[name="menu-select"]'
    logoutButton = '[href*="service=logout"]'
    contactTel = '[href*="tel:+380"]'
    schedulerData = '[class*="block2"]'
    oldPrices = '.price-old'
    newPrices = '.shk-price'
    newcomingsItems = '[href*="novinki-zhenskoj-obuvi"]'
    filtrationSelection = '#sortSelect'
    filtrationSectionParent = 'div > #sortSelect-styler'
    filteringOptions = '#sortSelect-styler ul > li'

    loginEmail = 'serg.lishko1988@gmail.com'
    loginPassword = '3107RS777'
    loginEmailInvalid = 'serg.lishko1988@gmail.coms'
    loginPasswordInvalid = '3107RS777s'
    accountEnterMessage = 'Введіть дані для входу'
    credentailsButtonTest = 'Увійти'
    welocomeMessage = 'Вітаю'
    errorMessage = 'Ім’я користувача або пароль введені невірно. Перевірте, будь-ласка введені данні та спробуйте увійти знову.'
    thanksLogoutMessage = 'Дякуємо вам за візит, приходьте ще!'
    logoutOkMessage = 'Вдалий вихід'
    contactTeleValue = '+380'
    schedulerText = 'Пн - Нд:'
    oldPriceCurrency = 'грн.'
    selectedFilterConditionOne = 'Спочатку нові'
    selectedFilterConditionTwo = 'Від дорогих до дешевих'
    selectedFilterConditionThree = 'Від дешевих до дорогих'
    

    loginToAccount(){
        cy.get(this.profile_enter).should('be.visible').click();
        cy.contains(this.accountEnterMessage);
        cy.get(this.email_field).should('be.visible').type(this.loginEmail);
        cy.get(this.password_field).should('be.visible').type(this.loginPassword);
        cy.get(this.login_button).contains(this.credentailsButtonTest).should('be.visible').click();
        cy.contains(this.welocomeMessage);
    }

    logoutFromAccount(){
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.get(this.profile_enter).should('be.visible').click();
        cy.contains(this.accountEnterMessage);
        cy.get(this.email_field).should('be.visible').type(this.loginEmail);
        cy.get(this.password_field).should('be.visible').type(this.loginPassword);
        cy.get(this.login_button).should('be.visible').click();
        cy.contains(this.welocomeMessage);
        cy.get(this.logoutButton).should('be.visible').click();
        cy.contains(this.logoutOkMessage);
        
    } 
    
    vefiryTelValueOnMainPage(){
        cy.get(this.contactTel).then( telValue => {
            expect(telValue.text()).to.contain(this.contactTeleValue)
        })
    }

    vefirySckedulerValuesOnMainPage(){
        cy.get(this.schedulerData).find('div').then( shedulerValue => {
            expect(shedulerValue.text()).to.contain(this.schedulerText);
        })
    }

    verfiyOldPriceValues(){
        cy.get(this.newcomingsItems).should('be.visible').click({force: true})
        cy.get(this.oldPrices).each((item) => {            
            cy.wrap(item).should('contain.text', this.oldPriceCurrency);    
        })
        cy.get(this.oldPrices).then((oldPricesValues) => {
            expect(oldPricesValues.length).to.be.greaterThan(10);
        });
    }

    verfiyNewPriceValues(){
        //cy.get(this.newcomingsItems).should('be.visible').click({force: true})
        cy.get(this.newPrices).each((item) => {
            cy.wrap(item).find('small').should('contain.text', this.oldPriceCurrency);
        })
    }

    verfiyOldAndNewPriceValues(){
        let oldPricesValues = [];
        let newPricesValues = [];
        //cy.get(this.newcomingsItems).should('be.visible').click({force: true})

        cy.get(this.oldPrices).each((item) => {
            cy.wrap(item).invoke('text').then((text) => {
                oldPricesValues.push(parseFloat(text.replace(/[^0-9.]/g, '')));
            });
        });

        cy.get(this.newPrices).each((item) => {
            cy.wrap(item).invoke('text').then((text) => {
                newPricesValues.push(parseFloat(text.replace(/[^0-9.]/g, '')));
            });
        });

        cy.then(() => {
            for (let i = 0; i < oldPricesValues.length; i++) {
                expect(oldPricesValues[i]).to.be.greaterThan(newPricesValues[i]);
            }
        });
    }

    sortingSelection(){
        cy.get(this.newcomingsItems).should('be.visible').click({force: true});
        cy.get(this.filtrationSectionParent).should('be.visible').and('not.have.class', 'dropdown opened');
        cy.get(this.filtrationSectionParent).click().should('have.class', 'dropdown opened');
        cy.get(this.filteringOptions).then((filteringValues) => {
            expect(filteringValues.length).to.be.greaterThan(2);
        });
    }

    selectRandomSortingOption(){
        let randIndex;
        cy.get(this.filteringOptions).then((filteringValues) => {
            let qnt = filteringValues.length;
            randIndex = Math.floor(Math.random() * qnt);  
            cy.get(this.filteringOptions).eq(randIndex).click().then(() => {    
                cy.get(this.filteringOptions).eq(randIndex).then((element) => {
                    const selectedText = element.text().trim();
                    let firstPrice;
                    let lastPrice;
                    cy.get(this.newPrices).first().then((firstPriceElement) => {
                        firstPrice = parseInt(firstPriceElement.text().trim());
                        cy.get(this.newPrices).last().then((lastPriceElement) => {
                            lastPrice = parseInt(lastPriceElement.text().trim());
                            if (selectedText === this.selectedFilterConditionTwo) {
                                expect(firstPrice).to.be.greaterThan(lastPrice);
                                        } else if (selectedText === this.selectedFilterConditionTree){
                                            expect(lastPrice).to.be.greaterThan(firstPrice);
                                        }
                                    });
                            });
                });
            });
        });
        
    } 

}  

export const accountPage = new AccountPage()