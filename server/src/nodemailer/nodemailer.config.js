import nodemailer from 'nodemailer';
import * as dotenv from "dotenv"
dotenv.config()


const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.MAIL_SEND,
        pass: process.env.MAIL_SEND_PASSWORD
    }
});

export const sendEmailRegister = (user) => {
    const mailOptions = {
        from: "Admin Library",
        to: ['martinperez9713@gmail.com'],
        subject: 'Nuevo Registro',
        html: `
            <div>
                <h2>Nuevo Registro</h1><br><br>
                <h3>email: ${user.email}</h3><br>
                <h3>name: ${user.name}</h3><br>
                <h3>address: ${user.address}</h3><br>
                <h3>age: ${user.age}</h3><br>
                <h3>telephone: ${user.telephone}</h3><br>
                <h3>image: ${user.image}</h3>
            </div>
        `,
    }
    transporter.sendMail(mailOptions)
        .then(info => true)
        .catch(err => false)
}

export const sendEmailOrder = async(user, products) => {
    const mailOptions = {
        from: "Admin Library",
        to: ['martinperez9713@gmail.com'],
        subject: `Nuevo Pedido de ${user.name}, ${user.email}`,
        html: `
            <div>
                <h2>Resumen de su pedido</h1><br><br>
                ${products.map(product => (
                    `<div><p>${product.name}</p> <p>$${product.price}</p></div><br>`
                ))}
            </div>
        `
    }
    transporter.sendMail(mailOptions)
        .then(info => (true))
        .catch(err => (false))
}

