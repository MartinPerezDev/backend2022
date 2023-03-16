const destroySession = (req, res) => {
    req.session.destroy()
    res.status(200).json({ status: 200, message: 'loggout success', data: {} })
}

module.exports = destroySession