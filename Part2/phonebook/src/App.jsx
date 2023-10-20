import { useState, useEffect } from 'react'
import personService from './services/persons'
import PersonsList from './components/PersonsList'
import PersonsForm from './components/PersonsForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [filterName, setFilterName] = useState('')

  // Load data from server
  useEffect(() => {
    personService
      .getAllPersons()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  //console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const checkNames = persons.find(props => props.name.toLowerCase() === personObject.name.toLowerCase())
    const changedPerson = {...checkNames, number: newNumber}
    //console.log(checkNames)

    // If the person is already in the phonebook
    if (checkNames && checkNames.number === personObject.number){
      window.alert(`${newName} is already added to phonebook`)
    }
    // The person exists but different number -> update
    else if (checkNames && checkNames.number !== personObject.number){
      if(window.confirm(`${checkNames.name} is already added to phonebook, replace the old number with a new one?`)){
        personService
          .updatePerson(checkNames.id, personObject)
          .then(response => {
            setPersons(persons.map(props => props.id !== checkNames.id ? props : response))
            setNewName('')
            setNewNumber('')
          })
      }
    }
    // The person is new -> create
    else{
      personService
        .createPersons(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)){
      personService
        .deletePerson(person.id)
        .then(response => {
          const updatedPersonsList = persons.filter((props) => props.id !== person.id)
          setPersons(updatedPersonsList)
        })
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const query = event.target.value
    setFilterName(query)
  }

  const filteredNames = persons.map(props => props.name.toLowerCase().includes(filterName.toLowerCase()))
  ? persons.filter(props => props.name.toLowerCase().includes(filterName.toLowerCase()))
  : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter ={filterName} onChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonsForm 
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <div>
        <PersonsList persons={filteredNames} deletePerson={deletePerson}/>
      </div>
    </div>
  )
}

export default App