const express = require('express')
const authRouter = express.Router()

const User = require('../models/users/users')
const Role = require('../models/roles/roles')
const basicAuth = require('../middleware/auths/basicAuth')
const bearerAuth = require('../middleware/auths/bearerAuth')
const acl = require('../middleware/accessControlList');

const {signUp, signIn, getAllUsers, showUserInfo, deleteUser, updateUser} = require('../middleware/routeHandlers/routeHandlers')

authRouter.post('/signup', signUp)
authRouter.post('/signin', basicAuth, signIn)
authRouter.get('/users', bearerAuth, getAllUsers)
authRouter.post('/secret', bearerAuth, showUserInfo)
authRouter.delete('/users/:id', bearerAuth, acl('delete', deleteUser))
authRouter.put('/users/:id', bearerAuth, acl ('update'), updateUser)

module.exports = authRouter
