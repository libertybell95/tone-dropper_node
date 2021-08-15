const { Model } = require('objection')
const bcrypt = require('bcrypt')

class Users extends Model {
  static get tableName () {
    return 'users'
  }

  static get idColumn () {
    return 'id'
  }
}

/**
 * Generate Users Schema. Initiate within ./init.js
 * @param {Knex} knex
 */
async function UsersSchema (knex) {
  if (await knex.schema.hasTable('users')) {
    return
  }

  await knex.schema.createTable('users', table => {
    table.increments('id').primary()
    table.string('username')
    table.string('password')
    table.json('roles')
  })

  const salt = await bcrypt.genSalt(10)
  const hashedPW = await bcrypt.hash('toor', salt)

  await Users.query().insert({
    username: 'root',
    password: hashedPW,
    roles: JSON.stringify(['admin'])
  })
}

module.exports = Users
module.exports.UsersSchema = UsersSchema
