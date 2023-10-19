import { useState } from 'react'

const Persons = ({name}) => {
  return (
    <div>
      {name}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }, { name: 'Jose Javier'}
  ]) 

  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName
    }

    const checkNames = persons.find(props => props.name.toLowerCase() === personObject.name.toLowerCase())
    //console.log(checkNames)

    if (checkNames){
      window.alert(`${newName} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat(personObject))
      setNewName('')
    }
    
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>debug: {newName}</div>
      <h2>Numbers</h2>
      <div>{persons.map(props =>
        <Persons key={props.id} name={props.name}/>)}
      </div>
    </div>
  )
}

export default App