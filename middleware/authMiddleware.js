const jwt = require("jsonwebtoken");
const Users = require("../models/Users");


module.exports = {
    authRequire:async(req,res,next)=>{
        try{

            const token = req.header('Authorization');
            if(!token) return res.status(401).json("Token's required");
            jwt.verify(token,process.env.SECRET_KEY,(err,decode)=>{
               if(err) return res.status(401).json("Token's invalid");
                next()
            });
        }catch(e){
            console.log(e);
        }
    },
   isAdmin:(req,res,next)=>{
    const token = req.header('Authorization');
    jwt.verify(token,process.env.SECRET_KEY,async(err,decode)=>{
        if(err) return res.status(401).json("Token's invalid");
         const user = await Users.findOne({_id:decode.id})
         if(user.roles !== "admin") return res.status(401).json("This route's accessible for only admin");
         next() 
     });
   }
}