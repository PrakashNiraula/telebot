var express=require('express');
var Router=express.Router();
var db=require('../db/order_controller')



Router.route("/")
.get(async(req,res,next)=>{
    try{
        res.json(await db.getallorders())

    }catch(Error){
        next(error)
    }
})

Router.route("/salestoday")
.get(async(req,res,next)=>{
    try{
        const d = new Date();
        res.json(await db.salestoday(d.getFullYear()+"-"+(parseInt(d.getMonth())+1)+"-"+d.getDate()))

    }catch(Error){
        next(error)
    }
})


Router.route("/:date")
.get(async(req,res,next)=>{
    try{
        res.json(await db.getallordersbydate(req.params.date))

    }catch(Error){
        next(Error)
    }

})



Router.route("/:orderid")
.get(async(req,res,next)=>{

    try{
        res.json(await db.getorderbyid(req.params.orderid))

    }catch(Error){
        next(error)
    }



})


.put(async(req,res,next)=>{

})


.delete(async(req,res,next)=>{

})



module.exports=Router;