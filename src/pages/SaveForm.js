import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { useNavigate, useLocation } from 'react-router-dom'
import M from 'materialize-css'
import * as Yup from 'yup'
import axios from 'axios'

const EMAIL_MESSAGE = 'Ingrese un correo electrónico válido'
const REQUIRED_MESSAGE = 'Esté campo es requerido'
const LONG_MESSAGE = 'Demasiados caracteres'

const INITIAL_STATE = {
  email: '',
  phone_number: '',
  first_name: '',
  second_name: '',
  first_lastname: '',
  second_lastname: '',
  birthdate: '',
  status: 'pending',
  analyst: ''
}

const FormSchema = Yup.object().shape({
  email: Yup.string().email(EMAIL_MESSAGE).required(REQUIRED_MESSAGE),
  phone_number: Yup.string().max(32, LONG_MESSAGE).required(REQUIRED_MESSAGE),
  first_name: Yup.string().max(64, LONG_MESSAGE).required(REQUIRED_MESSAGE),
  second_name: Yup.string().max(64, LONG_MESSAGE).nullable(),
  first_lastname: Yup.string().max(64, LONG_MESSAGE).required(REQUIRED_MESSAGE),
  second_lastname: Yup.string().max(64, LONG_MESSAGE).nullable(),
  birthdate: Yup.string().max(10, LONG_MESSAGE).required(REQUIRED_MESSAGE),
  status: Yup.string().required(REQUIRED_MESSAGE),
  analyst: Yup.string().max(128, LONG_MESSAGE).required(REQUIRED_MESSAGE),
})

// Función para eliminar las propiedades que no tienen un valor
function cleanForm(form) {
  Object.keys(form).forEach((k) => form[k] === '' && delete form[k]);
}

function SaveForm() {
  const [loading, setLoading] = useState('determinate')
  const { state } = useLocation()
  const navigate = useNavigate()

  const id = state && state._id

  let initial = {}
  if (id) {
    initial = {
      email: state.email,
      phone_number: state.phone_number,
      first_name: state.first_name,
      second_name: state.second_name || '',
      first_lastname: state.first_lastname,
      second_lastname: state.second_lastname || '',
      birthdate: state.birthdate,
      status: state.status,
      analyst: state.analyst
    }
  }

  const initializeSelects = () => {
    const elems = document.querySelectorAll('select')
    M.FormSelect.init(elems)
  }

  useEffect(() => {
    initializeSelects()
  }, [])

  const formik = useFormik({
    validationSchema: FormSchema,
    initialValues: id ? initial : INITIAL_STATE,
    onSubmit: values => {
      setLoading('indeterminate')
      cleanForm(values)
      const request = id ? axios.put(`/${id}`, values) : axios.post('/', values)
      request
        .then(() => {
          navigate('/')
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          setLoading('determinate')
        })
    }
  })

  const onCancel = () => {
    if(id) {
      navigate('/card', { state })
    } else {
      navigate('/')
    }
  }

  return (
    <div className="row">
      <div className="progress">
        <div className={loading}></div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="input-field col s12 m6">
            <input name="email" type="text" onChange={formik.handleChange} value={formik.values.email} />
            <label htmlFor="email" className={id && 'active'}>Correo Electrónico</label>
            {formik.errors.email && formik.touched.email ? <span className="helper-text red-text">{formik.errors.email}</span> : null}
          </div>
          <div className="input-field col s12 m6">
            <input name="phone_number" type="text" onChange={formik.handleChange} value={formik.values.phone_number} />
            <label htmlFor="phone_number" className={id && 'active'}>Teléfono</label>
            {formik.errors.phone_number && formik.touched.phone_number ? <span className="helper-text red-text">{formik.errors.phone_number}</span> : null}
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12 m6">
            <input name="first_name" type="text" onChange={formik.handleChange} value={formik.values.first_name} />
            <label htmlFor="first_name" className={id && 'active'}>Primer Nombre</label>
            {formik.errors.first_name && formik.touched.first_name ? <span className="helper-text red-text">{formik.errors.first_name}</span> : null}
          </div>
          <div className="input-field col s12 m6">
            <input name="second_name" type="text" onChange={formik.handleChange} value={formik.values.second_name} />
            <label htmlFor="second_name" className={id && state.second_name && 'active'}>Segundo Nombre</label>
            {formik.errors.second_name && formik.touched.second_name ? <span className="helper-text red-text">{formik.errors.second_name}</span> : null}
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12 m6">
            <input name="first_lastname" type="text" onChange={formik.handleChange} value={formik.values.first_lastname} />
            <label htmlFor="first_lastname" className={id && 'active'}>Primer Apellido</label>
            {formik.errors.first_lastname && formik.touched.first_lastname ? <span className="helper-text red-text">{formik.errors.first_lastname}</span> : null}
          </div>
          <div className="input-field col s12 m6">
            <input name="second_lastname" type="text" onChange={formik.handleChange} value={formik.values.second_lastname} />
            <label htmlFor="second_lastname" className={id && state.second_lastname && 'active'}>Segundo Apellido</label>
            {formik.errors.second_lastname && formik.touched.second_lastname ? <span className="helper-text red-text">{formik.errors.second_lastname}</span> : null}
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12 m6">
            <input name="birthdate" type="text" onChange={formik.handleChange} value={formik.values.birthdate} />
            <label htmlFor="birthdate" className={id && 'active'}>Fecha de Nacimiento (YYYY-MM-DD)</label>
            {formik.errors.birthdate && formik.touched.birthdate ? <span className="helper-text red-text">{formik.errors.birthdate}</span> : null}
          </div>
          <div className="input-field col s12 m6">
            <select name="status" onChange={formik.handleChange} value={formik.values.status}>
              <option value="pending">Pendiente</option>
              <option value="open">En proceso</option>
              <option value="closed">Completado</option>
            </select>
            <label>Estatus</label>
            {formik.errors.status && formik.touched.status ? <span className="helper-text red-text">{formik.errors.status}</span> : null}
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12 m6">
            <input name="analyst" type="text" onChange={formik.handleChange} value={formik.values.analyst} />
            <label htmlFor="analyst" className={id && 'active'}>Analista a cargo</label>
            {formik.errors.analyst && formik.touched.analyst ? <span className="helper-text red-text">{formik.errors.analyst}</span> : null}
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <button type="submit" className={`btn mr-1 ${loading === 'indeterminate' && 'disabled'}`}>
              <i className="material-icons left">save</i>
              Guardar
            </button>
            <button type="button" className="btn grey" onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SaveForm
