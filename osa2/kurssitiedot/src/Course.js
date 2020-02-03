import React from 'react';

const Course = ({course}) => {
  const {name, id, parts} = course
  return (
    <>
      <Header text={name}/>
      <Content parts={parts}/>
    </>
  )
}

const Header = ({text}) => (
  <h2>{text}</h2>
)

const Content = ({parts}) => {
  const total = parts.reduce( (s, p) => s + (p.exercises - 0), 0)
  return (
    <>
      {parts.map((part) => <Part key={part.name} name={part.name} exercises={part.exercises} />)}
      <p key="total"><b> Total of {total} exercises </b></p>
    </>
  )
}

const Part = ({name, exercises}) => (
  <p>{name}&nbsp;{exercises}</p>
)

export default Course;
