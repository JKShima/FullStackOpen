describe('Blog app', function() {
  beforeEach(function(){
    cy.visit('http://localhost:5173')
  })
  it('Front page can be opened', function(){
    cy.contains('Log in to application')
  })

  it('The user can login', function(){
    cy.get('#username').type('john')
    cy.get('#password').type('johnsmith')
    cy.get('#login-button').click()

    cy.contains('john smith logged in')
  })
})