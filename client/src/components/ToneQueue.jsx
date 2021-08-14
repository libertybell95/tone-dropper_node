import React, { useState, useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  Button,
  FormControl
} from 'react-bootstrap'
import { v4 } from 'uuid'
import Tone from './Tone'
import { getTones, dropTones } from '../services/tones'

const ToneQueue = ({ user }) => {
  const [availableTones, setAvailableTones] = useState([['', 0]])
  const [tones, setTones] = useState([['', 0, v4()]])
  const [message, setMessage] = useState('')

  useEffect(() => {
    getTones().then(res => {
      setAvailableTones(res.data)
    })
  }, [])

  const handleDelete = (id) => {
    console.log(id)
    const t = [...tones].filter(i => i[2] !== id)
    setTones(t)
    console.table(tones)
  }

  const handleToneChange = (event, idx) => {
    const t = [...tones]
    t[idx][0] = event.target.value
    setTones(t)
  }

  const handleDurationChange = (event, idx) => {
    const t = [...tones]
    t[idx][1] = event.target.value
    setTones(t)
  }

  const addTone = () => {
    const t = [...tones]
    t.push(['', 0, v4()])
    setTones(t)
  }

  const handleMessageChange = e => {
    setMessage(e.target.value)
  }

  const sendTones = () => {
    const data = {
      user,
      tones: tones,
      message: message.trim()
    }

    console.log(data)
    dropTones(data)
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <table style={{ marginBottom: '.5em' }}>
              <tr>
                <th style={{ width: '10em', marginLeft: '.3em', marginRight: '.3em' }}>Tone</th>
                <th style={{ marginLeft: '.3em', marginRight: '.3em' }}>Duration (sec)</th>
                <th />
              </tr>
              {tones.map((val, idx) => {
                return (
                  <Tone
                    key={idx}
                    id={val[2]}
                    availableTones={availableTones}
                    tone={val[0]}
                    onToneChange={e => handleToneChange(e, idx)}
                    duration={val[1]}
                    onDurationChange={e => handleDurationChange(e, idx)}
                    onDelete={handleDelete}
                  />
                )
              })}
            </table>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant='primary' onClick={addTone}>New Tone</Button>
          </Col>
        </Row>
        <Row style={{ marginTop: '1em', marginBottom: '1em' }}>
          <Col>
            <FormControl
              as='textarea'
              style={{ width: '100%', height: '10em' }}
              value={message}
              onChange={handleMessageChange}
              placeholder='Message'
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant='primary' onClick={sendTones}>Send it!</Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ToneQueue
