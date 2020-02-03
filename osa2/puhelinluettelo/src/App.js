import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({newFilter, handler}) => (
    <div>
      show: <input value={newFilter}
                   onChange={handler} />
    </div>
)

const Addition = ({onSubmit, newName, newNumber, nameHandler, numberHandler}) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={newName}
                   onChange={nameHandler} />
    </div>
    <div>
      number: <input value={newNumber}
                   onChange={numberHandler} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Numbers = ({persons, newFilter}) => (
  <div>
    {persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase())).map((person) => (
      <p key={person.name}>{person.name}&nbsp;{person.number}</p>)
    )}
  </div>
)

const App = () => {
  const [ persons, setPersons ] = useState([])

  useEffect(() => {
      axios
        .get('http://localhost:3001/persons')
        .then(response => {
          console.log('loaded data')
          setPersons(response.data)
        })
    }, [])
 
  const [ newName, setNewName ] = useState('')
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const [ newNumber, setNewNumber ] = useState('')
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const [ newFilter, setNewFilter ] = useState('')
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }


  const addEntry = (event) => {
    event.preventDefault()
    for (const person of persons) {
      if (person.name === newName) {
        alert(`${newName} is already added to phonebook`)
        return
      }
    }
    const entryObject = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(entryObject))
    setNewName('')
    setNewNumber('')
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handler={handleFilterChange} />
      <h2>Add a new entry</h2>
      <Addition newName={newName} newNumber={newNumber}
                nameHandler={handleNameChange}
                numberHandler={handleNumberChange}
                onSubmit={addEntry}
      />
      <h2>Numbers</h2>
      <Numbers persons={persons} newFilter={newFilter}/>
    </div>
  )

}

export default App
