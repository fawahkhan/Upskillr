const express = require ("express")

const app = express()

function createUserRoutes(app){
    app.post('/user/signup', function(req,res){
        const name = req.body.name ;
        const password = req.body.password ;
        const email = req.body.email ;
        res.json({
            msg: "Signed up"
        })
    })
    app.post('/user/signin', function(req,res){
        res.json({
            msg:"User login"
        })
    })

    app.get('/user/purchases', function(req,res){
        res.json({
            PurchasedCourses
        })
    })
}

module.exports= {
    createUserRoutes: createUserRoutes

}