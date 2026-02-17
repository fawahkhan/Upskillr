const bcrypt = require("bcrypt")
const {Router} = require ("express")
const jwt = require ("jsonwebtoken")
const { JWT_ADMIN_PASSWORD } = require ("../config")  //for signing admins

const adminRouter = Router()
//importing admin model which will share admin data
const {AdminModel, CourseModel} = require('../db') 
const { adminMiddleware } = require("../middleware/admin")

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
adminRouter.post("/signin" ,async function(req,res){
    const { email, password} = req.body ;  //fetch email and password
    
    const admin = await AdminModel.findOne({  // hit the database and search for the one user
        email,
    })
    const matchedPassword = await bcrypt.compare(password , admin.password)
    if(matchedPassword){
        const token = jwt.sign({
            id : admin._id //_id field is unique in db for every user thus we are signing this
        },JWT_ADMIN_PASSWORD)
        
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

// to create a post we have to make sure that the admin is logged in .
adminRouter.post("/course" , adminMiddleware, async function(req,res){
    const admin_ID = req.adminID

    const {title , description , image_url , price} = req.body;

    const course = await CourseModel.create({
        title,
        description , 
        image_url , 
        price , 
        creatorID: admin_ID
    })
    res.json({
        msg: "Course created" ,
        courseID : course._id
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