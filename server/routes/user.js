const {Router} = require ("express")

const userRouter = Router();


userRouter.post('/user/signup', function(req,res){
    const name = req.body.name ;
    const password = req.body.password ;
    const email = req.body.email ;
    res.json({
        msg: "Signed up"
    })
})
userRouter.post('/user/signin', function(req,res){
    res.json({
        msg:"User login"
    })
})
userRouter.get('/user/purchases', function(req,res){
    res.json({
        PurchasedCourses
    })
})


module.exports= {
    userRouter: userRouter
}