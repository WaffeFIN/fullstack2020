import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Part = ({part, exercises}) => (
  <p>{part} {exercises}</p>
)

const Content = (props) => (
  <div>
    {props.data.map((item) => (
      <Part part={item.part} exercises={item.exercises} />
    ))}
  </div>
)

const Total = (props) => {
  const sum = props.data.reduce((total, item) => total + item.exercises, 0)
  return (
    <p>Number of exercises {sum}</p>
  )
}

const App = () => {
  const course = {
    title: "Half Stack application development",
    data: [
      {part: "Fundamentals of React", exercises: 10},
      {part: "Using props to pass data", exercises: 7},
      {part: "State of a component", exercises: 14}
    ]
  }

  return (
    <div>
      <Header course={course.title} />
      <Content data={course.data} />
      <Total data={course.data} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
