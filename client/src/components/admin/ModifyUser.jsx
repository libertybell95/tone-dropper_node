import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { updateUser } from '../../services/users'

function ModifyUser ({ user, onClose }) {
  const [username, setUsername] = useState(user.username)
  const [password, setPassword] = useState(undefined)
  const [isOperator, setIsOperator] = useState(user.roles.includes('operator'))
  const [isAdmin, setIsAdmin] = useState(user.roles.includes('admin'))

  const handleClose = () => {
    onClose()
  }

  const handleSubmit = () => {
    const data = { username, roles: [] }
    if (password) { data.password = password }
    if (isOperator) data.roles.push('operator')
    if (isAdmin) data.roles.push('admin')
    console.log(data)
    updateUser(user.id, data).then(res => {
      if (res.status === 202) onClose()
    })
  }

  return (
    <>
      <Modal
        show
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Username</Form.Label>
              <Form.Control value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' value={password} onChange={e => setPassword(e.target.value)} />
              <Form.Text className='text-muted'>
                If not changing password, leave field empty
              </Form.Text>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Roles</Form.Label>
              <div>
                <Form.Check inline label='Operator' checked={isOperator} onClick={e => setIsOperator(e.target.checked)} readOnly />
                <Form.Check inline label='Admin' checked={isAdmin} onClick={e => setIsAdmin(e.target.checked)} readOnly />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>Close</Button>
          <Button variant='primary' onClick={handleSubmit}>Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModifyUser
