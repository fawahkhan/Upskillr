const mongoose = require ("mongoose")
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId ;


const User = new Schema({
    email:{type:String, unique:true}  ,//this will ensure two entries with the same email doesnt hit the server.
    password: String,
    firstName: String,
    lastName: String    
})
const Admin = new Schema({
    email :{type:String, unique:true},
    password: String,
    firstName: String,
    lastName: String    
})
const Course = new Schema({
    title: String ,
    description: String,
    price: String,
    image_url : String,
    creatorId : ObjectId    
})
const Purchases = new Schema({
    courseId: ObjectId ,
    userId: ObjectId,   
})

const UserModel = mongoose.model("users" , User )
const AdminModel = mongoose.model("admins" , Admin )
const CourseModel = mongoose.model("courses" , Course )
const PurchasesModel = mongoose.model("Purchases" , Purchases )

module.exports = {
    UserModel,
    AdminModel,
    CourseModel,
    PurchasesModel,
}
