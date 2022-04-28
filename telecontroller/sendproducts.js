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


     var res=await product_controller.getProductsbycatnsubcat(catvalue,subcatvalue);
    //console.log(res);
    
     //console.log(result);
    let inline_keyboard=[];
    for(let i=0;i<res.length;i++){
        let button={};
        let buttonwraper=[];
        button.text=res[i].name+" Price: Usd "+res[i].price;
        button.callback_data="pid:"+res[i].id;
       // button.callback_data="cat_id="+myArray[1]+":subcat_id="+res[i].subcat_id;
        buttonwraper.push(button);
       inline_keyboard[i]=buttonwraper
     }
     const opts = {
        chat_id: msg.chat.id,
        message_id: msg.message_id,
        reply_markup: {
          inline_keyboard: inline_keyboard
        }
      };
      var message=" Products List ";
      bot.editMessageText(message, opts);


   



    

    
}

module.exports=reply;








