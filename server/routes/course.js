const {Router} = require ("express");
const { userMiddleware } = require("../middleware/user");
const { PurchasesModel, CourseModel } = require("../db");

const courseRouter = Router();


//to buy a cours
courseRouter.post('/purchase',userMiddleware,async function(req,res){
    const userId = req.userID
    const courseId = req.body.courseID
    await PurchasesModel.create({
        userId, 
        courseId
    })
    //you wouuld expect the user to pay money here.
    res.json({
        msg:"Bought the course"
    })
})
//to view all courses
courseRouter.get('/preview', async function(req,res){
    const courses = await CourseModel.find({})
    res.json({
        courses
    })
})


module.exports = {
    courseRouter: courseRouter 
}