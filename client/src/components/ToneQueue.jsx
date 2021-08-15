import React, { useState, useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  Button,
  FormControl
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { v4 } from 'uuid'
import Tone from './Tone'
import { getTones, dropTones } from '../services/tones'

const ToneQueue = () => {
  const [availableTones, setAvailableTones] = useState([['', 0]])
  const [tones, setTones] = useState([['', 0, v4()]])
  const [message, setMessage] = useState('')
  const [submitButton, setSubmitButton] = useState('Send It!')

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

  /**
   * Send the tones!
   * @param {import('react').MouseEvent} e
   */
  const sendTones = e => {
    const originalValue = submitButton
    e.target.disabled = true
    setSubmitButton(<FontAwesomeIcon icon={faSpinner} spin />)

    const data = {
      tones: tones.map(t => [t[0], t[1]]),
      message: message.trim()
    }

    console.log(data)
    dropTones(data).then(res => {
      e.target.disabled = false
      setSubmitButton(originalValue)
    })
  }

  return (
    <>
      <Container style={{ width: '25em' }}>
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
            <Button
              variant='primary'
              onClick={addTone}
              style={{ width: '7rem' }}
            >
              New Tone
            </Button>
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
            <Button
              variant='primary'
              onClick={sendTones}
              style={{ width: '7rem' }}
            >
              {submitButton}
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ToneQueue
