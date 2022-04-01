import joi from 'joi'
import mongoose from 'mongoose'

// Esquema de validación con joi
export const Validator = joi.object().keys({
  email: joi.string().max(64).required(),
  phone_number: joi.string().max(32).required(),
  first_name: joi.string().max(64).required(),
  second_name: joi.string().max(64),
  first_lastname: joi.string().max(64).required(),
  second_lastname: joi.string().max(64),
  birthdate: joi.string().max(10).required(),
  status: joi.string().valid('open', 'closed', 'pending').required(),
  analyst: joi.string().max(128).required()
})

// Esquema de documento tarjeta con mongoose
const cardSchema = new mongoose.Schema({
  number: { type: String, maxlength: 16, required: true },
  supplier: { type: String, maxlength: 32, required: true },
  cvv: { type: String, maxlength: 3, required: true },
  pin: { type: Number, required: true },
  due_date: { type: Date, required: true }
})

// Esquema de documento usuario con mongoose
const userSchema = new mongoose.Schema({
  email: { type: String, maxlength: 64, unique: true, required: true },
  phone_number: { type: String, maxlength: 32, required: true },
  first_name: { type: String, maxlength: 64, required: true },
  second_name: { type: String, maxlength: 64 },
  first_lastname: { type: String, maxlength: 64, required: true },
  second_lastname: { type: String, maxlength: 64 },
  birthdate: { type: String, maxlength: 10, required: true },
  status: { type: String, enum: ['open', 'closed', 'pending'], required: true},
  analyst: { type: String, maxlength: 128, required: true },
  card: cardSchema
})

export const Card = mongoose.model('Cards', cardSchema)
const User = mongoose.model('Users', userSchema)

export default User