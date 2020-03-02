import React from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
	  <AnecdoteList />
      <h2>Create new</h2>
	  <AnecdoteForm />
    </div>
  )
}

export default App