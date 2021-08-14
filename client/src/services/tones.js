import Axios from 'axios'

export function getTones () {
  return Axios.get('/tones')
}

export function dropTones (data) {
  return Axios.post('/tones', data)
}

export function toneLog () {
  return Axios.get('/tones/log')
}
