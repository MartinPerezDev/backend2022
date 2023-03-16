const { sendEmailRegister } = require("../utils/nodemailer.config")

const authenticateSuccess = async(req, res) => {
    const user = {
        fullname: req.user.fullname,
        phone: req.user.phone,
        email: req.user.email,
    }
    await sendEmailRegister(user)
    res.status(201).json({ status: 201, message: 'user logged', data: user })
}

const authenticateFailure = (req, res) => {
    res.status(400).json({ status: 400, message: 'authentication failure', data: {} })
}

module.exports = {
    authenticateSuccess,
    authenticateFailure
}