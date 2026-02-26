const bcrypt = require("bcrypt")
const {Router} = require ("express")
const jwt = require ("jsonwebtoken")
const { JWT_USER_PASSWORD } = require ("../config") //for signing users , admin passwords would be signed by their own passwords which is different

const userRouter = Router();
const {UserModel, PurchasesModel, CourseModel} = require('../db'); 
const { userMiddleware } = require("../middleware/user");

userRouter.post('/signup', async function(req,res){
    try {
        const {email, password, firstName, lastName} = req.body
        const hashedPassword = await bcrypt.hash(password, 5)

        await UserModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })

        const savedUser = await UserModel.findOne({ email })
        const token = jwt.sign({ id: savedUser._id }, JWT_USER_PASSWORD)

        res.json({
            msg: "User Signed up successfully",
            token,
            user: { _id: savedUser._id, email: savedUser.email, firstName: savedUser.firstName, lastName: savedUser.lastName }
        })
    } catch(e) {
        res.status(500).json({
            msg: "ERROR while signup"
        })
    }
})

userRouter.post('/signin', async function(req,res){
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email })
    const passwordMatch = await bcrypt.compare(password, user.password) //compare the password sent in the body with the hashed password stored in the db using bcrypt compare function which returns a boolean value
    if (passwordMatch) {
        const token = jwt.sign({
            id: user._id
        }, JWT_USER_PASSWORD)

        res.json({
            token,
            user: { _id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName }
        })
    } else {
        res.status(403).json({
            msg: "Incorrect credentials"
        })
    }
})

userRouter.get('/purchases', userMiddleware, async function(req,res){
    const userId = req.userID
    const PurchasedCourses = await PurchasesModel.find({ userId })
    const courseData = await CourseModel.find({
        _id: { $in: PurchasedCourses.map(x => x.courseId) }
    })
    res.json({
        PurchasedCourses,
        courseData
    })
})

module.exports = {
    userRouter: userRouter
}
