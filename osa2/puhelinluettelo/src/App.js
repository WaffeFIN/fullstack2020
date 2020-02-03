import React, { useState, useEffect } from 'react'
import ds from './DataService.js'
import './App.css'

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

const ALERT_TIMEOUT = 3000

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
      ds.getAll().then(setPersons).catch(error => {
        setErrorMessage(
          `Couldn't contact the database server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, ALERT_TIMEOUT)})
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

    if (newName.length === 0) {
      setErrorMessage("Please add a name")
      setTimeout(() => {
        setErrorMessage(null)
      }, ALERT_TIMEOUT)
      return
    }

    const filtered = persons.filter((person) => person.name === newName)

    const entryObject = filtered.length === 0 ? {
      name: newName,
      number: newNumber
    } : { ...filtered[0], number: newNumber }

    if (entryObject.id) {
      if (!newNumber) {
        if (window.confirm("Delete " + entryObject.name + "'s entry?")) {
          ds.remove(entryObject.id).catch(error => {
            setErrorMessage(
              `${entryObject.name}' was already removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, ALERT_TIMEOUT)})
          setPersons(persons.filter(person => person.id !== entryObject.id))
        } else return
      } else if (window.confirm("Replace " + entryObject.name + "'s old number?")) {
        ds.update(entryObject.id, entryObject)
        setPersons(persons.filter(person => person.id !== entryObject.id).concat(entryObject))
      } else return
    } else {
      if (!newNumber) {
        setErrorMessage("Couldn't find an entry for " + newName + " to delete")
        setTimeout(() => {
          setErrorMessage(null)
        }, ALERT_TIMEOUT)
      } else {
        ds.create(entryObject)
        setPersons(persons.concat(entryObject))
      }
    }

    setNewName('')
    setNewNumber('')
  }
  
  return (
    <div>
      <Notification message={errorMessage} />
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handler={handleFilterChange} />
      <h2>Add/Change a new entry</h2>
      <p>Delete an entry by leaving the number field blank</p>
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
