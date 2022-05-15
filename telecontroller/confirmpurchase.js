//var usercontroller = require("../db/usercontroller");
//var productcontroller = require("../db/product_controller");
var client = require("../payment/coinbase");
var coinbase = require("coinbase-commerce-node");
const deliverproduct = require("./deliverproduct");
//const { response } = require("express");
//const res = require("express/lib/response");
//var request = require("request");


var Charge = coinbase.resources.Charge;

let buyproduct = {};
let count = 0;

buyproduct.confirmPayment = async (productid, chargeid, callbackQuery, bot) => {
  Charge.retrieve(chargeid, function (error, response) {
    count++;
    // if(response.payments.size=0){
     //  deliverproduct.deliver(productid,chargeid,callbackQuery,bot)
    //     return;
    // }


    console.log("retrieving charge");
    let inline_keyboard = [];
    let button = {};
    let buttonwraper = [];
    button.text = " Refresh ";
    button.callback_data =
      "payment:" + productid + ":" + chargeid + ":" + count;
    buttonwraper.push(button);
    inline_keyboard[inline_keyboard.length] = buttonwraper;

    const opts = {
      chat_id: callbackQuery.message.chat.id,
      message_id: callbackQuery.message.message_id,
      reply_markup: {
        inline_keyboard: inline_keyboard,
      },
    };
    var message =
      "Payment created. Waiting for confirmation.\n Status: " +
      JSON.stringify(response.timeline) +
      "\n Charge id:" +
      response.id +
      "\n URL: " +
      response.hosted_url +
      "\n Product id:" +
      productid +
      "\n Created at : " +
      response.created_at +
      "\n Expires at :" +
      response.expires_at+
      "\n Payment :"+JSON.stringify(response.payments)+
      "\n Click on link above to pay. Once payment is completed press refresh button."+
      "\n Your payment status will be shown here. \n Once the payment is completed your product will be delivered immedietly. \n Please do not navigate away from here if you have completed the payment.";
    count++;
    bot.editMessageText(message, opts);
  });
};



module.exports = buyproduct;
