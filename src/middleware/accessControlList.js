function accessControlList(permissions) {
    return function(req, res, next) {
        try {
            if (req.user.role.permissions.includes(permissions)) {
                next()
            } else {
                next(new Error ('You shall not pass'))
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = accessControlList;