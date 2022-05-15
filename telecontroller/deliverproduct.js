var coinbase = require("coinbase-commerce-node");
var productController = require("../db/product_controller");
var userController = require("../db/usercontroller");

var Charge = coinbase.resources.Charge;

let deliverproduct = {};

deliverproduct.deliver = async (productid, chargeid, callbackQuery, bot) => {

  
  var userres=await userController.getuserbyNumber(callbackQuery.message.from.id)
  var productres=await productController.makesales(productid,chargeid,userres[0].id);
 var product=await productController.getProductsbyId(productid);

 let inline_keyboard = [];
    let button = {};
    let buttonwraper = [];
    button.text = "Go To Home ";
    button.callback_data = "gotoHome:";
    buttonwraper.push(button);
    inline_keyboard[inline_keyboard.length] = buttonwraper;

    const opts = {
      chat_id: callbackQuery.message.chat.id,
      message_id: callbackQuery.message.message_id,
      reply_markup: {
        inline_keyboard: inline_keyboard,
      },
    };
    var message;
    if(product[0].is_instant==1){
    message ="You have successfully purchased the product.\n Your product: \n"+"Product name:"+product[0].name+"\n Product Description:\n"+product[0].details;
    }else{
        message ="You have successfully purchased the product.\n Your product is not insant. \n You have created your order. \n MasterOvService will dm you once your order is ready to deliver. \n";
    }
    

       bot.editMessageText(message, opts);


};

module.exports = deliverproduct;
