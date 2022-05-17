const { response } = require('express');
var topupController=require('../db/topup');
var userController=require('../db/usercontroller');
let verifytopup={};



verifytopup.verify=async (amount, charge, bot, callback_query)=>{

let userdetails=await userController.getuserbyNumber(callback_query.from.id);
 let res=await topupController.createtopup(userdetails[0].id,"Charge: "+charge.id+":"+"Amount:"+amount+":Oldbalance:"+userdetails[0].balance+":NewBalance:"+(parseFloat(userdetails[0].balance)+parseFloat(amount)))
 var finalres
 if(res){
   finalres =await  userController.addbalance(amount,userdetails[0].id)
   // count++;
    let inline_keyboard = [];
    let button = {};
    let buttonwraper = [];
    // button.text = " Go To Profile ";
    // button.callback_data =
    //   "gotoProfile:";
    // buttonwraper.push(button);
    inline_keyboard[inline_keyboard.length] = buttonwraper;
    const opts = {
      chat_id: callback_query.message.chat.id,
      message_id: callback_query.message.message_id,
      reply_markup: {
        inline_keyboard: inline_keyboard,
      },
    };

    var message =
      "Payment Successful \n New Balance:"+(parseFloat(userdetails[0].balance)+parseFloat(amount))+"\n Payment Id: "+charge.id;
    bot.editMessageText(message, opts);
 }

    





}


module.exports=verifytopup;