import React from 'react'
import {
  FormControl,
  Button
} from 'react-bootstrap'

const Tone = ({ tone, onToneChange, duration, onDurationChange, onDelete, availableTones, id }) => {
  return (
    <tbody>

      <tr>
        <td style={{ marginLeft: '.3em', marginRight: '.3em', width: '10em' }}>
          <select
            value={tone}
            onChange={onToneChange}
            className='form-select'
            style={{ float: 'left' }}
          >
            <option value='' />
            {availableTones.map((val, idx) => (
              <option key={idx} value={val[0]}>{val[0]}</option>
            ))}
          </select>
        </td>
        <td style={{ marginLeft: '.3em', marginRight: '.3em', width: '10em' }}>
          <FormControl
            type='number'
            value={duration}
            onChange={onDurationChange}
          />
        </td>
        <td style={{ marginLeft: '.3em', marginRight: '.3em', width: '5em' }}>
          <Button
            variant='danger'
            onClick={() => onDelete(id)}
          >
            Delete
          </Button>
        </td>
      </tr>
    </tbody>
  )
}

export default Tone
