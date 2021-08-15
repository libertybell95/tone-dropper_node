import React, { useState, useEffect } from 'react'
import {
  Container,
  Table,
  Row,
  Col
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync, faPlay } from '@fortawesome/free-solid-svg-icons'

import { toneLog, dropTones } from '../services/tones'

const ToneLog = () => {
  const [tones, setTones] = useState([])
  const [loading, setLoading] = useState(false)

  const loadTones = () => {
    setLoading(true)
    toneLog().then(res => {
      res.data.reverse()
      setTones(res.data)
      setLoading(false)
    })
  }

  useEffect(() => {
    loadTones()
  }, [])

  return (
    <Container>
      <Row>
        <Col>
          <h1>Tone Log</h1>
        </Col>
        <Col>
          <FontAwesomeIcon
            icon={faSync}
            style={{
              float: 'right',
              verticalAlign: 'middle',
              height: '100%',
              marginRight: '2em',
              cursor: 'pointer'
            }}
            onClick={loadTones}
            spin={loading}
          />
        </Col>
      </Row>
      <Table striped style={{ border: '1px solid #DEE3E7' }}>
        <thead>
          <tr>
            <th style={{ width: '3rem' }}>ID</th>
            <th style={{ width: '13rem' }}>Timestamp</th>
            <th>Tones</th>
            <th>Message</th>
            <th style={{ width: '7rem' }}>User</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {tones.map(t => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{new Date(t.timestamp).toLocaleString('en-us')}</td>
              <td>{t.tones.map((t, idx) => <div key={idx}>{`${t[0]}: ${t[1]}`}</div>)}</td>
              <td>{t.message}</td>
              <td>{t.username}</td>
              <td>
                <FontAwesomeIcon
                  icon={faPlay}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    dropTones({ message: t.message, tones: t.tones })
                    loadTones()
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default ToneLog
