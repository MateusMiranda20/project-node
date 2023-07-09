const express = require('express')
const uuid = require('uuid')


const porta = 3000
const app = express()
app.use(express.json())

const users = [];

const myFirstMiddleware = (request, response, next) => {
    
}

app.get('/users', (request, response) =>{
    return response.json(users)
})

app.post('/users', (request, response) =>{
    const {name, age} = request.body

    const user = {id: uuid.v4(), name, age}

    users.push(user)

    return response.status(201).json(users)
})

app.put('/users/:id', (request, response) => {
    
    const { id } = request.params
    const { name, age } = request.body

    const usuariNovo = {id, name, age}

    //findIndex -> Permite encontrar informação nos array

    const index = users.findIndex(usar => usar.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "User not found"}) 
    }

    users[index] = usuariNovo

    return response.json(usuariNovo)

})

app.delete('/users/:id', (request, response) => {
    const { id } = request.params

    const index = users.findIndex(usar => usar.id === id)

    if (index < 0) {
        return response.status(404).json({message: "Not found users"})
    }

    users.splice(index,1)

    return response.status(204).json(users)
})


app.listen(porta, ()=> {
    console.log(' 😁 Servidor funcionando porta 3000 😁')
});
