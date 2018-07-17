
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
      const text = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
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
      cy.get('[data-cy-type=editItemButton]').first().click();
      cy.get('[data-cy-type=editFormTextField]').should('have.length', 2).each( $field => {
        cy.wrap($field).within( () => {
          cy.get('input').clear().should('have.value', '');
          cy.get('input').type(text).should('have.value', text);
        })
      });
      cy.get('[data-cy-type=editFormCancelButton]').should('exist');
      cy.get('[data-cy-type=editFormSubmitButton]').should('exist');
    })

    it('should report error show when edit request fails', () => {
      const text = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
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
      cy.get('[data-cy-type=editItemButton]').first().click();
      cy.get('[data-cy-type=editFormTextField]').first().within( () => {
        cy.get('input').clear().type(text);
      });
      cy.route({
        method: 'PUT',
        url: '/api/contactos',
        status: 500,
        response: '@contactos',
        delay: 100,
      }).as('putContactosFail');
      cy.get('[data-cy-type=editFormSubmitButton]').click();
      cy.wait('@putContactosFail');
      cy.get('[data-cy-type=editFormErrorMessage]').should('exist');
    })

    it('should close modal and change element when edit request succeds', () => {
      const text = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
      cy.server();
      cy.fixture('contactos').as('contactos');
      cy.fixture('singleContacto').as('singleContacto');
      cy.route({
        method: 'GET',
        url: '/api/contactos',
        status: 200,
        response: '@contactos',
        delay: 100,
      }).as('getContactos');
      cy.visit(URL);
      cy.wait('@getContactos');
      cy.get('[data-cy-type=editItemButton]').first().click();
      cy.get('[data-cy-type=editFormTextField]').first().within( () => {
        cy.get('input').clear().type(text);
      });
      cy.route({
        method: 'PUT',
        url: '/api/contactos',
        status: 200,
        response: '@singleContacto',
        delay: 100,
      }).as('putContactosSuccess');
      cy.get('[data-cy-type=editFormSubmitButton]').click();
      cy.wait('@putContactosSuccess');
      cy.get('[data-cy-type=editFormCancelButton]').should('not.exist');
      cy.get('[data-cy-type=editFormSubmitButton]').should('not.exist');
      cy.get('[data-cy-type=editFormErrorMessage]').should('not.exist');
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
      cy.get('[data-cy-type=deleteItemButton]').first().click();
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
