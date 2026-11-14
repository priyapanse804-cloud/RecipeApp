const jwt=require("jsonwebtoken")

const verifyToken = async(req, res, next) => {
  let token = req.headers["authorization"];
if (!token) {
  
  
    return res.status(400).json({
      message: "Token Missing"
    });
  }

  // Remove "Bearer "
  token = token.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(400).json({
        message: "Invalid Token"
      });
    }

    req.user = decoded;
    next(); // ✅ Sirf yaha hona chahiye
  });
};


 module.exports=verifyToken