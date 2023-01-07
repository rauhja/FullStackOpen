describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Bruce Wayne',
      username: 'batman',
      password: 'gotham'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('login')
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login', function() {
    it('succeds with correct credentials', function() {
      cy.get('#username').type('batman')
      cy.get('#password').type('gotham')
      cy.contains('login').click()
      cy.contains('Bruce Wayne logged in')
    })
    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('batman')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      
      cy.get('.error')
      .should('contain', 'wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
  
      cy.get('html').should('not.contain', 'Bruce Wayne logged in')
    })
    describe('when logged in', function() {
      beforeEach(function() {
        cy.login({username: 'batman', password: 'gotham'})
      })
      it('A blog can be created', function() {
        cy.createBlog({
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        })
        cy.contains('Go To Statement Considered Harmful')
      })
      it('A blog can be liked', function() {
        cy.createBlog({
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        })
        cy.contains('Go To Statement Considered Harmful')
        cy.contains('view').click()
        cy.contains('Likes: 0')
        cy.get('#like-button').click()
        cy.contains('Likes: 1')
      })
      it('Creator of blog can delete it', function() {
        cy.createBlog({
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',})
          cy.contains('Go To Statement Considered Harmful')
          cy.contains('view').click()
          cy.get('#remove-button').click()
          cy.get('html').should('not.contain', 'Go To Statement Considered Harmful')
      })
      it('multiple blogs are sorted by likes', function() {
        cy.createBlog({
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        })
        cy.createBlog({
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
        })
        cy.createBlog({
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        })
        cy.contains('Go To Statement Considered Harmful').parent().as('blog1')
        cy.contains('React patterns').parent().as('blog2')
        cy.contains('Canonical string reduction').parent().as('blog3')

        cy.get('@blog3').contains("view").click()
        cy.get("#like-button").click()
          .wait(500)
          .click()
          .wait(500)
          .click()
          .wait(500)
        cy.get('@blog3').contains("hide").click()
        cy.get('@blog2').contains("view").click()
        cy.get("#like-button").click()
          .wait(500)
          .click()
          .wait(500)
        cy.get('.blog').eq(0).should('contain', 'Canonical string reduction')
        cy.get('.blog').eq(1).should('contain', 'React patterns')
        cy.get('.blog').eq(2).should('contain', 'Go To Statement Considered Harmful')
      })
    })
  })
})