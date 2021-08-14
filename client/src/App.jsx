import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import {
  Navbar,
  Container,
  Button
} from 'react-bootstrap'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'
import ToneQueue from './components/ToneQueue'
import Login from './components/Login'
import ToneLog from './components/ToneLog'
import Admin from './components/admin/Admin'

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
      <Navbar bg='light'>
        <Container>
          <Navbar.Brand>The Tone Dropper</Navbar.Brand>
          <Navbar.Collapse className='justify-content-end'>
            <Link to='/'>
              <Button variant='primary' style={{ marginLeft: '.3em' }}>Home</Button>
            </Link>
            <Link to='/toneLog'>
              <Button variant='primary' style={{ marginLeft: '.3em' }}>Tone Log</Button>
            </Link>
            <Button variant='danger' style={{ marginLeft: '.3em' }} onClick={handleSignOut}>Sign out</Button>
            {isAdmin &&
              <Link to='/admin'>
                <Button variant='secondary' style={{ marginLeft: '.3em' }}>Admin</Button>
              </Link>
              // eslint-disable-next-line
            } 
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>
        <Route path='/' component={ToneQueue} exact />
        <Route path='/toneLog' component={ToneLog} />
        <Route path='/admin' component={Admin} />
      </Switch>
    </Router>
  )
}

export default App
