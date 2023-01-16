
const jwt = require('jsonwebtoken')
const authentication = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        const decode = jwt.verify(token, 'masai')
        console.log(decode)
        if (decode) {
            const userID = decode.userID
            req.body.userID = userID
            next()
        }
        else{
            res.send('Please Login First')
        }
       
    }
    else {
        res.send('Please login first')
    }
}

module.exports = {
    authentication
}