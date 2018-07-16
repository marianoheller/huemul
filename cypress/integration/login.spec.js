

describe('Login', function() {
  const URL = '/login'

  beforeEach(() => {
    cy.visit(URL)
  })


  context('When page is initially opened', function () {
    it('button to login page is highlighted/selected', () => {
      cy.get(`a[href$="${URL}"]`)
        .should('have.class', 'active');
    })

    it ('types usuario correctly & focus on init', () => {
      const text = "lalalaa";
      cy.focused ().should ('have.attr', 'name', 'usuario');
      cy.get(`input[name="usuario"]`).should ('have.attr', 'type', 'text');
      cy.get(`input[name="usuario"]`).type(text).should ('have.value', text);
    });

    it('types password correctly', () => {
      const text = "lalalaa";
      cy.get(`input[name="clave"]`).should ('have.attr', 'type', 'password')
      cy.get(`input[name="clave"]`).type(text).should ('have.value', text);
    })

    it('has a submit button', () => {
      cy.get("#ingresarButton").should('have.attr', 'type', 'button');
    })
  })

  context('When input fields are empty', function () {
    const text = 'asdasd';
    it('reports error if user input is empty', () => {
      cy.server()
      cy.route('/api/login', []).as('login')

      cy.get(`input[name="usuario"]`).clear();
      cy.get(`input[name="clave"]`).type(text);
      cy.get("#ingresarButton").click();
      cy.get("#usuarioError").should('not.be.empty');

      cy.get(`input[name="usuario"]`).clear();
      cy.get(`input[name="clave"]`).clear();
      cy.get("#ingresarButton").click();
      cy.get("#usuarioError").should('not.be.empty');
    })

    it('reports error if password input is empty', () => {
      cy.get(`input[name="clave"]`).clear();
      cy.get(`input[name="usuario"]`).type(text);
      cy.get("#ingresarButton").click();
      cy.get("#claveError").should('not.be.empty');
      

      cy.get(`input[name="clave"]`).clear();
      cy.get(`input[name="usuario"]`).clear();
      cy.get("#ingresarButton").click();
      cy.get("#claveError").should('not.be.empty');
    })
  })

  context('Form is submitted', function () {
    const text = 'asdasd';
    it('reports error correctly', () => {
      cy.server();
      cy.route({
        method: 'POST',
        url: '/api/autenticacion',
        status: 500,
        response: { error: text },
        delay: 100,
      }).as('login')
      cy.get(`input[name="usuario"]`).type(text);
      cy.get(`input[name="clave"]`).type(text);
      cy.get("#ingresarButton").click();
  
      cy.wait('@login')
      cy.get("#requestError").should('not.be.empty');
    })

    it('redirects on success', () => {
      cy.server();
      cy.route({
        method: 'POST',
        url: '/api/autenticacion',
        status: 200,
        response: {
          userId: 1,
          token: 'aaaaaaa',
        },
        delay: 100,
      }).as('login')
      cy.get(`input[name="usuario"]`).type(text);
      cy.get(`input[name="clave"]`).type(text);
      cy.get("#ingresarButton").click();
  
      cy.wait('@login');
      cy.wait(100);
      cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
    })
  })
})
