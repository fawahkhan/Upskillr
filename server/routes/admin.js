const bcrypt = require("bcrypt")
const {Router} = require ("express")
const adminRouter = Router()
//importing admin model which will share admin data
const {AdminModel} = require('../db') 

adminRouter.post("/signup" , async function(req,res){
    try  {
        //check in the schema what properties are we sendingg to the db , just fetch those properties from the body
        const {email, password, firstName, lastname} = req.body   //adding zod validation is left 
        // hash the password using bcrypt so that plain password is not stored in he db
        const hashedPassword = await bcrypt.hash(password, 5) 
        
        //store in db
        await AdminModel.create({
            email: email ,
            password: hashedPassword, //rather than storing the password directly here we will be storingg the hashed password created by bcrypt.
            firstName : firstName, 
            lastname: lastname
        })
        res.json({
            msg: "Admin signed in"
        })
    }catch(e){
        res.status(500).json({
            msg: "ERROR while signup"
        })
    }
    
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