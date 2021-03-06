import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
	const anecdotes = useSelector(state => state.anecdotes)
	const dispatch = useDispatch()
	return (
		<>
		{anecdotes.map(anecdote =>
			<div key={anecdote.id}>
				<div>
					{anecdote.content}
				</div>
				<div>
					has {anecdote.votes}
					<button onClick={() => { dispatch(vote(anecdote.id)); console.log('vote', anecdote.id) }}>vote</button>
				</div>
			</div>
		)}
		</>
	)
}

export default AnecdoteList