import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/personService'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[])

  const addNumber = (event) => {
    event.preventDefault()
    const personsObject = {
      name: newName,
      number: newNumber,
    }
    if (persons.some(person => person.name.toLowerCase().includes(newName.toLowerCase()))) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNumber}
        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setNotificationMessage({text: `Information of ${person.name} has already been removed from server`, type: 'error'})
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
        setNotificationMessage({text: `${person.name}'s number was updated to the phonebook`, type: 'notification'})
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      }
    }
    else {
      personService
        .create(personsObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      setNotificationMessage({text: `${newName} was added to the phonebook`, type: 'notification'})
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handlePersonDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(name => name.id !== person.id))
        })
        .catch(error => {
          setNotificationMessage({text:`Information of ${person.name} has already been removed from server`, type: 'error'})
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
      setNotificationMessage({text:`${person.name} was deleted from the phonebook`, type: 'notification'})
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const personsToShow = newFilter
    ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm addNumber={addNumber} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handlePersonDelete={handlePersonDelete}/>
    </div>
  )
}

export default App;
