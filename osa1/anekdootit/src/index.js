import React, { useState } from 'react'
import ReactDOM from 'react-dom'

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const App = (props) => {
  const [selected, setSelected] = useState(0)

  var [points, setPoints] = useState(Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf,0))

  const voteOn = (selected) => {
    const copy = [...points]
    copy[selected] += 1   
    setPoints(copy)  
  }

  var maxSelected = points.indexOf(Math.max(...points));

  return (
    <div>
      <h2>Random anecdote</h2>
      <div className="anecdote">
        <p>{props.anecdotes[selected]}</p>
        <p>Anecdote has {points[selected]} points</p>
      </div>
      <button onClick={() => voteOn(selected)}>+ Upvote +</button>
      <button onClick={() => setSelected(getRandomInt(props.anecdotes.length))}>Next &gt;&gt;</button>
      <h2>Best anecdote</h2>
      <div className="anecdote">
        <p>{props.anecdotes[maxSelected]}</p>
        <p>Anecdote has {points[maxSelected]} points</p>
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
