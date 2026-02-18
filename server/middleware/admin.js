const jwt = require("jsonwebtoken")
const {JWT_ADMIN_PASSWORD} = require ("../config")

function adminMiddleware(req , res , next){
    const token = req.headers.token ;
    const decoded = jwt.verify(token , JWT_ADMIN_PASSWORD)

    if (decoded ){
        // when we encoded in signin of admin , an id field was created we will be using this key called id in our middlewares
        req.adminID = decoded.id 
        next()
    }else{
        res.status(403).json({
            msg : "YOU are not signed in"
        })
    }
}

module.exports ={
    adminMiddleware:adminMiddleware ,
}