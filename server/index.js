require('dotenv').config()
const express = require("express") ;
const cors = require("cors");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const mongoose = require('mongoose');
const app = express()

// Enable CORS for frontend
app.use(cors({
    origin: ['https://upskillr-kappa.vercel.app'],
    credentials: true
}));

app.use(express.json()) 

app.use("/api/v1/user", userRouter)
app.use("/api/v1/course", courseRouter)
app.use("/api/v1/admin" , adminRouter)
async function main(){
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(3000)
    console.log("listening on port 3000")
}
main()