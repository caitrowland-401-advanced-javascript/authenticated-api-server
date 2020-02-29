const User = require('../../models/users/users')
const Role = require('../../models/roles/roles')


async function signUp (req, res, next) {
    req.body.role = await Role.findOne({name: req.body.role})
    const user = new User (req.body)
    user.save()
    .then(result => res.status(200).json({ token: user.generateToken() }))
    .catch(next)
}

function signIn (req, res, next) {
    res.status(200).json({token: req.token})
}

async function getAllUsers (req, res, next) {
    const allUsers = await User.find({})
    res.status(200).json(allUsers)
    .catch(next)
}

function showUserInfo (req, res, next) {
    res.status(200).json(req.user)
    .catch(next)
}

function deleteUser(req, res, next) {
    let id = req.params.id;
    return User.findByIdAndDelete(id)
    .then(results => {
        res.status(200).json(results)
    })
    .catch(next)
}

function updateUser (req, res, next) {
    let id = req.params.id;
    let record = req.body
    return User.findByIdAndUpdate(id, record)
    .then(results => {
      res.status(200).json(results)
    })
    .catch(next)
}


module.exports = {signUp, signIn, getAllUsers,showUserInfo,deleteUser, updateUser}