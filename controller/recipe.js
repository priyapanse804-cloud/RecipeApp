const connectDB = require("../config/db")
const recipeModel=require("../models/recipe")
const multer  = require('multer')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
     cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage })


const getRecipes=async(req,res)=>{
    try {
        const recipe=await recipeModel.find()
        return res.status(200).json({
            message:"All Recipes",
            recipe:recipe
        })
    } catch (error) {
       return res.status(500).json({
        message:"Internal server error"
       }) 
    }
}

const getRecipe=async(req,res)=>{
    try {
        const recipe=await  recipeModel.findById(req.params.id)
        return res.status(200).json({
            message:"Recipe",
             recipe: recipe
        })
    } catch (error) {
        return res.status(500).json({
            message:"Inatrnal server error"
        })
    }
}

const addRecipe=async(req,res)=>{
   console.log("USER:", req.user);
console.log("FILE:", req.file);
console.log("BODY:", req.body);
    
    try {
           const {title,ingredients,instruction, time}=req.body;

    if(!title || !ingredients || !instruction || ! time)
        return res.status(422).json({
        
        })

        const newRecipe=await  recipeModel.create({
            title,ingredients,instruction, time,coverImage:req.file.filename, 
            createdBy: req.user.id 
        })

        return res.status(200).json({
            message:"recipe add successfully",
            newRecipe:newRecipe
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            message:"Intrnal server error"
        })
    }
 
}

const editRecipe = async (req, res) => {
  try {
    const { title, ingredients, instruction, time } = req.body;

    if (!req.body) {
      return res.status(400).json({ message: "Body is missing" });
    }

    // Pehle existing recipe le lo
    const recipe = await recipeModel.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Agar new image hai use karo, nahi toh purani image rakho
    const updatedData = {
      title: title || recipe.title,
      ingredients: ingredients || recipe.ingredients,
      instruction: instruction || recipe.instruction,
      time: time || recipe.time,
      coverImage: req.file ? req.file.filename : recipe.coverImage, // ✅ safe
    };

    const updatedRecipe = await recipeModel.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    return res.status(200).json({
      message: "Recipe Updated Successfully",
      recipe: updatedRecipe,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteRecipe=async(req,res)=>{
    try {
        
      

        let deleteRecipe=await recipeModel.findByIdAndDelete(req.params.id);
         return res.status(200).json({
      message: "Recipe deleted Successfully",
      deleteRecipe:deleteRecipe
    });

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            message:"Inatrnal server error"
        })
    }
}
module.exports={
    getRecipes,
    getRecipe,
    addRecipe,
    editRecipe,
    deleteRecipe,
    upload

}