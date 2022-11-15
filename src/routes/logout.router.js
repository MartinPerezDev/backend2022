import { Router } from "express";
export const logoutRouter = Router()

logoutRouter.get("/", (req,res)=> {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid')
        setTimeout(()=>{
            res.redirect('/')
        }, 2000)
    } else {
        res.redirect('/login')
    }
})