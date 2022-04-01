import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import { list, save, update, remove, updateStatus } from './services/UserService'

// Constantes
const PORT = 5000;
const DATABASE_URL = "mongodb+srv://mongodb:mongodb@nef.zpr9d.mongodb.net/atrato?retryWrites=true&w=majority"

// Abriendo conexión con la base de datos de mongo
mongoose.connect(DATABASE_URL)
const database = mongoose.connection

// Imprimir error en caso de error de conexión con la base de datos
database.on('error', (error) => {
  console.log(error)
})

// Imprimir mensaje de éxito de conexión
database.once('connected', () => {
  console.log('Database Connected')
})

// Servidor
const app = express()
app.use(express.json())
app.use(cors())
app.use('/static', express.static('imgs'))

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})

// Listar
app.get('/', list)

// Guardar
app.post('/', save)

// Actualizar
app.put('/:id', update)

// Eliminar
app.delete('/:id', remove)

// Actualizar estatus
app.patch('/:id', updateStatus)