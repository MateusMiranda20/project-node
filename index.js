const express = require('express');
const uuid = require('uuid');
let cors = require('cors');

const porta = 3003;
const app = express()
app.use(express.json())
app.use(cors())

const users = [];

const myMiddleware = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(usar => usar.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "User not found"}) 
    }


    request.indexUser = index
    request.idUser = id

    next()
}

app.get('/users', (request, response) =>{
    return response.json(users)
})

app.post('/users', (request, response) =>{
    const {name, age} = request.body

    const user = {id: uuid.v4(), name, age}

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', myMiddleware, (request, response) => {
    const { name, age } = request.body
    const index = request.indexUser
    const id = request.idUser 

    const usuariNovo = {id, name, age}

    //findIndex -> Permite encontrar informação nos array

    users[index] = usuariNovo

    return response.json(usuariNovo)

})

app.delete('/users/:id', myMiddleware, (request, response) => {
    const index = request.indexUser
    const id = request.idUser 

    users.splice(index,1)

    return response.status(204).json(users)
})


app.listen(porta, ()=> {
    console.log(' 😁 Servidor funcionando porta 3003 😁')
});
