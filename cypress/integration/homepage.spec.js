describe('My First Test', function() {
  it('Does not do much!', function() {
    expect(true).to.equal(true)
  })
})

describe('Homepage', function() {
  const BASE_URL = '/'

  beforeEach(() => {
    cy.visit(BASE_URL)
  })


  context('When page is initially opened', function () {
    it('provides a button to login page', () => {
      cy.get('#ingresar-nav-button')
        .should('have', 'tabindex', '0')
        .click();
      cy.url().should('eq', `${BASE_URL}login`)
    })
  
    it('provides the name of the app', () => {
      cy.get('#home-nav-link')
        .should('have', 'href', '/')
        .click();
      cy.url().should('eq', BASE_URL)
    })
  
    it('provides the version of the app', () => {
      
    })
  })
})
