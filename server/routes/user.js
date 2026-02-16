const bcrypt = require("bcrypt")
const {Router} = require ("express")
const jwt = require ("jsonwebtoken")
const { JWT_USER_PASSWORD } = require ("../config") //for signing users , admin passwords would be signed by their own passwords which is different

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
userRouter.post('/signin',async function(req,res){
    const { email , password} = req.body ;  //fetch email and password
    
    const user = await UserModel.findOne({  // hit the database and search for the one user
        email,
    })
    const passwordMatch = await bcrypt.compare( password, user.password) //compare the password sent in the body with the hashed password stored in the db using bcrypt compare function which returns a boolean value
    if(passwordMatch){
        const token = jwt.sign({
            id : user._id //_id field is unique in db for every user thus we are signing this
        },JWT_USER_PASSWORD)
        
        //for token based authhentication , if cokkie based auth then do cookie logic
        res.json({
        token: token
        })
    }else{
        res.status(403).json({
            msg: "Incorrect credentials"
        })
    }
    
})
userRouter.get('/purchases', function(req,res){
    res.json({
        PurchasedCourses
    })
})


module.exports= {
    userRouter: userRouter
}