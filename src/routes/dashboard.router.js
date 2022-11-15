import { Router } from "express";
export const dashboardRouter = Router()

dashboardRouter.get("/", (req,res)=> {
    if (req.session.user && req.cookies.user_sid) {
        res.render('dashboard', {username: req.session.user.username})
    } else {
        res.redirect('/login')
    }
})