const {Router} = require ("express")

const adminRouter = Router()

adminRouter.post("/signup" , function(req,res){
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