const Knex = require('knex')
const { Model } = require('objection')
const { ToneLogSchema } = require('./ToneLog')
const { UsersSchema } = require('./Users')
const config = require('config')

module.exports = function () {
  const knex = Knex({
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: config.get('dbFile')
    }
  })

  Model.knex(knex)

  ToneLogSchema(knex)
  UsersSchema(knex)
}
