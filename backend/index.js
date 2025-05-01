const connectDB=require('./connection/connectDB');
const express = require('express');
const cors = require('cors');
const app = express();
const todoModel=require('./models/TodoItem.model.js');

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/createtodo',async(req,res)=>{
    const {title}=req.body;
    const todo=new todoModel({
        title: title,
        status: 'pending'
    })
    await todo.save();
    console.log(todo);
    res.json({message:"Todo Created"});
})

app.get('/gettodos',async(req,res)=>{
    const todos=await todoModel.find({});
    console.log(todos);
    res.json({todos});
})

app.delete('/deletetodo/:id',async(req,res)=>{
    const {id}=req.params;
    try{
        await todoModel.findByIdAndDelete(id);
        res.status(200).json({message:"Todo Deleted"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Error deleting todo"});
    }
})

app.patch('/updatetodo/:id',async(req,res)=>{
    const {id}=req.params;
    const {title,status}=req.body;
    try{
        await todoModel.findByIdAndUpdate(id,{title,status});
        res.status(200).json({message:"Todo Updated"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Error updating todo"});
    }
})
app.put('/completetodo/:id',async(req,res)=>{
    const {id}=req.params;
    const {status}=req.body;
    try{
        await todoModel.findByIdAndUpdate(id,{status:status});
        res.status(200).json({message:"Todo Completed"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Error completing todo"});
    }
})

app.get("/",(req,res)=>{
    res.json({message:"Welcome to the Todo API"});
})

app.listen(process.env.PORT,()=>{
    console.log("Server is running on port",process.env.PORT);
})