import React from 'react'
import { useDispatch } from 'react-redux'
import { add } from '../reducers/anecdoteReducer'

const AnecdoteForm = ( ) => {
	const dispatch = useDispatch()

	return (
		<form onSubmit={(event) => { event.preventDefault(); dispatch(add(event.target.anecdote.value)); console.log('add', event.target.anecdote.value); event.target.anecdote.value = "" }}>
			<div><input name="anecdote"/></div>
			<button type="submit">create</button>
		</form>
	)
}

export default AnecdoteForm