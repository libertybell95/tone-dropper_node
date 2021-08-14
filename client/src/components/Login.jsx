import React, { useState } from 'react'
import {
  Form,
  Button,
  Container
} from 'react-bootstrap'
import axios from 'axios'

const Login = ({ setUser }) => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = () => {
    axios
      .post('/auth/login', { username, password })
      .then(res => {
        if (res.status === 200) setUser(res.data)
      })
  }

  return (
    <Container style={{ marginTop: '3em', width: '40%' }}>
      <Form>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Username</Form.Label>
          <Form.Control type='text' placeholder='Enter username' value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant='primary' onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default Login
