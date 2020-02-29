const express = require('express')
const authRouter = express.Router()

const User = require('../models/users')
const Role = require('../models/roles')
const basicAuth = require('../middleware/basicAuth')
const bearerAuth = require('../middleware/bearerAuth')
const acl = require('../middleware/accessControlList');
const model = require('../models/mongo-model')

authRouter.post('/signup', async (req, res, next) => {
  // expects the user sent a req body with username and password, and name of role
  // take that username and password and make a new user with it
  req.body.role = await Role.findOne({name: req.body.role})
  const user = new User(req.body)
  user.save()
    .then(result => res.status(200).json({ token: user.generateToken() }))
    .catch(next)
})

authRouter.post('/signin', basicAuth, (req, res, next) => {
  res.status(200).json({ token: req.token })
})

authRouter.get('/users', bearerAuth, async (req, res, next) => {
  // send all users
  const allUsers = await User.find({})
  res.status(200).json(allUsers)
})

authRouter.post('/secret', bearerAuth, (req, res, next) => {
  res.status(200).json(req.user)

})

authRouter.delete('/users/:id', bearerAuth, acl('delete'), (req, res, next) => {
  let id = req.params.id;
  return User.findByIdAndDelete(id)
  .then(results => {
    res.status(200).json(results)
  })
  .catch(next)
  })


authRouter.put('/users/:id', bearerAuth, acl('update'), (req, res, next) => {
  let id = req.params.id;
  let record = req.body
  return User.findByIdAndUpdate(id, record)
  .then(results => {
    res.status(200).json(results)
  })
  .catch(next)
})



module.exports = authRouter
