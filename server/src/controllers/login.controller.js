export const authenticateSucces = async(req, res)=>{
    const user = { 
        email: req.user.email,
        name: req.user.name,
        address: req.user.address,
        age: req.user.age,
        telephone: req.user.telephone,
        image: req.user.image
    }
    res.status(200).json(user)
}

export const authenticateFail =(req, res)=>{
    res.status(404).json({ msg: "user no authenticate" })
}