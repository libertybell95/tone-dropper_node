const express = require('express')
const { v4 } = require('uuid')
const spawn = require('child_process').spawn
const Joi = require('joi')
const fs = require('fs')
const config = require('config')

const AuthMiddleware = require('../middleware/auth')

const router = express.Router()

router.post('/', AuthMiddleware, (req, res) => {
  const { error } = Joi.object({
    tones: Joi.array()
      .items(Joi.array())
      .required(),
    message: Joi.string()
      .required()
  }).validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const toneFile = `tmp/${v4()}.json`
  fs.writeFileSync(toneFile, JSON.stringify(req.body))
  const process = spawn('python3', ['tone.py', toneFile])
  process.stdout.on('close', () => res.sendStatus(200))
})

router.get('/', (req, res) => {
  res.json(config.get('tones'))
})

module.exports = router
