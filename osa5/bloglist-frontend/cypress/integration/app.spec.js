describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3001/api/testing/reset')
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function() {
		cy.get('h2')
		  	.should('contain', 'Log in')
		cy.get('form')
			.should('contain', 'username')
		cy.get('form')
			.should('contain', 'password')
	})

	describe('Login',function() {
		it('succeeds with correct credentials', function() {
			cy.get('#username-input')
				.type('test')
		
			cy.get('#password-input')
				.type('aaaaaa')
		
			cy.contains('Submit')
				.click()  
			
			setTimeout(
				() => { cy.get('#blog-addition').should('have.class', 'togglableContent') },
				500
			)
		})
	
		it('fails with wrong credentials', function() {
			cy.get('#username-input')
				.type('test')
		
			cy.get('#password-input')
				.type('asdasd')
		
			cy.contains('Submit')
				.click()  

			setTimeout(
				() => { cy.get('.error').should('contain', 'Username or password wrong')},
				500
			)
		})
	})

	describe.only('When logged in', function() {
		beforeEach(function() {
			cy.get('#username-input')
				.type('test')
		
			cy.get('#password-input')
				.type('aaaaaa')
		
			cy.contains('Submit')
				.click()  
			
			setTimeout(() => {}, 500)
		})
	
		it('A blog can be created', function() {
			cy.get('#blog-title-input')
				.type('The title')
			cy.get('#blog-author-input')
				.type('The author')
			cy.get('#blog-url-input')
				.type('http://www.url.com')
			cy.contains('Submit')
				.click() 

			setTimeout(() => {}, 500)
			cy.contains('The title')
			cy.contains('The author')
		})
	})
})