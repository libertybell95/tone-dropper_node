// Route: users/

const express = require('express')
const Joi = require('joi')
const bcrypt = require('bcrypt')

const Users = require('../models/Users')

const router = express.Router()

router.get('/', async (req, res) => {
  const users = await Users.query()
  res.send(users.map(u => ({
    ...u,
    roles: JSON.parse(u.roles)
  })))
})

router.get('/:id', async (req, res) => {
  const user = await Users.query().findById(req.params.id)
  res.send({
    ...user,
    roles: JSON.parse(user.roles)
  })
})

router.post('/', async (req, res) => {
  const { error } = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  }).validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const doesExist = await Users.query().where('username', req.body.username)
  if (doesExist === []) return res.status(401).send('Username already exists')

  const salt = await bcrypt.genSalt(10)
  const hashedPW = await bcrypt.hash(req.body.password, salt)

  const user = await Users.query().insert({
    username: req.body.username,
    password: hashedPW,
    roles: JSON.stringify(['operator'])
  })

  res.status(201).send(user)
})

router.put('/:id', async (req, res) => {
  const { error } = Joi.object({
    username: Joi.string(),
    password: Joi.string(),
    roles: Joi.array()
      .items(Joi.string())
  }).validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  await Users.query().findById(req.params.id).patch(req.body)

  res.sendStatus(202)
})

router.delete('/:id', async (req, res) => {
  await Users.query().deleteById(req.params.id)
  res.sendStatus(202)
})

module.exports = router
