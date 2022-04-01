import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import M from 'materialize-css'
import axios from 'axios'

const INITIAL_FILTERS = { id: '', search: '', status: '' }

function Home() {
  const [loading, setLoading] = useState('indeterminate')
  const [data, setData] = useState([])
  const navigate = useNavigate()

  const initializeSelects = () => {
    const elems = document.querySelectorAll('select')
    M.FormSelect.init(elems)
  }

  useEffect(() => {
    initializeSelects()

    async function fetchData() {
      const { data } = await axios.get('/')
      setData(data.data)

      setLoading('determinate')
    }
    fetchData()
  }, [])

  const formik = useFormik({
    initialValues: INITIAL_FILTERS,
    onSubmit: async values => {
      setLoading('indeterminate')
      const { id, search, status } = values
      const { data } = await axios.get(`/?id=${id}&search=${search}&status=${status}`)
      setData(data.data)

      setLoading('determinate')
    }
  })

  const clearFilters = async () => {
    setLoading('indeterminate')
    formik.resetForm(INITIAL_FILTERS)
    const { data } = await axios.get('/')
    setData(data.data)

    setLoading('determinate')
    initializeSelects()
  }

  const handlePress = row => {
    navigate('/card', { state: row })
  }

  const formatStatus = status => {
    switch (status) {
      case 'open':
        return 'En proceso'
      case 'closed':
        return 'Completado'
      default:
        return 'Pendiente'
    }
  }

  return (
    <div className="row">
      <div className="progress">
        <div className={loading}></div>
      </div>
      <div className="row">
        <form onSubmit={formik.handleSubmit}>
          <div className="input-field col s12 m4 grey-text text-darken-1">
            <i className="material-icons prefix">assignment_ind</i>
            <input name="id" type="text" onChange={formik.handleChange} value={formik.values.id} />
            <label htmlFor="id">ID</label>
          </div>
          <div className="input-field col s12 m4 grey-text text-darken-1">
            <i className="material-icons prefix">person</i>
            <input name="search" type="tel" onChange={formik.handleChange} value={formik.values.search} />
            <label htmlFor="search">Nombre</label>
          </div>
          <div className="input-field col s12 m4 grey-text text-darken-1">
            <select name="status" onChange={formik.handleChange} value={formik.values.status}>
              <option value="">Todos</option>
              <option value="pending">Pendiente</option>
              <option value="open">En proceso</option>
              <option value="closed">Completado</option>
            </select>
            <label>Estatus</label>
          </div>
          <div className="col s12 fb-row fb-x-end">
            <button type="button" className="btn grey" onClick={clearFilters}>
              Limpiar
            </button>
            <button type="submit" className={`btn ml-1 ${loading === 'indeterminate' && 'disabled'}`}>
              <i className="material-icons left">search</i>
              Buscar
            </button>
          </div>
        </form>
      </div>
      <div className="col s12">
        <table className="highlight">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Estatus</th>
            </tr>
          </thead>

          <tbody>
            {data.map(row => (
              <tr key={row._id} onClick={() => handlePress(row)}>
                <td>{`${row.first_name} ${row.second_name || ''}`}</td>
                <td>{`${row.first_lastname} ${row.second_lastname || ''}`}</td>
                <td>{row.email}</td>
                <td>{formatStatus(row.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home
