import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import { AppList } from './AppList'

function App() {
  return (
    <div className="App">
      <Router>
        <h1>
          porras homepage
        </h1>

        <AppList />
      </Router>
    </div>
  )
}

export default App
