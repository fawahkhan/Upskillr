const {Router} = require ("express")

const courseRouter = Router();


//to buy a cours
courseRouter.post('/purchase', function(req,res){
    //you wouuld expect the user to pay money here.
    res.json({
        msg:"Bought the course"
    })
})
//to view all courses
courseRouter.get('/preview', function(req,res){
    res.json({
        courses
    })
})


module.exports = {
    courseRouter: courseRouter 
}