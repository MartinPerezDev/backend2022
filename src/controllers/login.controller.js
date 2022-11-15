import { UserDaoManager } from "../daos/UserDaoDb.js"

export const index = async (req, res) => {
    res.render("login", {error: false})
}

export const getUser = async (req, res) => {
    const username = req.body.username
    try {
        const user = await UserDaoManager.get(username)
        if (user && req.body.password == user.password) {
            req.session.user = user
            res.redirect('/dashboard')
        }else{
            res.render('login', {error: true})
        }
    } catch (error) {
        res.status(400).json({ error: error.message, ruta: req.originalUrl, metodo: req.method })
    }
}