const express=require('express');
const db = require('../db/subcategory_controller');
var router=express.Router();



router.route('/')
.get(async(req,res,next)=>{
   try {
      res.json(await db.getallsubcategories());  
   } catch (error) {
       next(error)
   }
})

.post(async (req,res,next)=>{
    try {
        res.json(await db.createsubCategory(req.body.cat_id,req.body.name));
    } catch (error) {
        next(error)
        
    }

})


router.route('/:subcat_id')

.delete(async (req,res,next)=>{
    try {
        res.json(await db.deletesubCategory(req.params.subcat_id))
        
    } catch (error) {
        res.json(error)
        
    }
    
})


module.exports=router;