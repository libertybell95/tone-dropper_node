import React, { useState, useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit, faUserTimes } from '@fortawesome/free-solid-svg-icons'
import { getAllUsers } from '../../services/users'
import DeleteUser from './DeleteUser'
import ModifyUser from './ModifyUser'
import NewUser from './NewUser'

const Admin = () => {
  const [users, setUsers] = useState([])
  const [editForm, setEditForm] = useState(null)
  const [deleteForm, setDeleteForm] = useState(null)

  const refreshUsers = () => {
    getAllUsers().then(res => {
      if (res.status === 200) setUsers(res.data)
    })
  }

  useEffect(() => {
    refreshUsers()
  }, [])

  const openEdit = (user) => {
    setEditForm(<ModifyUser user={user} onClose={clearEdit} />)
  }

  const clearEdit = () => {
    setEditForm(null)
    refreshUsers()
  }

  const openDelete = (user) => {
    setDeleteForm(<DeleteUser user={user} onClose={clearDelete} />)
  }

  const clearDelete = () => {
    setDeleteForm(null)
    refreshUsers()
  }

  return (
    <>
      {editForm}
      {deleteForm}
      <Container>
        <h1>Admin Dashboard</h1>
        <hr />
        <div>
          <h2>Create User</h2>
          <NewUser onSubmit={refreshUsers} />
        </div>
        <hr />
        <div>
          <h2>Users</h2>
          <Table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Roles</th>
                <th style={{ width: '5em' }} />
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.username}</td>
                  <td>
                    {u.roles.map((r, idx) => (
                      <span className='badge rounded-pill bg-primary' style={{ marginRight: '.3rem' }} key={idx}>{r}</span>
                    ))}
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faUserEdit} style={{ margin: '.3em', cursor: 'pointer' }} onClick={() => openEdit(u)} />
                    <FontAwesomeIcon icon={faUserTimes} style={{ margin: '.3em', cursor: 'pointer' }} onClick={() => openDelete(u)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  )
}

export default Admin
