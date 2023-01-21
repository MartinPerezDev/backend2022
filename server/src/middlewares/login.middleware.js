export const sessionChecker = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.status(200).json({
            email: req.user.email,
            name: req.user.name,
            address: req.user.address,
            age: req.user.age,
            telephone: req.user.telephone,
            image: req.user.image
        })
    } else {
        return next()
    }
}