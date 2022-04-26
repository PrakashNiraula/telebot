const express=require('express');
const res = require('express/lib/response');
const router=express.Router();
const category_controller=require('../db/category_controller')


router.get("/",async(req,res,next)=>{

    try {
       
        //res.json(await db.getallcategories())  
        const res2=await category_controller.getallcategories();
       res.json(res2);
    } catch (error) {
        next(error)
        
    }
})

// router.post("/",async(req,res,next)=>{

//     try {
      
//         const res2=await category_controller.createcategory(req.body.name);
//        res.json(res2);
//     } catch (error) {
//         next(error)
        
//     }
// })

// router.delete("/",async(req,res,next)=>{

//     try {
      
//         const res2=await db.createcategory(req.body.name);
//        res.json(res2);
//     } catch (error) {
//         next(error)
        
//     }
// })
router.get("/:catid",async(req,res,next)=>{

    try {
      
        const res2=await category_controller.getcategoryByid(req.params.catid);
       res.json(res2);
    } catch (error) {
        next(error)
        
    }
})

// router.put("/category/:catid",async(req,res,next)=>{

//     try {
      
//         const res2=await db.getcategoryByid(req.params.catid);
//        res.json(res2);
//     } catch (error) {
//         next(error)
        
//     }
// })

// router.delete("/category/:catid",async(req,res,next)=>{

//     try {
      
//         const res2=await db.deletecategoryByid(req.params.catid);
//        res.json(res2);
//     } catch (error) {
//         next(error)
        
//     }
// })







module.exports=router;



