const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../src/app')
const api = supertest(app)

const Blog = require('../src/models/blog')
const User = require('../src/models/user')

describe('blog tests with initialized data', () => {
	beforeEach(async () => {
		await Blog.deleteMany({})
		console.log('cleared')
		await Blog.insertMany(helper.initialBlogs)
		console.log('done')
	})

	//4.8
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	//4.8
	test('all blogs are returned', async () => {
		const response = await api.get('/api/blogs')

		expect(response.body.length).toBe(helper.initialBlogs.length)
	})

	//4,8
	test('a specific blog is within the returned blogs', async () => {
		const response = await api.get('/api/blogs')

		const contents = response.body.map(r => r.title)
		expect(contents).toContain('6')
	})

	//4.9
	test('blogs are returned with id', async () => {
		const blogs = await helper.blogsInDb()

		blogs.forEach(b => expect(b.id).toBeDefined())
	})

	//4.10
	test('blogs can be added and must contain id', async () => {
		const newBlog = {
			title: "HADJASHDJHAS",
			author: "BBBBBBBBB",
			url: "http://www.niceme.me",
			likes: 1230
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

		const blog = blogsAtEnd.filter(b => b.title === "HADJASHDJHAS")[0]
		expect(blog.id).toBeDefined()
	})

	//4.11
	test('blog likes defaults to 0', async () => {
		const newBlog = {
			title: "HADJASHDJHAS",
			author: "BBBBBBBBB",
			url: "http://www.niceme.me"
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

		const blog = blogsAtEnd.filter(b => b.title === "HADJASHDJHAS")[0]
		expect(blog.likes).toBe(0)
	})

	test('blog without title is not added', async () => {
		const newBlog = {
			author: "BBBBBBBBB",
			url: "http://www.niceme.me",
			likes: 1231
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
	})

	test('blog without url is not added', async () => {
		const newBlog = {
			author: "BBBBBBBBB",
			title: "nice meme",
			likes: 3122
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
	})


	test('delete blog by id', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const id = blogsAtStart[0].id

		await api
			.delete('/api/blogs/' + id)
			.send()
			.expect(204)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)
	})

	test('modify blog by id', async () => {
		const newBlog = {
			author: "BBBBBBBBB",
			title: "AODAOISD",
			url: "asdasdas",
			likes: 3122
		}

		const blogsAtStart = await helper.blogsInDb()
		const id = blogsAtStart[0].id

		await api
			.put('/api/blogs/' + id)
			.send(newBlog)
			.expect(200)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd.length).toBe(blogsAtStart.length)

		const blog = blogsAtEnd.filter(b => b.id === id)[0]
		expect(blog.author).toBe(newBlog.author)
		expect(blog.title).toBe(newBlog.title)
		expect(blog.url).toBe(newBlog.url)
		expect(blog.likes).toBe(newBlog.likes)
	})
})

describe('user tests with initialized data', () => {
	beforeEach(async () => {
		await User.deleteMany({})
		console.log('cleared')
		await User.insertMany(helper.initialUsers)
		console.log('done')
	})

	//4.16
	test('create user', async () => {
		const newUser = {
			name: "Test",
			login: "somelogin",
			password: "1234"
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(200)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd.length).toBe(helper.initialUsers.length + 1)
	})

	test('unable to create user with duplicate user name', async () => {
		const newUser = {
			name: "Test",
			login: "waff",
			password: "1234"
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(400)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd.length).toBe(helper.initialUsers.length)
	})

	test('unable to create user with no or short password', async () => {
		const newUser1 = {
			name: "Test",
			login: "heyyy",
			password: "01"
		}

		await api
			.post('/api/users')
			.send(newUser1)
			.expect(400)

		const newUser2 = {
			name: "Test",
			login: "heyyy"
		}

		await api
			.post('/api/users')
			.send(newUser2)
			.expect(400)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd.length).toBe(helper.initialUsers.length)
	})

	test('unable to create user with no or short user name', async () => {
		const newUser1 = {
			name: "Test",
			login: "ok",
			password: "1234"
		}

		await api
			.post('/api/users')
			.send(newUser1)
			.expect(400)

		const newUser2 = {
			name: "Test",
			password: "1234"
		}

		await api
			.post('/api/users')
			.send(newUser2)
			.expect(400)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd.length).toBe(helper.initialUsers.length)
	})
})

afterAll(() => {
	mongoose.connection.close()
}) 