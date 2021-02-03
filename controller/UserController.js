const User = require('../models/User')

const login = async (req, res) => {
    const {user_name, password} = req.body
    const users = await User.find({user_name: user_name}).find({password: password})
    if (users.length > 0) {
        res.json('HelloUser')
    } else {
        res.json('Username And Password Wrong')
    }
}

const register = async (req, res) => {
    const { first_name, last_name, code_id, tel, address, user_name, password, user_role } = req.body
    const users = new User(req.body)
    await users.save()
    res.json('Register Success')
}

const profile = async (req, res) => {
    const {id} = req.params
    const users = await User.findOne({ _id: id })
    res.json(users)
}

module.exports = {
    login,
    register,
    profile,
}