const authorization = (req, res, next) => {
    //get the user key in the req.query dictionary
    const { user }  = req.query
    if(user === 'Ayo'){
        req.user =  { id : 1, name : "Ayo"}
        next()
    }
    else{
        res.status(401).send('This user is not authorized.')
    }
}

module.exports = { authorization }