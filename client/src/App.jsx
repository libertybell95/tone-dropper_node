import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'
import ToneQueue from './components/ToneQueue'
import Login from './components/Login'
import ToneLog from './components/ToneLog'
import Admin from './components/admin/Admin'
import NavBar from './components/NavBar'

const App = () => {
  const [user, setUser] = useState(Cookies.get('sessionId'))
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (!user) return null
    const token = jwt.decode(user)
    setIsAdmin(token.roles.includes('admin'))
  }, [user])

  const handleSetUser = (val) => {
    if (val) {
      setUser(val)
    }
  }

  const handleSignOut = () => {
    Cookies.remove('sessionId')
    setUser(false)
  }

  if (!user) {
    return <Login setUser={handleSetUser} />
  }

  return (
    <Router>
      <NavBar onSignOut={handleSignOut} isAdmin={isAdmin} />

      <Switch>
        <Route path='/' component={ToneQueue} exact />
        <Route path='/toneLog' component={ToneLog} />
        <Route path='/admin' component={Admin} />
      </Switch>
    </Router>
  )
}

export default App
