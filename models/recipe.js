const mongoose=require("mongoose");

const recipeSchema=new mongoose.Schema({

    title:{
        type:String,
        require:true,
    },
    ingredients:{
       type:[String],
        require:true,
    },
    instruction:{
        type:String,
        require:true,
    },
    time:{
        type:String,
        require:true,
    },
    coverImage:{
        type:String,
        require:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})


const recipeModel=mongoose.model("recipe",recipeSchema)
module.exports= recipeModel