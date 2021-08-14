import React, { useState, useEffect } from 'react'
import {
  Container,
  Table
} from 'react-bootstrap'

import { toneLog } from '../services/tones'

const ToneLog = () => {
  const [tones, setTones] = useState([])

  useEffect(() => {
    toneLog().then(res => {
      res.data.reverse()
      setTones(res.data)
    })
  // eslint-disable-next-line
  }, [])

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th style={{ width: '3rem' }}>ID</th>
            <th style={{ width: '11rem' }}>Timestamp</th>
            <th>Tones</th>
            <th>Message</th>
            <th style={{ width: '7rem' }}>User</th>
          </tr>
        </thead>
        <tbody>
          {tones.map(t => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.timestamp}</td>
              <td>{t.tones.map(t => ` ${t[0]}: ${t[1]}s`).toString()}</td>
              <td>{t.message}</td>
              <td>{t.username}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default ToneLog
