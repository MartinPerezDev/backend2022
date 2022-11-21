import { Router } from "express";
export const dashboardRouter = Router()

dashboardRouter.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        res.render('dashboard', { username: req.user.username, email: req.user.email })
    }else{
        res.redirect("/login")
    }
})