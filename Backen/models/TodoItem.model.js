const mongoose=require("mongoose");

const TodoItemSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:['completed','pending'],
        default:'pending',
    }
},{timestamps:true});

const TodoItem=mongoose.model('TodoItem',TodoItemSchema)
module.exports=TodoItem