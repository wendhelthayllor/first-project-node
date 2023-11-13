/*

const express = require('express')
const port = 2600

const app =express()

app.get('/users', (request, response) => {
    const {name, age} = request.query
    
    return response.json({name, age})
})

app.listen(port, () => {
   console.log(`💻 Server started on port ${port}`) 
})

*/

/*

const express = require('express')
const port = 2600

const app =express()

app.get('/users/:id', (request, response) => {
    
    const { id } = request.params

    console.log(id)

    return response.json({id})
})

app.listen(port, () => {
   console.log(`💻 Server started on port ${port}`) 
})

*/


/*
const express = require('express')

const port = 2600
const app = express()
app.use(express.json())

app.get('/users', (request, response) => {

    const { name, age } = request.body

    return response.json({ name, age})
})

app.listen(port, () => {
    console.log(`💻 Server started on port ${port}`)
})

*/

/* middleware tem o poder de parar as rotas antes. e para usar um middleware é preciso usar (request, response, next)
*/

const express = require('express')
const uuid = require('uuid')

const port = 2600
const app = express()
app.use(express.json())

const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ Error: "user not found" })
    }

    request.userIndex = index
    request.userId = id

    next()
}

app.get('/users', (request, response) => {

    return response.json(users)
})

app.post('/users', (request, response) => {
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)
    
    return response.status(201).json(user)
})

app.put('/users/:id',checkUserId, (request, response) => {
    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId

    const updateUser = { id, name, age }

    users[index] = updateUser

    return response.json(updateUser)
})

app.delete('/users/:id',checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()
})







app.listen(port, () => {
    console.log(`💻 Server started on port ${port}`)
})
