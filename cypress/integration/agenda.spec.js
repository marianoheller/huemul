
describe('Agenda', function() {
  const URL = '/agenda'

  beforeEach(() => {
    cy.visit(URL)
  })

  context('When page is initially opened', function () {
    it('should be a tabs container, 2 tabs & first tab should be selected', () => {
      cy.get('[data-cy-type=tab]').should('have.length', 2)
      cy.get('[data-cy-type=tab][data-cy-index=0]')
        .should('have.attr', 'aria-selected');
    })
  
    it('should see a title, search bar & search button', () => {
      cy.get('[data-cy-type=title]').should('not.be.empty');
      cy.get('[data-cy-type=filterInput] > input').should('have.attr', 'type', 'text');
      cy.get('[data-cy-type=filterButton]').should('not.be.empty');
    })
  })

  context('Contactos page', function () {
    beforeEach(() => {
      cy.get('[data-cy-type=tab][data-cy-index=0]').click();
    })

    it('should see a title, search bar & search button', () => {
      cy.get('[data-cy-type=title]').should('not.be.empty');
      cy.get('[data-cy-type=filterInput] > input').should('have.attr', 'type', 'text');
      cy.get('[data-cy-type=filterButton]').should('not.be.empty');
    })

    it('should load contacts correctly', () => {
      cy.server();
      cy.fixture('contactos').as('contactos');
      cy.route({
        method: 'GET',
        url: '/api/contactos',
        status: 200,
        response: '@contactos',
        delay: 100,
      }).as('getContactos');
      cy.visit(URL);
      cy.wait('@getContactos');
      cy.get('[data-cy-type=agendaLista]').should('exist');
      cy.get('[data-cy-type=agendaListaItem]').should('have.length.greaterThan', 0);
      cy.get('[data-cy-type=agendaListaItem]').each( $el => {
        cy.wrap($el).within( $item => {
          cy.get('[data-cy-type=deleteItemButton]').should('exist').and('have.length', 1);
          cy.get('[data-cy-type=editItemButton]').should('exist').and('have.length', 1);
          cy.get('[data-cy-type=fieldPropItem]').should('have.length', 2).each( $field => {
            cy.wrap($field).within( $field => {
              cy.get('[data-cy-type=fieldItemName]').should('have.length', 1);
              cy.get('[data-cy-type=fieldItemValue]').should('have.length', 1);
            });
          });
          cy.get('[data-cy-type=assocTable]').should('have.length', 1).within( $table => {
            cy.get('[data-cy-type=assocTableHeader]').should('have.length', 2);
          });
        });
      });
    })

    it('should show edit contact modal correctly', () => {
      cy.server();
      cy.fixture('contactos').as('contactos');
      cy.route({
        method: 'GET',
        url: '/api/contactos',
        status: 200,
        response: '@contactos',
        delay: 100,
      }).as('getContactos');
      cy.visit(URL);
      cy.wait('@getContactos');
      cy.get('[data-cy-type=editItemButton]').click();
    })
  
    it('should show edit delete modal correctly', () => {
      cy.server();
      cy.fixture('contactos').as('contactos');
      cy.route({
        method: 'GET',
        url: '/api/contactos',
        status: 200,
        response: '@contactos',
        delay: 100,
      }).as('getContactos');
      cy.visit(URL);
      cy.wait('@getContactos');
      cy.get('[data-cy-type=deleteItemButton]').click();
    })
  })

  context('Clientes page', function () {
    beforeEach(() => {
      cy.get('[data-cy-type=tab][data-cy-index=1]').click();
    })

    it('should see a title, search bar & search button', () => {
      cy.get('[data-cy-type=title]').should('not.be.empty');
      cy.get('[data-cy-type=filterInput] > input').should('have.attr', 'type', 'text');
      cy.get('[data-cy-type=filterButton]').should('not.be.empty');
    })
  })
})
