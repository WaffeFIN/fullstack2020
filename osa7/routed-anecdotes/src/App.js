import React, { useState } from 'react'
import {
	BrowserRouter as Router,
	Switch, Route, Link, 
	useHistory, useParams
} from "react-router-dom"
import { useField } from "./hooks"
import { resetWarningCache } from 'prop-types'

const Menu = () => {
	const padding = {
		paddingRight: 5
	}
	return (
		<div>
			<Link to="/anecdotes" style={padding}>anecdotes</Link>
			<Link to="/create" style={padding}>create new</Link>
			<Link to="/about" style={padding}>about</Link>
		</div>
	)
}

const Anecdote = ({ anecdotes }) => {
	const id = useParams().id
	const anecdote = anecdotes.find(n => n.id === id)
	return (
		<div>
			<h2>{anecdote.content}</h2>
			<div><strong>has {anecdote.votes} votes</strong></div>
			<div>{anecdote.author}</div>
			<div>{anecdote.info}</div>
		</div>
	)
}

const AnecdoteList = ({ anecdotes }) => (
	<div>
		<h2>Anecdotes</h2>
		<ul>
			{anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={"/anecdotes/" + anecdote.id}>{anecdote.content}</Link></li>)}
		</ul>
	</div>
)

const About = () => (
	<div>
		<h2>About anecdote app</h2>
		<p>According to Wikipedia:</p>

		<em>An anecdote is a brief, revealing account of an individual person or an incident.
			Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
			such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
			An anecdote is "a story with a point."</em>

		<p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
	</div>
)

const Footer = () => (
	<div>
		Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

		See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
	</div>
)

const CreateNew = ( { addNew, addNotification } ) => {
	const history = useHistory()

	const content = useField('text')
	const author = useField('text')
	const info = useField('text')

	const handleSubmit = (e) => {
		e.preventDefault()
		addNew({
			content: content.value,
			author: author.value,
			info: info.value,
			votes: 0
		})
		history.push("/anecdotes")
		addNotification("Anecdote '" + content.value + "' added successfully!")
	}

	const handleReset = (e) => {
		content.reset()
		author.reset()
		info.reset()
	}

	const removeReset = (o) => {
		const {reset, ...rest} = o
		return rest
	}

	return ( //TODO "remove" reset field from inputs
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit} onReset={handleReset}>
				<div>
					content
					<input {...removeReset(content)} />
				</div>
				<div>
					author
					<input {...removeReset(author)} />
				</div>
				<div>
					url for more info
					<input {...removeReset(info)} />
				</div>
				<button type="submit">create</button>
				<button type="reset">reset</button>
			</form>
		</div>
	)

}

const Notification = ({ notification }) => (
	notification ? <div>{notification}</div> : <div></div>
)

const App = () => {
	const [anecdotes, setAnecdotes] = useState([
		{
			content: 'If it hurts, do it more often',
			author: 'Jez Humble',
			info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
			votes: 0,
			id: '1'
		},
		{
			content: 'Premature optimization is the root of all evil',
			author: 'Donald Knuth',
			info: 'http://wiki.c2.com/?PrematureOptimization',
			votes: 0,
			id: '2'
		}
	])

	const [notification, setNotification] = useState('')

	const addNew = (anecdote) => {
		anecdote.id = (Math.random() * 10000).toFixed(0)
		setAnecdotes(anecdotes.concat(anecdote))
	}

	const addNotification = (content) => {
		setNotification(content)
		setTimeout(() => setNotification(""), 10000)
	}

	const anecdoteById = (id) =>
		anecdotes.find(a => a.id === id)

	const vote = (id) => {
		const anecdote = anecdoteById(id)

		const voted = {
			...anecdote,
			votes: anecdote.votes + 1
		}

		setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
	}

	return (
		<Router>
			<h1>Software anecdotes</h1>
			<Menu />
			<Notification notification={notification} />
			<Switch>
				<Route path="/anecdotes/:id">
					<Anecdote anecdotes={anecdotes} />
				</Route>
				<Route path="/anecdotes">
					<AnecdoteList anecdotes={anecdotes} />
				</Route>
				<Route path="/about">
					<About />
				</Route>
				<Route path="/create">
					<CreateNew addNew={addNew} addNotification={addNotification}/>
				</Route>
			</Switch>
			<Footer />
		</Router>
	)
}

export default App;
