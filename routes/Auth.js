// Route: auth/

const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('config')
const Joi = require('joi')
const bcrypt = require('bcrypt')

const Users = require('../models/Users')

router.post('/login', async (req, res) => {
  const { error } = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  }).validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const user = await Users.query().where('username', req.body.username)
  if (user.length === 0) return res.status(400).send('Incorrect username or password')

  const validPassword = await bcrypt.compare(req.body.password, user[0].password)
  if (!validPassword) return res.status(400).send('Incorrect username or password')

  const data = {
    username: user[0].username,
    roles: user[0].roles
  }

  const key = jwt.sign(data, config.get('secret'))
  res.cookie('sessionId', key, { maxAge: 30 * 60 * 1000 })
  res.send(key)
})

module.exports = router
