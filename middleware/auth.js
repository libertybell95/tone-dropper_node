const jwt = require('jsonwebtoken')
const config = require('config')

/**
 * Authentication middleware
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
module.exports = function (req, res, next) {
  const sessionId = req.cookies.sessionId
  if (!sessionId) return res.status(401).send('No sessionId')

  const verify = jwt.verify(sessionId, config.get('secret'))
  if (verify) {
    req.username = verify.username
    next()
  } else {
    return res.status(401).send('Invalid sessionId')
  }
}
