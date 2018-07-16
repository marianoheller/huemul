
describe('Agenda', function() {
  const URL = '/agenda'

  beforeEach(() => {
    cy.visit(URL)
  })

  context('When page is initially opened', function () {
    it('should be a tabs container, 2 tabs & first tab should be selected', () => {
      cy.get('[data-type=tab]').should('have.length', 2)
      cy.get('[data-type=tab][data-index=0]')
        .should('have.attr', 'aria-selected');
    })
  
    it('should see a title, search bar & search button', () => {
      cy.get('[data-type=title]').should('not.be.empty');
      cy.get('[data-type=filterInput] > input').should('have.attr', 'type', 'text');
      cy.get('[data-type=filterButton]').should('not.be.empty');
    })
  })

  context('Contactos page', function () {
    
  })

  context('Clientes page', function () {
    
  })
})
