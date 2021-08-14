const Knex = require('knex')
const { Model } = require('objection')

const knex = Knex({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: 'example.db'
  }
})
Model.knex(knex)

async function ToneLogSchema () {
  if (await knex.schema.hasTable('tonelog')) {
    return
  }

  await knex.schema.createTable('tonelog', table => {
    table.increments('id').primary()
    table.dateTime('timestamp').defaultTo(knex.fn.now())
    table.json('tones')
    table.string('message')
    table.string('username')
  })
}

async function UsersSchema () {
  if (await knex.schema.hasTable('users')) {
    return
  }

  await knex.schema.createTable('users', table => {
    table.increments('id').primary()
    table.string('username')
    table.string('password')
    table.json('roles')
  })
}

ToneLogSchema()
UsersSchema()
