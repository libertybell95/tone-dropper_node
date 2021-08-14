import Axios from 'axios'

export function authenticate (username, password) {
  return Axios.post('/auth/login', {
    username,
    password
  })
}
