const {Router} = require ("express")

const adminRouter = Router()
//importing admin model which will share admin data
const {adminModel} = require('../db')

adminRouter.post("/signup" , function(req,res){
    //check in the schema what properties are we dendingg to the db , just fetch those properties from the body
    const {email, password, firstName, lastname} = req.body   //adding zod validation is left 
// hash the password using bcrypt so that plain password is not stored in he db

    res.json({
        msg: "Admin signed in"
    })
})
adminRouter.post("/signin" , function(req,res){
    res.json({
        msg: "Admin signed in"
    })
})

// to create a post
adminRouter.post("/course" , function(req,res){
    res.json({
        msg: "This is to create a course "
    })
})

// to edit a course or its price
adminRouter.put("/course" , function(req,res){
    res.json({
        msg: "Admin signed in"
    })
})
// to get all the courses
adminRouter.get("/course/bulk" , function(req,res){
    res.json({
        msg: "Admin signed in"
    })
})

module.exports = {
    adminRouter :adminRouter 
}