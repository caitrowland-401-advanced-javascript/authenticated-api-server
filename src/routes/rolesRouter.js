const express = require('express');
const rolesRouter = express.Router();

const Role = require('../models/roles/roles')

rolesRouter.get('/roles', async (req, res, next) => {
    const allRoles = await role.find({})
    res.send(200).json(allRoles)
})

rolesRouter.post('/roles', async (req, res, next) => { 
    const role = new Role(req.body)
    const created = await role.save()
    res.status(200).json(created)
})

module.exports = rolesRouter;