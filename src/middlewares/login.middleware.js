export const sessionChecker = (req, res, next)=>{
    if (req.isAuthenticated()) {
        res.redirect('/dashboard')
    } else {
        next()
    }
}