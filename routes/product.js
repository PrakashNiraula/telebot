const product_controller=require('../db/product_controller');
const express=require('express');
var router=express.Router();



router.route('/')
.get(async (req,res,next)=>{
    try {
       
        //res.json(await db.getallcategories())  
        const res2=await product_controller.getallProducts();
       res.json(res2);
    } catch (error) {
        next(error)
        
    }

})






module.exports=router;