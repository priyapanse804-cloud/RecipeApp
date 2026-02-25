const dotenv=require("dotenv").config()
const express=require("express");
const connectDB=require("./config/db")
const cors=require("cors")
  
const app=express();
connectDB()
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://recipe-frontend-brown.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use( express.json())
app.use(express.static("public"))

app.use("/",require("./routes/user"))
const PORT=process.env.PORT || 3000

app.get("/",(req,res)=>{
    res.send("hello")
})
app.use('/recipe',require("./routes/recipe"))
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    
})