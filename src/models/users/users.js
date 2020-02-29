const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const users = require('./users-schema')

const SECRET = process.env.SECRET || 'changeme'

users.plugin(require('mongoose-autopopulate'))

users.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 5)
  }
})

users.methods.generateToken = function () {
  const tokenData = {
    id: this._id,
    username: this.username,
    permissions: this.role.permissions || []
  }
  return jwt.sign(tokenData, SECRET, {expiresIn: '15m', })
}

users.statics.authenticateBasic = function (username, password) {
  return this.findOne({ username })
    .then(result => result && result.comparePassword(password))
    .catch(console.error)
}

users.statics.authenticateToken = async function (token) {
  try {
    const tokenObject = jwt.verify(token, SECRET)
    console.log(tokenObject)
    // if the token has a username, try to get and return that user
    if (!tokenObject.username) {
      return Promise.reject(new Error('Token is malformed'))
    }
    const user = await this.findOne({ username: tokenObject.username })
    return user
  } catch (error) {
    return Promise.reject(error)
  }
}

users.delete = function (id) {
  return this.findByIdAndDelete(id)
}

users.methods.comparePassword = function (password) {
  // Compare a given password against the stored hashed password
  // If it matches, return the user instance, otherwise return null
  return bcrypt.compare(password, this.password)
    .then(valid => valid ? this : null)
    .catch(console.error)
}

module.exports = mongoose.model('User', users)
