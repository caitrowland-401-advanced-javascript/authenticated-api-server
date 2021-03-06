const base64 = require('base-64')
const User = require('../../models/users/users')

function basicAuth (req, res, next) {
  // check if we have an authorization header
  if (!req.headers.authorization) {
    next(new Error('No authorization header'))
  }

  // if we have an authorization header, get the username and
  // password out of the base64-encoded header
  // Basic Auth header looks like: "Basic ufewinvwiub"
  // split on ' ' so you get ["Basic", "ufewinvwiub"]
  // pop() on that array so you are left with "ufewinvwiub"
  const basic = req.headers.authorization.split(' ').pop()
  const decoded = base64.decode(basic) // gives us "user:pass"
  const [user, pass] = decoded.split(':') // split on ":"

  return User.authenticateBasic(user, pass)
    .then(_validate)

  function _validate (user) {
    if (user) {
      req.user = user
      req.token = user.generateToken()
      next()
    } else {
      next(new Error('you screwed it up'))
    }
  }
}

module.exports = basicAuth
