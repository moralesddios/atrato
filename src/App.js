import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.scss';
import { Home, Form, Card } from './pages'
import { Nav } from './components'

function App() {
  return (
    <Router>
      <Nav />
      <div className="container mt-2">
        <Routes>
          <Route path="/form" element={<Form />} />
          <Route path="/card" element={<Card />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
