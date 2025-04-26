const mongoose=require("mongoose");
require('dotenv').config()

let connectDB=async ()=>{
    
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB")
    }
    catch(err){
        console.log("Error connecting to MongoDB",err);
        exit(1);
    }
}

module.exports=connectDB;