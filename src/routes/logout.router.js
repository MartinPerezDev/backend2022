import { Router } from "express";
export const logoutRouter = Router()

logoutRouter.get("/", (req,res)=> {
    if (req.isAuthenticated()) {
        req.session.destroy(()=>{
            setTimeout(()=>{
                res.redirect('/')
            }, 2000)
        })
    } else {
        res.redirect('/login')
    }
})