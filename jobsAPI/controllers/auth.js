const register = (req, res, next) => {
    res.status(200).json({message:"live"})
}

const login = (req, res, next) => {
    res.status(200).json({message:"live"})
}

module.exports = {
    register, login
}