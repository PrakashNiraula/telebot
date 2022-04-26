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
        res.json(await db.createsubCategory(req.body.catid,req.body.subcatname));
    } catch (error) {
        next(error)
        
    }

})


router.route('/:subcatid')

.delete(async (req,res,next)=>{
    try {
        res.json(await db.deletesubCategory(req.params.subcatid))
        
    } catch (error) {
        res.json(error)
        
    }
    
})


module.exports=router;