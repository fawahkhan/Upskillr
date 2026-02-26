const jwt = require("jsonwebtoken")
const {JWT_USER_PASSWORD} = require ("../config")

function userMiddleware(req , res , next){
    try {
        const authHeader = req.headers.authorization || req.headers.token;
        const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
        const decoded = jwt.verify(token , JWT_USER_PASSWORD)
        if (decoded) {
            req.userID = decoded.id
            next()
        } else {
            res.status(403).json({ msg : "You are not signed in" })
        }
    } catch(e) {
        res.status(403).json({ msg : "You are not signed in" })
    }
}

module.exports ={
    userMiddleware: userMiddleware  
}