const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.PASSWORD_EMAIL,
    }
})

const sendEmailRegister = async ({ email, fullname, phone }) => {
    try {
        const bodyMail = {
            from: "Admin Library",
            to: [email],
            subject: 'Welcome to our ecommerce Library',
            html: `
                <div>
                    <h2>New Register</h1><br><br>
                    <h3>email: ${email}</h3><br>
                    <h3>fullname: ${fullname}</h3><br>
                    <h3>phone: ${phone}</h3><br>
                </div>
            ` ,
        }
        await transporter.sendMail(bodyMail)
    } catch (err) {
        throw new Error('Error to send register email')
    }
}

const sendEmailOrder = async ({ email, products, order, address, fullname }) => {
    try {
        const bodyMail = {
            from: "Admin Library",
            to: [email],
            subject: 'Order Generated - Library',
            html: `
                <div>
                    <h2>Thanks for you purchase</h1><br>
                    <h2>order information:</h1><br><br>
                    <h3>order number: ${order}</h3><br>
                    <h3>email: ${email}</h3><br>
                    <h3>fullname: ${fullname}</h3><br>
                    <h3>address: ${address}</h3><br>
                    <h3>products:<br>
                    ${products.map(res => {
                        return `
                        <br>
                        <hr>
                        <li>name: ${res.name}</li>
                        <li>quantity: ${res.quantity}</li>
                        <hr>
                        <br>
                        `
                    })}
                    </h3><br>
                </div>
            `
        }
        await transporter.sendMail(bodyMail)
    } catch (err) {
        throw new Error('Error to send order email')
    }
}

module.exports = {
    sendEmailRegister,
    sendEmailOrder
}