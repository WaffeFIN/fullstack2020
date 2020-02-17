const dummy = () => 1

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = (blogs) => blogs.reduce((max, blog) => max.likes < blog.likes ? blog : max, blogs[0])

const mostBlogs = (blogs) => (
	Object.entries(blogs.reduce((author_map, blog) => {
		author_map[blog.author] = author_map[blog.author] ? author_map[blog.author] + 1 : 1
		return author_map
	}, {})).reduce((max, entry) => entry[1] > max.blogs ? {
		author: entry[0],
		blogs: entry[1]
	} : max, { blogs: 0 })
)

const mostLikes = (blogs) => (
	Object.entries(blogs.reduce((author_map, blog) => {
		author_map[blog.author] = author_map[blog.author] ? author_map[blog.author] + blog.likes : blog.likes
		return author_map
	}, {})).reduce((max, entry) => entry[1] > max.likes ? {
		author: entry[0],
		likes: entry[1]
	} : max, { likes: 0 })
)

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}