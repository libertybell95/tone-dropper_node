// Route: /tones

const express = require('express')
const { v4 } = require('uuid')
const spawn = require('child_process').spawn
const Joi = require('joi')
const fs = require('fs')
const config = require('config')

const auth = require('../middleware/auth')
const hasRole = require('../middleware/hasRole')

const ToneLog = require('../models/ToneLog')

const router = express.Router()

router.post('/', [auth, hasRole(['admin', 'operator'])], async (req, res) => {
  const { error } = Joi.object({
    tones: Joi.array()
      .items(Joi.array())
      .required(),
    message: Joi.string()
      .required()
  }).validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  await ToneLog.query().insert({
    tones: JSON.stringify(req.body.tones),
    message: req.body.message,
    username: req.username
  })

  const toneFile = `tmp/${v4()}.json`
  fs.writeFileSync(toneFile, JSON.stringify(req.body))
  const process = spawn('python3', ['tone.py', toneFile])
  process.stdout.on('close', () => res.sendStatus(200))
})

router.get('/', (req, res) => {
  res.json(config.get('tones'))
})

router.get('/log', async (req, res) => {
  const log = await ToneLog.query()
  res.send(log.map(v => ({
    ...v,
    tones: JSON.parse(v.tones)
  })))
})

module.exports = router
