import axios from 'axios'
import User, { Card, Validator } from '../models/UserModel'

// Creamos una instancia de axios con la url y llave de la api de randommer
const randommer = axios.create({
  baseURL: 'https://randommer.io/api/',
  timeout: 3000,
  headers: {'X-Api-Key': "f3b80c8d2c6a478e89445e919e625fff"}
})

export const list = async (req, res) => {
  const id = req.query.id
  const status = req.query.status
  const search = req.query.search

  const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
  const searchRgx = rgx(search);

  let query = search ? User.find({
    $or: [
      { first_name: { $regex: searchRgx, $options: "i" } },
      { second_name: { $regex: searchRgx, $options: "i" } },
      { second_lastname: { $regex: searchRgx, $options: "i" } },
      { second_lastname: { $regex: searchRgx, $options: "i" } },
    ],
  }) : User.find()

  if(id) {
    query.where('_id').equals(id)
  }
  if(status) {
    query.where('status').equals(status)
  }

  const users = await query.exec()

  return res.json({
    success: true,
    data: users,
    message: 'Request successful!',
  })
}

export const save = async (req, res) => {
  try {
    // Validando el cuerpo de la petición
    const { value, error } = Validator.validate(req.body)

    // si la validación devuelve error se retorna el mensaje
    if(error){
      return res.status(400).json({
        success: false,
        data: [],
        message: error?.details[0]?.message,
      })
    }

    // Usamos la instancia de axios y el api de randommer para obtener los datos de la tarjeta
    const { data } = await randommer.get('Card')

    // Se crea la instancia de la tarjeta con los datos del servicio
    const card = new Card({
      number: data.cardNumber,
      supplier: data.type,
      cvv: data.cvv,
      pin: data.pin,
      due_date: data.date
    })

    // Se crea una instandia del usuario con los datos enviados
    let user = new User({
      email: value.email,
      phone_number: value.phone_number,
      first_name: value.first_name,
      second_name: value.second_name,
      first_lastname: value.first_lastname,
      second_lastname: value.second_lastname,
      birthdate: value.birthdate,
      status: value.status,
      analyst: value.analyst,
      card: card
    })

    // Se guarda el usuario
    user = await user.save()

    // Si todo sale bien se regresa el objeto insertado
    return res.json({
      success: true,
      data: user,
      message: 'Request successful!',
    })
  } catch (err) {
    // En caso de que exista un error se regresa un mensaje
    console.log(err)
    return res.status(500).json({
      success: false,
      data: [],
      message: "Error! try again later.",
    })
  }
}

export const update = async (req, res) => {
  // Validando el cuerpo de la petición
  const { value, error } = Validator.validate(req.body)

  // si la validación devuelve error se retorna el mensaje
  if (error) {
    return res.status(400).json({
      success: false,
      data: [],
      message: error?.details[0]?.message,
    })
  }

  // buscar el registro por id y actualizarlo
  const user = await User.findByIdAndUpdate( req.params.id,
    {
      email: value.email,
      phone_number: value.phone_number,
      first_name: value.first_name,
      second_name: value.second_name,
      first_lastname: value.first_lastname,
      second_lastname: value.second_lastname,
      birthdate: value.birthdate,
      status: value.status,
      analyst: value.analyst
    }, 
    {
      new: true
    }
  )

  // si el registro no fue encontrado, se regresa respuesta de error
  if (!user)
    return res.status(404).json({
      success: false,
      data: [],
      message: 'There is no data found related to this id!',
    })

  // Si todo sale bien se regresa el objeto actualizado
  return res.json({
    success: true,
    data: user,
    message: 'Update successful!',
  })
}

export const remove = async (req, res) => {
  // buscar y eliminar el registro
  const deleted = await User.findByIdAndRemove(req?.params?.id)

  // si el registro no fue encontrado, se regresa respuesta de error
  if (!deleted)
    return res.status(404).json({
      success: false,
      data: [],
      message: 'There is no data found related to this id!',
    })

  // si todo sale bien se regresa la data del usuario eliminado
  return res.json({
    success: true,
    data: deleted,
    message: 'Delete successful!',
  })
}

export const updateStatus = async (req, res) => {
  const user = await User.findByIdAndUpdate( req.params.id, { status: req.body.status })

  // si el registro no fue encontrado, se regresa respuesta de error
  if (!user)
  return res.status(404).json({
    success: false,
    data: [],
    message: 'There is no data found related to this id!',
  })

  // si todo sale bien se regresa la data del usuario eliminado
  return res.json({
    success: true,
    data: {},
    message: 'Update successful!',
  })
}