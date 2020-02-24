import React, { useState, useEffect, useImperativeHandle } from "react"
import PropTypes from "prop-types"

import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"

const Notification = ({ message }) => {

	if (message === null) {
		return null
	}

	return (
		<div className="error">
			{message}
		</div>
	)
}

const Togglable = React.forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ^ props.inverted ? "none" : "" }
	const showWhenVisible = { display: visible ^ props.inverted ? "" : "none" }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility
		}
	})

	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility}>{props.buttonLabel}</button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<button onClick={toggleVisibility}>cancel</button>
			</div>
		</div>
	)
})

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired
}
Togglable.displayName = "Togglable"

/*
const noteFormRef = React.createRef()

  <Togglable buttonLabel="new note" ref={noteFormRef}>//*/

const ALERT_TIMEOUT = 5000

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState("") 
	const [password, setPassword] = useState("")
	const [user, setUser] = useState(null)

	const [title, setTitle] = useState("") 
	const [author, setAuthor] = useState("")
	const [url, setUrl] = useState("")
	const [errorMessage, setErrorMessage] = useState(null)

	const loginRef = React.createRef() 
	const newBlogRef = React.createRef() 

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		)
	}, [])

	useEffect(() => {
		const currentUserJSON = window.localStorage.getItem("currentUser")
		if (currentUserJSON) {
			const user = JSON.parse(currentUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()
		console.log("Logging in to " + username)
		try {
			const user = await loginService.login({
				login: username, password,
			})

			window.localStorage.setItem(
				"currentUser", JSON.stringify(user)
			) 
			setUser(user)
			blogService.setToken(user.token)
			setUsername("")
			setPassword("")
			if (loginRef.current)
				loginRef.current.toggleVisibility()
		} catch (exception) {
			console.log("Nope: " + exception)
			setErrorMessage(
				"Username or password wrong"
			)
			setTimeout(() => {
				setErrorMessage(null)
			}, ALERT_TIMEOUT)
		}
	}

	const handleLogout = (event) => {
		event.preventDefault()
		window.localStorage.removeItem("currentUser")
		setUser(null)
		blogService.setToken("")
		setUsername("")
		setPassword("")
		if (loginRef.current)
			loginRef.current.toggleVisibility()
	}

	const handleAddition = async (event) => {
		event.preventDefault()
		console.log("Adding " + title)
		try {
			const blog = await blogService.create({
				title, author, url,
			})

			setBlogs(blogs.concat([blog]))
			setErrorMessage(
				"Added blog " + title
			)
			setTimeout(() => {
				setErrorMessage(null)
			}, ALERT_TIMEOUT)
		} catch (exception) {
			console.log("Nope: " + exception)
		}
	}

	return (
		<div>
			<Notification message={errorMessage} />
			{ user ? [LoggedIn({
				user,
				handleLogout
			}), <Togglable buttonLabel="Create new blog" ref={newBlogRef}>
				{NewBlog({
					handleAddition,
					title, setTitle,
					author, setAuthor,
					url, setUrl
				})}
			</Togglable>] : Login({
				handleLogin,
				username, setUsername,
				password, setPassword
			})}
			<BlogList blogs={blogs} />
		</div>
	)
}

const NewBlog = ( { handleAddition, title, setTitle, author, setAuthor, url, setUrl} ) => {
	return (
		<div>
			<h2>Create new blog</h2>
			<form onSubmit={handleAddition}>
				<div>
					title
					<input
						type="text"
						value={title}
						name="Title"
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author
					<input
						type="text"
						value={author}
						name="Author"
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					url
					<input
						type="url"
						value={url}
						name="Url"
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	)
}

NewBlog.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	handleUsernameChange: PropTypes.func.isRequired,
	handlePasswordChange: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired
}

const LoggedIn = ( { user, handleLogout } ) => {
	if (user !== null)
		return (
			<div>
				<h2>{user.name} is logged in</h2>
				<button onClick={handleLogout}>Log out</button>
			</div>
		)
}

const Login = ( { handleLogin, username, setUsername, password, setPassword } ) => {
	return (
		<div>
			<h2>Log in to application</h2>
			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						type="password"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	)
}

const BlogList = ({ blogs }) => {
	blogs.sort((a, b) => a.likes > b.likes)
	return (
		<div>
			<h2>Blogs</h2>
			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog} />
			)}
		</div>
	)
}
export default App