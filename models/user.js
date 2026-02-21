const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({

    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
},{timestamps:true})

let userModel=mongoose.model("User",userSchema);
module.exports=userModel