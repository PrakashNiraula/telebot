var expres=require('express');
var Router=expres.Router();
const jwt=require('jsonwebtoken');

Router.route('/')
.post(async(req,res,next)=>{
  //   var token=;
    // console.log(token);

    let token=req.body.token.split(' ')[1];
   jwt.verify(token,"secretkey",(err,payload)=>{
   // console.log(payload);
   // console.log(err);



       if(err){
           return  res.json("tokenValidity=false")
       }
       res.json("tokenValidity=true")
   })

})


module.exports=Router;