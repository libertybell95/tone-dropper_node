const { Model } = require('objection')

class ToneLog extends Model {
  static get tableName () {
    return 'tonelog'
  }

  static get idColumn () {
    return 'id'
  }
}

module.exports = ToneLog
