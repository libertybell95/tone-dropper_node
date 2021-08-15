import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { deleteUser } from '../../services/users'

function DeleteUser ({ user, onClose }) {
  const handleClose = () => {
    onClose()
  }

  const handleSubmit = () => {
    deleteUser(user.id).then(res => {
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
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete user {user.username}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>Cancel</Button>
          <Button variant='danger' onClick={handleSubmit}>Delete!</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteUser
