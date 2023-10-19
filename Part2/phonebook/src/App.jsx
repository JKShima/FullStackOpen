import { useState } from 'react'
import PersonsList from './components/PersonsList'
import PersonsForm from './components/PersonsForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [filterName, setFilterName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const checkNames = persons.find(props => props.name.toLowerCase() === personObject.name.toLowerCase())
    //console.log(checkNames)

    if (checkNames){
      window.alert(`${newName} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
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
        <PersonsList persons={filteredNames}/>
      </div>
    </div>
  )
}

export default App