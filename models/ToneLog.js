const { Model } = require('objection')

class ToneLog extends Model {
  static get tableName () {
    return 'tonelog'
  }

  static get idColumn () {
    return 'id'
  }
}

/**
 * Generate ToneLog Schema. Initiate within ./init.js
 * @param {Knex} knex
 */
async function ToneLogSchema (knex) {
  if (await knex.schema.hasTable('tonelog')) {
    return null
  }

  await knex.schema.createTable('tonelog', table => {
    table.increments('id').primary()
    table.dateTime('timestamp').defaultTo(knex.fn.now())
    table.json('tones')
    table.string('message')
    table.string('username')
  })
}

module.exports = ToneLog
module.exports.ToneLogSchema = ToneLogSchema
