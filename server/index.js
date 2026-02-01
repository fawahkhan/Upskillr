const express = require("express") ;

const app = express()
app.use(express.json)

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
app.post('/buy', function(req,res){
    //you wouuld expect the user to pay money here.
    res.json({
        msg:"Bought the course"
    })
})
//these two need authentication
app.get('/courses', function(req,res){
    res.json({
        courses
    })
})
app.get('/user/purchases', function(req,res){
    res.json({
        PurchasedCourses
    })
})
app.listen(3000)