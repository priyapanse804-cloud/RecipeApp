const mongoose=require("mongoose");

const connectDB=async()=>{
    try {
        
    let res=await mongoose.connect("mongodb+srv://admin:shopping123@cluster0.qmguru9.mongodb.net/test")
    
    if(res){
        console.log("MongoDb Connected");
        
    }

} catch (error) {
        console.log("error in ConnectDB",error);
        
    }
}

module.exports=connectDB