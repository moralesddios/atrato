import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { BACKEND_URL } from '../constants'

function Nav() {
  const location = useLocation()
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/">
          <img src={`${BACKEND_URL}/static/WhiteLogo.png`} className="brand-logo center logo" alt="atrato"></img>
        </Link>
        {location.pathname === '/' && <Link to="/form" className="btn-floating btn-large halfway-fab waves-effect waves-light">
          <i className="material-icons">add</i>
        </Link>}
      </div>
    </nav>
  )
}

export default Nav
