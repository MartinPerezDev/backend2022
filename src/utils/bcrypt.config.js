const bcrypt = require('bcrypt')

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
const passwordIsValid = (user, password) => bcrypt.compareSync(password, user.password)

module.exports = {
    createHash,
    passwordIsValid
}