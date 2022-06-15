var usercontroller = require("../db/usercontroller");
var productcontroller = require("../db/product_controller");
var client = require("../payment/coinbase");
var coinbase = require("coinbase-commerce-node");
const { response } = require("express");
var deliverproduct=require("./deliverproduct");
const { DATE } = require("mysql/lib/protocol/constants/types");



let purchaseproduct={};



purchaseproduct.purchase=async (productid, bot, callback_query)=>{
    console.log(callback_query.from.id);


    
     var result = await usercontroller.getuserbyNumber(callback_query.from.id);
     var result2 = await productcontroller.getProductsbyId(productid);
    var data = callback_query.data;
    var myarray = data.split(":");
     console.log(result);
 console.log(result2);

   if(result[0].balance>=result2[0].id){
       //delivering product
       var decreaseBalance=await usercontroller.decreaseBalance(result2[0].price,result[0].id);
     if(decreaseBalance.affectedRows==1){
      const d = new Date();
        deliverproduct.deliver(productid,"Payment Using Wallet on date:"+d.getFullYear()+"-"+(parseInt(d.getMonth())+1)+"-"+d.getDate(),callback_query,bot);
     }
       
       
   }else{

    let inline_keyboard = [];
    let button = {};
    let buttonwraper = [];

    button.text = "Go To Home";
    button.callback_data = "gotoHome";
     buttonwraper.push(button);
    inline_keyboard[inline_keyboard.length] = buttonwraper;

    const opts = {
        chat_id: callback_query.message.chat.id,
        message_id: callback_query.message.message_id,
        reply_markup: {
          inline_keyboard: inline_keyboard,
        },
      };
      var message = " You dont have enough balance to purchase this product.\n"+
      "You can go to profile ->Load Balance to load your balance.\n"+
      " You can pay using Coinbase or contact MasterOvServices for manual payment.";
    bot.editMessageText(message, opts);



   }


}
 module.exports=purchaseproduct;