import React, { useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { createUser } from '../../services/users'

const NewUser = ({ onSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleCreateUser = () => {
    createUser(username, password).then(res => {
      if (res.status === 201) {
        setUsername('')
        setPassword('')
        onSubmit()
      }
    })
  }

  return (
    <Row className='g-2'>
      <Col>
        <Form.Label>Username</Form.Label>
        <Form.Control
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </Col>
      <Col>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Col>
      <Col md='1' style={{ display: 'flex', alignItems: 'flex-end' }}>
        <Button variant='primary' onClick={handleCreateUser}>Submit</Button>
      </Col>
    </Row>
  )
}

export default NewUser
