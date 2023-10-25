const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

var current_time = new Date();

app.get('/info', (request, response) => {
  response.send(`<div>
                    <p>Phonebook has info for ${persons.length} people.</p>
                    <p>${current_time}</p>
                <div>`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

const generateId = () => {
    const newId = persons.length > 0
        ? Math.floor(Math.random() * 99999)
        : 0
    return newId
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    const checkName = persons.find(props => props.name.toLowerCase() === body.name.toLowerCase())

    if(checkName){
        return response.status(400).json({
            error: 'Name must be unique'
        })
    }

    if(!body.name){
        return response.status(400).json({
            error: 'Name missing'
        })
    }

    if(!body.number){
        return response.status(400).json({
            error: 'Number missing'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)
    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})