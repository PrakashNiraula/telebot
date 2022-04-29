var express = require('express');
var usercontroller=require('../db/usercontroller')
var router = express.Router();

/* GET users listing. */
router.post('/login', async function(req, res, next) {
const phone=req.body.phone;
const password=req.body.password;
try {
       
    //res.json(await db.getallcategories())  
    var res2=await usercontroller.loginUser(phone,password);
    if(res2.length==1){
        res.json("Login Successful")
    }else{
        res.json("Invalid Credentials")
    }




  
} catch (error) {
    next(error)
    
}

  
});

module.exports = router;
