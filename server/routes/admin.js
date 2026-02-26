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
        const {email, password, firstName, lastName} = req.body   //adding zod validation is left 
        // hash the password using bcrypt so that plain password is not stored in he db
        const hashedPassword = await bcrypt.hash(password, 5) 
        
        //store in db
        await AdminModel.create({
            email: email,
            password: hashedPassword,//rather than storing the password directly here we will be storingg the hashed password created by bcrypt.
            firstName: firstName,
            lastName: lastName
        })

        const savedAdmin = await AdminModel.findOne({ email })
        const token = jwt.sign({ id: savedAdmin._id }, JWT_ADMIN_PASSWORD)

        res.json({
            msg: "Admin signed up",
            token,
            admin: { _id: savedAdmin._id, email: savedAdmin.email, firstName: savedAdmin.firstName, lastName: savedAdmin.lastName }
        })
    } catch(e) {
        res.status(500).json({
            msg: "ERROR while signup"
        })
    }
})

adminRouter.post("/signin", async function(req,res){
    const { email, password } = req.body;//fetch email and password from the body

    const admin = await AdminModel.findOne({ email })// hit the database and search for the one user with the email provided in the body
    const matchedPassword = await bcrypt.compare(password, admin.password)
    if (matchedPassword) {
        const token = jwt.sign({
            id: admin._id //_id field is unique in db for every user thus we are signing this
        }, JWT_ADMIN_PASSWORD)
        //for token based authhentication , if cookie based auth then do cookie logic here
        res.json({
            token,
            admin: { _id: admin._id, email: admin.email, firstName: admin.firstName, lastName: admin.lastName }
        })
    } else {
        res.status(403).json({
            msg: "Incorrect credentials"
        })
    }
})

// to create a post we have to make sure that the admin is logged in .
adminRouter.post("/course" , adminMiddleware, async function(req,res){
    const admin_ID = req.adminID

    const {title, description, image_url, price} = req.body;

    const course = await CourseModel.create({
        title,
        description,
        image_url,
        price,
        creatorId: admin_ID
    })
    res.json({
        msg: "Course created",
        courseID: course._id
    })
})

adminRouter.put("/course", adminMiddleware, async function(req,res){
    const admin_ID = req.adminID

    //updateOne accepts filters , updates and options as parameters 
    const {title, description, image_url, price, courseID} = req.body;
    const course = await CourseModel.updateOne({
        //filters - which row do you want to change, what course id?
        _id: courseID,
        creatorId: admin_ID //whi course update rna jisme both id and creator id belongs to the same person.
    }, {
        title,
        description,
        image_url,
        price
    })
    res.json({
        msg: "Course updated",
        courseID
    })
})

adminRouter.get("/course/bulk", adminMiddleware, async function(req,res){
    const admin_ID = req.adminID
    const courses = await CourseModel.find({
        creatorId: admin_ID
    })
    res.json({
        msg: "These are all the courses",
        courses
    })
})

module.exports = {
    adminRouter: adminRouter
}
