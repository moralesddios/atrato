import React, { useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { useNavigate, useLocation } from 'react-router-dom'

function Card() {
  const { state } = useLocation()
  const [ selected, setSelected ] = useState(state.status)
  const navigate = useNavigate()

  const handleUpdate = () => {
    navigate('/form', { state })
  }

  const handleChangeStatus = e => {
    const { value: status } = e.target
    setSelected(status)
    axios.patch(`/${state._id}`, { status })
  }

  return (
    <div className="card p-1">
      <div className="row mt-1">
        <div className="col s2 hide-on-small-only">
          <div className="grey-text text-darken-1 profile">
            <i className="material-icons md-48">account_circle</i>
          </div>
        </div>
        <div className="col s10 m6">
          <div className="fb-col">
            <span className="blue-text text-darken-4">{`${state.first_name} ${state.second_name || ''} ${state.first_lastname} ${state.second_lastname || ''}`.toUpperCase()}</span>
            <span className="grey-text text-darken-1">{`ID: ${state._id}`}</span>
          </div>
        </div>
        <div className="col s2 fb-row fb-x-end hide-on-med-and-up">
          <button className="btn-floating" onClick={handleUpdate}>
            <i className="material-icons right">edit</i>
          </button>
        </div>
        <div className="col s4 fb-row fb-x-end fb-select hide-on-small-only">
          <select className="btn" onChange={handleChangeStatus} value={selected}>
            <option value="pending">Pendiente</option>
            <option value="open">En proceso</option>
            <option value="closed">Completado</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col s2 hide-on-small-only"></div>
        <div className="col s12 m6">
          <div className="fb-col">
            <span className="grey-text text-lighten-1">MAIL</span>
            <span className="grey-text text-darken-1">{state.email}</span>
          </div>
          <div className="fb-col mt-1 hide-on-small-only">
            <span className="grey-text text-lighten-1">FECHA DE NACIMIENTO</span>
            <span className="grey-text text-darken-1">{state.birthdate}</span>
          </div>
          <div className="fb-col mt-1">
            <span className="grey-text text-lighten-1">TELÉFONO</span>
            <span className="grey-text text-darken-1">{state.phone_number}</span>
          </div>
          <div className="fb-col mt-1 hide-on-small-only">
            <span className="grey-text text-lighten-1">ANALISTA ASIGNADO</span>
            <span className="grey-text text-darken-1">{state.analyst}</span>
          </div>
          <div className="row mt-1 hide-on-med-and-up">
            <div className="col s6">
              <div className="fb-col">
                <span className="grey-text text-lighten-1">F. NACIMIENTO</span>
                <span className="grey-text text-darken-1">{state.birthdate}</span>
              </div>
            </div>
            <div className="col s6">
              <div className="fb-col">
                <span className="grey-text text-lighten-1">ANALISTA</span>
                <span className="grey-text text-darken-1">{state.analyst}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col s4 hide-on-small-only">
          <div className="p-1 credit-card">
            <div className="row mt-1">
              <div className="col s12">
                <div className="fb-col">
                  <span className="grey-text text-lighten-1">FULL NAME</span>
                  <span className="grey-text text-darken-1">{`${state.first_name} ${state.second_name || ''} ${state.first_lastname} ${state.second_lastname || ''}`}</span>
                </div>
                <div className="fb-col">
                  <span className="grey-text text-lighten-1">CARD NUMBER</span>
                  <span className="grey-text text-darken-1">{state.card.number}</span>
                </div>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col s4">
                <div className="fb-col">
                  <span className="grey-text text-lighten-1">CVV</span>
                  <span className="grey-text text-darken-1">{state.card.cvv}</span>
                </div>
              </div>
              <div className="col s4">
                <div className="fb-col">
                  <span className="grey-text text-lighten-1">PIN</span>
                  <span className="grey-text text-darken-1">{state.card.pin}</span>
                </div>
              </div>
              <div className="col s4">
                <div className="fb-col">
                  <span className="grey-text text-lighten-1">EXP</span>
                  <span className="grey-text text-darken-1">{moment(state.card.due_date).utc().format('MM[/]YY')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row hide-on-small-only">
        <div className="col s12 fb-row fb-x-end">
          <button className="btn-flat" onClick={handleUpdate}>Editar
            <i className="material-icons right">edit</i>
          </button>
        </div>
      </div>
      <div className="row hide-on-med-and-up">
        <div className="col s12 fb-select">
          <select className="btn" onChange={handleChangeStatus} value={selected}>
            <option value="pending">Pendiente</option>
            <option value="open">En proceso</option>
            <option value="closed">Completado</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Card
