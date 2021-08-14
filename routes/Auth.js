const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('config')
const Joi = require('joi')

router.post('/login', (req, res) => {
  const { error } = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  }).validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const key = jwt.sign({ username: 'testicles' }, config.get('secret'))
  res.cookie('sessionid', key)
  res.send(key)
})

module.exports = router
