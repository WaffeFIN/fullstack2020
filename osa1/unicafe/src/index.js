import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({title, setter}) => (
  <button onClick={setter}>{title}</button>
)

const StatisticLine = ({title, statistic}) => (
  <tr>
  <th>{title}</th>
  <th>{statistic}</th>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const count = good + neutral + bad
  if (count === 0) {
    return (<p>No feedback given</p>)
  }
  const value = good - bad
  const average = value / count
  const positivePercentage = good / count
  return (
    <table>
      <tbody>
        <StatisticLine title="Good" statistic={good} />
        <StatisticLine title="Neutral" statistic={neutral} />
        <StatisticLine title="Bad" statistic={bad} />
        <StatisticLine title="Total" statistic={count} />
        <StatisticLine title="Average" statistic={average} />
        <StatisticLine title="Positivity" statistic={positivePercentage*100 + "%"} />
      </tbody>
    </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button title="Good"
              setter={() => setGood(good + 1)} />
      <Button title="Neutral"
              setter={() => setNeutral(neutral + 1)}  />
      <Button title="Bad"
              setter={() => setBad(bad + 1)}  />
      <h2>Stats</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
