describe('Blog app', function() {
  beforeEach(function(){
    //delete all blogs and users from test db
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    //create a new user in db
    const user = {
      name: 'john smith',
      username: 'john',
      password: 'johnsmith'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:5173')
  })
  it('Login form is shown', function(){
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function(){
    it('login succeeds with correct credentials', function() {
      cy.get('#username').type('john')
      cy.get('#password').type('johnsmith')
      cy.get('#login-button').click()
  
      cy.contains('Blogs')
      cy.contains('john smith logged in')
    })

    it('login fails with wrong credentials', function() {
      cy.get('#username').type('username')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'john smith logged in')
    })
  })
})