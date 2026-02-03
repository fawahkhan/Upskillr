const bcrypt = require("bcrypt")
const {Router} = require ("express")

const userRouter = Router();
const {UserModel} = require('../db') 

userRouter.post('/signup', async function(req,res){
    try {
        const {email, password, firstName, lastname} = req.body    //adding zod validation is left 
        const hashedPassword = await bcrypt.hash(password, 5) 
          
        await UserModel.create({
        email: email ,
        password: hashedPassword, //rather than storing the password directly here we will be storingg the hashed password created by bcrypt.
        firstName : firstName, 
        lastname: lastname
        })

        res.json({
        msg: "User Signed up successfully"
    })
    }catch(e){
        res.status(500).json({
            msg: "ERROR while signup"
        })
    }
    
})
userRouter.post('/signin', function(req,res){
    res.json({
        msg:"User login"
    })
})
userRouter.get('/purchases', function(req,res){
    res.json({
        PurchasedCourses
    })
})


module.exports= {
    userRouter: userRouter
}