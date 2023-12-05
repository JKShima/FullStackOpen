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

  describe('When logged in', function() {
    beforeEach(function(){
      cy.login({ username: 'john', password: 'johnsmith'})
    })

    it('A new blog can be created', function() {
      cy.contains('New Blog').click()
      cy.get('#title').type('Blog Cypress 1')
      cy.get('#author').type('Author Cypress 1')
      cy.get('#url').type('Url Cypress 1')
      cy.contains('Add').click()

      cy.contains('A new blog: Blog Cypress 1 by Author Cypress 1 added successfully')
    })

    describe('and a blog exists', function () {
      beforeEach(function() {
        cy.createBlog({ title: 'Blog Cypress 2', author: 'Author Cypress 2', url: 'Url Cypress 2'})
        cy.createBlog({ title: 'Blog Cypress 3', author: 'Author Cypress 3', url: 'Url Cypress 3'})
        cy.createBlog({ title: 'Blog Cypress 4', author: 'Author Cypress 4', url: 'Url Cypress 4'})
      })

      it('one of the blogs can be liked', function() {
        cy.contains('Blog Cypress 3').parent().find('button').eq(0).click()
        cy.contains('Blog Cypress 3').parent().find('button').eq(2).click()
      })

      it('user that created a blog can delete it/only he can se the button', function() {
        cy.contains('Blog Cypress 2').parent().find('button').eq(0).click()
        cy.contains('Blog Cypress 2').parent().find('button').eq(3).should('exist').click()
      })

      it('check blogs are ordered by likes', function() {
        cy.contains('Blog Cypress 3').parent().find('button').eq(0).click()
        cy.contains('Blog Cypress 3').parent().find('button').eq(2).click().wait(300)

        cy.contains('Blog Cypress 2').parent().find('button').eq(0).click()
        cy.contains('Blog Cypress 2').parent().find('button').eq(2).click().wait(200).click().wait(200).click()

        cy.get('.blog').eq(0).should('contain', 'Blog Cypress 2')
        cy.get('.blog').eq(1).should('contain', 'Blog Cypress 3')
        cy.get('.blog').eq(2).should('contain', 'Blog Cypress 4')
      })
    })
  })
})