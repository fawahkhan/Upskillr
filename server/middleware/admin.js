const jwt = require("jsonwebtoken")
const {JWT_ADMIN_PASSWORD} = require ("../config")

function adminMiddleware(req , res , next){
    try {
        const authHeader = req.headers.authorization || req.headers.token;
        const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
        const decoded = jwt.verify(token , JWT_ADMIN_PASSWORD)
        if (decoded) {
            req.adminID = decoded.id
            next()
        } else {
            res.status(403).json({ msg : "YOU are not signed in" })
        }
    } catch(e) {
        res.status(403).json({ msg : "YOU are not signed in" })
    }
}

module.exports ={
    adminMiddleware:adminMiddleware ,
}