describe('My First Test', function() {
  it('Does not do much!', function() {
    expect(true).to.equal(true)
  })
})

describe('Homepage', function() {
  const URL = '/'

  beforeEach(() => {
    cy.visit(URL)
  })


  context('When page is initially opened', function () {
    it('provides a button to login page', () => {
      cy.get('#ingresar-nav-button')
        .should('have', 'tabindex', '0')
        .click();
      cy.url().should('eq',`${Cypress.config('baseUrl')}/login`)
    })
  
    it('provides the name of the app', () => {
      cy.get('#home-nav-link')
        .should('have', 'href', '/')
        .click();
        cy.wait(50);
      cy.url().should('eq', `${Cypress.config('baseUrl')}/`)
    })
  
    it('provides the version of the app', () => {
      cy.server();
      cy.route({
        method: 'GET',
        url: '/api/gitinfo',
        status: 200,
        response: {
          buildVersion: '1.2.34',
        },
        delay: 100,
      }).as('gitinfo');
      cy.wait('@login');
      cy.wait(50);
      cy.get('#buildVersion').should('not.be.empty');
    })
  })
})
