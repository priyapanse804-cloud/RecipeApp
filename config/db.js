const mongoose=require("mongoose");

const connectDB=async()=>{
    try {
        
    let res=await mongoose.connect(process.env.MONGO_URI)
    
    if(res){
        console.log("MongoDb Connected");
        
    }

} catch (error) {
        console.log("error in ConnectDB",error);
        
    }
}

module.exports=connectDB