const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token("data", (request) => {
    return request.method === "POST" ? JSON.stringify(request.body) : " ";
  });
  
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

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

app.get('/info', (request, response, next) => {
  response.send(`<div>
                    <p>Phonebook has info for ${persons.length} people.</p>
                    <p>${current_time}</p>
                <div>`)
})

app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = Number(request.params.id)

    Person.findById(request.params.id).then(person => {
        if(person){
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
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

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    /*
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
    */
    
    if (body.name === undefined || body.number === undefined){
        return response.status(400).json({error: 'content missing'})
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})