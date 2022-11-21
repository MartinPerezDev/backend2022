import { UserDaoManager } from "../daos/UserDaoDb.js";

export const index = async (req, res) => {
    res.render("signup", {error: false})
}

// export const addUser = async (req, res) => {
//     try {
//         let user = {
//             username: req.body.username,
//             email: req.body.email,
//             password: req.body.password
//         }
//         const resp = await UserDaoManager.add(user)
//         if (!resp) {
//             res.render('signup', {error: false})
//         } else {
//             req.session.user = user
//             res.redirect('/dashboard')
//         }
//     } catch (error) {
        
//     }
// }
