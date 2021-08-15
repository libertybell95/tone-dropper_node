import axios from 'axios'

/**
 * @param {string} username
 * @param {string} password
 */
export function createUser (username, password) {
  return axios.post('/users', {
    username,
    password
  })
}

export function resetPassword (id, username, password) {
  return axios.put('/users/' + id, {
    username,
    password
  })
}

/**
 * @param {number} id
 */
export function deleteUser (id) {
  return axios.delete('/users/' + id)
}

export function getAllUsers () {
  return axios.get('/users')
}

export function updateUser (id, data) {
  return axios.put('/users/' + id, data)
}
