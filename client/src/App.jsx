import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import {
  Navbar,
  Container,
  Button
} from 'react-bootstrap'
import Cookies from 'js-cookie'
import ToneQueue from './components/ToneQueue'
import Login from './components/Login'

const App = () => {
  const [user, setUser] = useState(Cookies.get('sessionId'))

  const handleSetUser = (val) => {
    if (val) {
      Cookies.set('sessionId', val)
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
      <Navbar bg='light'>
        <Container>
          <Navbar.Brand>The Tone Dropper</Navbar.Brand>
          <Navbar.Collapse className='justify-content-end'>
            <Button variant='danger' onClick={handleSignOut}>Sign out</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>
        <Route path='/' exact>
          <ToneQueue userid={user} />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
