const Blog = require('../src/models/blog')

const initialBlogs = [
	{
		title: "1",
		author: "W",
		url: "url1",
		likes: 10
	},
	{
		title: "2",
		author: "W",
		url: "url2",
		likes: 1
	},
	{
		title: "3",
		author: "G",
		url: "url2",
		likes: 9
	},
	{
		title: "4",
		author: "G",
		url: "url2",
		likes: 8
	},
	{
		title: "5",
		author: "A",
		url: "url2",
		likes: 5
	},
	{
		title: "6",
		author: "W",
		url: "url2",
		likes: 2
	}
]

const nonExistingId = async () => {
	const blog = new Blog({
		title: "will be removed",
		author: "asd",
		url: "asd",
		likes: 123
	})
	await blog.save()
	await blog.remove()

	return blog._id.toString()
}

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

module.exports = {
	initialBlogs, nonExistingId, blogsInDb
}