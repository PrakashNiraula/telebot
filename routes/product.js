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

.post(async(req,res,next)=>{
    try {
        console.log(req);
        const res2=await product_controller.createProduct(req.body.cat_id,req.body.subcat_id,req.body.name,req.body.details,req.body.price);
       res.json(res2);
    } catch (error) {
        next(error)
        
    }


})

router.route("/:pid")
.get(async (req,res,next)=>{
    try {
       
        const res2=await product_controller.getProductsbyId(req.params.pid);
       res.json(res2);
    } catch (error) {
        next(error)
        
    }

})


.delete(async (req,res,next)=>{
    try {
       
        const res2=await product_controller.deleteProductsByid(req.params.pid);
       res.json(res2);
    } catch (error) {
        next(error)
        
    }

})


router.route("/:cat_id/:subcat_id")
.get(async(req,res,next)=>{
    try {
        const res2=await product_controller.getProductsbycatnsubcat(req.params.cat_id,req.params.subcat_id);
       res.json(res2);
    } catch (error) {
        next(error)
        
    }


})






module.exports=router;