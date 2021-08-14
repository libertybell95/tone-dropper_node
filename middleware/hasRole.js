const jwt = require('jsonwebtoken')

/**
 * Role checking middleware
 * @param {string[]} roleList
 */
module.exports = (roleList) => {
  /**
   * Middleware
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  return (req, res, next) => {
    const { roles } = jwt.decode(req.cookies.sessionId)
    const isValid = roleList.some(r => roles.includes(r))
    if (isValid) {
      next()
    } else {
      return res.status(403).send('Insufficient permissions')
    }
  }
}
