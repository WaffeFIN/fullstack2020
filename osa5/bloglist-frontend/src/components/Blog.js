import React from "react"
import Togglable from "../Togglable"

const Blog = ({ blog, likeFn }) => {

	const blogRef = React.createRef()

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5
	}

	return (
		<div style={blogStyle}>
			{blog.title} {blog.author}
			<Togglable buttonLabel="show blog" ref={blogRef}>
				<p>{blog.likes} likes on {blog.url}</p>
				<button onClick={likeFn}>like this</button>
			</Togglable>
		</div>
	)
}

export default Blog