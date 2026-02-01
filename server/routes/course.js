const {Router} = require ("express")

const courseRouter = Router();


//to buy a cours
courseRouter.post('/course/purchase', function(req,res){
    //you wouuld expect the user to pay money here.
    res.json({
        msg:"Bought the course"
    })
})
//to view all courses
courseRouter.get('/course/preview', function(req,res){
    res.json({
        courses
    })
})


module.exports = {
    courseRouter: courseRouter 
}