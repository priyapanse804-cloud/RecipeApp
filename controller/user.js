const userModel=require("../models/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


const userSignUp=async(req,res)=>{
 try {
    const {email,password}=req.body;

 if(!email || !password){
    return res.status(422).json({
        message:"All fields are required"
    })
 }
 let user=await userModel.findOne({email})
 if(user){
    return res.status(400).json({
        message:"Email is Already exist"
    })

 }

 const hashPass=await bcrypt.hash(password,10)
 const newUser=await userModel.create({
    email,
    password:hashPass
 })

 let token=jwt.sign({email,id:newUser._id},process.env.JWT_SECRET,{
    expiresIn:"1h"
 })

 return res.status(200).json({
    token,
   user: newUser 
 })

 } catch (error) {
    return res.status(500).json({
        message:"Intrnal server error",
        
    })
 }
 
}

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(422).json({
        message: "All fields are required"
      });
    }

    const user = await userModel.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      token,
      user
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};



const getUser=async(req,res)=>{
    try {
        const user=await userModel.findById(req.params.id)

        res.json({email:user.email})
    }  catch (error) {
        console.log(error);
        
    return res.status(500).json({
        message:"Intrnal server error",
        
    })
 }
}


module.exports={
userSignUp,
userLogin,
getUser
}