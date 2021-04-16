const user = {
    name: 'Dmitri Vlassenko',
    username: 'dvlassen',
    password: 'hannonen'
}

const newBlog = {
    title: 'Fun part',
    author: 'Matti Luukkainen',
    url: 'https://fullstackopen.com/en/'
}

describe('Blog app', function() {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('login')
    })

describe('Login',function() {
    it('succeeds with correct credentials', function() {
        cy.get('#username').type(`${user.username}`)
        cy.get('#password').type(`${user.password}`)
        cy.get('#login-button').click()

        cy.contains(`${user.name} logged in`)
    })

    it('fails with wrong credentials', function() {
        cy.get('#username').type(`${user.username}`)
        cy.get('#password').type(`wrong`)
        cy.get('#login-button').click()

        cy.contains(`wrong username or password`)
    })
})

describe('When logged in', function() {
    beforeEach(function () {
        cy.visit('http://localhost:3000')
        cy.get('#username').type(`${user.username}`)
        cy.get('#password').type(`${user.password}`)
        cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
        cy.contains('new blog').click()
        cy.get('#title').type(`${newBlog.title}`)
        cy.get('#author').type(`${newBlog.author}`)
        cy.get('#url').type(`${newBlog.url}`)
        cy.get('#create-button').click()
        cy.get('#blogsList').should('have.length', 1)
        cy.contains(`${newBlog.title}`)
        cy.contains(`${newBlog.author}`)
    })

    it('user can like a blog.', function () {
        cy.contains('new blog').click()
        cy.get('#title').type(`${newBlog.title}`)
        cy.get('#author').type(`${newBlog.author}`)
        cy.get('#url').type(`${newBlog.url}`)
        cy.get('#create-button').click()
        cy.wait(300)
        cy.get('button:last').click()
        cy.contains('Likes 0')
        cy.get('#like-button').click()
        cy.contains('Likes 1')
    })

    it('user who created a blog can delete it.', function () {
        cy.contains('new blog').click()
        cy.get('#title').type(`${newBlog.title}`)
        cy.get('#author').type(`${newBlog.author}`)
        cy.get('#url').type(`${newBlog.url}`)
        cy.get('#create-button').click()
        cy.wait(300)
        cy.contains(`${newBlog.title}`)
        cy.get('button:last').click()
        cy.get('#delete-button').click()
        cy.get('html').should('contain', `deleted`)
    })

    it('blogs are ordered according to likes with the blog with the most likes being first.', function () {
        const testBlog = {
            title: 'test',
            author: 'DV',
            url: 'placeholder'
        }

        cy.contains('new blog').click()
        cy.get('#title').type(`${testBlog.title}`)
        cy.get('#author').type(`${testBlog.author}`)
        cy.get('#url').type(`${testBlog.url}`)
        cy.get('#create-button').click()
        cy.wait(300)

        cy.contains('new blog').click()
        cy.get('#title').type(`${newBlog.title}`)
        cy.get('#author').type(`${newBlog.author}`)
        cy.get('#url').type(`${newBlog.url}`)
        cy.get('#create-button').click()
        cy.wait(300)

        cy.get('button:last').click()
        cy.get('#like-button').click()
        cy.wait(300)

        cy.get('#blogsList').first().contains('Fun part')
    })
})
})