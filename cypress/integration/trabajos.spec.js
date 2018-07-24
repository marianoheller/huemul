

describe('Trabajos', function() {
  const URL = '/trabajos'

  beforeEach(() => {
    cy.visit(URL)
  })

  context('When page is initially opened', function () {
    it('should be a tabs container, 3 tabs & middle tab should be selected', () => {
      cy.get('[data-cy-type=tab]').should('have.length', 3)
      cy.get('[data-cy-type=tab][data-cy-index=1]')
        .should('have.attr', 'aria-selected');
    })
  })

  
  /** *****************************************************************************************************
   * Trabajos
  */
  context('Buscar trabajos page', function () {
    beforeEach(() => {
      cy.get('[data-cy-type=tab][data-cy-index=1]').click();
    })

    it('should see a title, search bar & search button', () => {
      cy.get('[data-cy-type=title]').should('not.be.empty');
      cy.get('[data-cy-type=filterInput] > input').should('have.attr', 'type', 'text');
      cy.get('[data-cy-type=filterButton]').should('not.be.empty');
    })

    it('should load trabajos correctly', () => {
      const text = 'RANDOMSEARCHINPUT';
      cy.server();
      cy.fixture('trabajos').as('trabajos');
      cy.route({
        method: 'GET',
        url: `/api/trabajos?_query=numero.numero==${text}`,
        status: 200,
        response: '@trabajos',
        delay: 100,
      }).as('getTrabajos');
      cy.visit(URL);
      cy.get('[data-cy-type=tab][data-cy-index=1]').click();
      cy.get('[data-cy-type=trabajosContainer] [data-cy-type=filterInput] > input').type(text);
      cy.get('[data-cy-type=trabajosContainer] [data-cy-type=filterButton]').click();
      cy.wait('@getTrabajos');
      cy.get('[data-cy-type=trabajoSearchResults]').should('exist');
      cy.get('[data-cy-type=trabajoItem]').should('have.length.greaterThan', 0);
      cy.get('[data-cy-type=trabajoItem]').each( $el => {
        cy.wrap($el).within( $item => {
          cy.get('[data-cy-type=trabajoItemField]').should('have.length', 2);
        });
      });
      cy.get('[data-cy-type=trabajoItem]').each( $el => {
        cy.wrap($el).click().within( $item => {
          cy.get('[data-cy-type=trabajoItemField]').should('have.length', 5);
        });
      });
    })
  })

  
  /** *****************************************************************************************************
   * Nuevo trabajo
  */
  context('Nuevo trabajo page', function () {
    beforeEach(() => {
      cy.get('[data-cy-type=tab][data-cy-index=0]').click();
    })

    it('should see a title, search bar & search button', () => {
      cy.get('[data-cy-type=title]').should('not.be.empty');
      cy.get('[data-cy-type=filterInput] > input').should('have.attr', 'type', 'text');
      cy.get('[data-cy-type=filterButton]').should('not.be.empty');
    })

    it('all inputs should work', () => {
      const text = "lalalaa";
      cy.get(`[data-cy-type=nuevoTrabajoContainer] input[name="nombre"]`).first().type(text).should('have.value', text);
      cy.get(`[data-cy-type=nuevoTrabajoContainer] input[name="tipoTrabajo"]`).type(text).should('have.value', text);
      cy.get(`[data-cy-type=nuevoTrabajoContainer] input[name="fechaPedido"]`).type(text).should('have.value', text);
    })

    it('should report error on empty fields', () => {
      cy.get(`input[name="nombre"]`).clear();
      cy.get(`button[type="submit"]`).click();
    })

    it('should report error when the request fails', () => {
      cy.server();
      cy.fixture('singleTrabajo').as('singleTrabajo');
      cy.route({
        method: 'POST',
        url: '/api/trabajos',
        status: 500,
        response: '@singleTrabajo',
        delay: 100,
      }).as('postTrabajo');
      cy.visit(URL);
      cy.get('[data-cy-type=tab][data-cy-index=0]').click();
    })

    it('should load trabajos correctly', () => {
      cy.server();
      cy.fixture('singleTrabajo').as('singleTrabajo');
      cy.route({
        method: 'POST',
        url: '/api/trabajos',
        status: 200,
        response: '@singleTrabajo',
        delay: 100,
      }).as('postTrabajo');
      cy.visit(URL);
      cy.get('[data-cy-type=tab][data-cy-index=0]').click();
    })
  })
})
