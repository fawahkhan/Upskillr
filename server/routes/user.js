const express = require ("express")

const app = express()

function createCourseRoutes(app){
    //to buy a cours
    app.post('/course/purchase', function(req,res){
        //you wouuld expect the user to pay money here.
        res.json({
            msg:"Bought the course"
        })
    })
    //to view all courses
    app.get('/course/preview', function(req,res){
        res.json({
            courses
        })
    })
}

module.exports = {
    createCourseRoutes: createCourseRoutes
}