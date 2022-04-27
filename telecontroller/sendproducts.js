var pool=require('../db/index')
var product_controller=require('../db/product_controller')
let reply={};



reply.fetchProducts=async (bot,callbackQuery)=>{
    const msg = callbackQuery.message;
    let cat_id=callbackQuery.data;
   
    const myArray = cat_id.split(":");
    const catarray=myArray[0].split("=")
    const subcatarray=myArray[1].split("=")

    var catvalue=catarray[1];
    var subcatvalue=subcatarray[1];


    var result=await product_controller.getProductsbyId();

   



    

    
}

module.exports=reply;








