var usercontroller = require("../db/usercontroller");
var productcontroller = require("../db/product_controller");
var client = require("../payment/coinbase");
var coinbase = require("coinbase-commerce-node");
const { response } = require("express");
const res = require("express/lib/response");
var request = require("request");

var Charge = coinbase.resources.Charge;

let buyproduct = {};
let count = 0;

buyproduct.confirmPayment = async (productid, chargeid, callbackQuery, bot) => {
  Charge.retrieve(chargeid, function (error, response) {
    count++;
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

// var options = {
//   method: "GET",
//   url: "https://api.commerce.coinbase.com/charges/"+"976b3811-bba8-4d45-b053-9583c473bfca",
//   headers: {
//     "X-CC-Api-Key": "c60f1422-085c-4370-afbe-5cc184152b46",
//   }
// }

// request(options, function (error, res) {
//     if (error) throw new Error(error);
//     var response=JSON.stringify(res.body)

//      let inline_keyboard = [];
//   let button = {};
//   let buttonwraper = [];
//   button.text = " Refresh ";
//   button.callback_data = "payment:" + productid + ":" + chargeid+":"+count;
//   buttonwraper.push(button);
//   inline_keyboard[inline_keyboard.length] = buttonwraper;

//     const opts = {
//     chat_id: callbackQuery.message.chat.id,
//     message_id: callbackQuery.message.message_id,
//     reply_markup: {
//       inline_keyboard: inline_keyboard
//     }
//   };
//      var message ="Displaying status of payment"+"Refresh Count: ";
// //     "Payment created. Waiting for confirmation.\n Status: " +
// //     response.timeline[0].status +
// //     "\n Charge id:" +
// //     response.id +
// //     "\n URL: " +
// //     response.hosted_url +
// //     "\n Product id:" +
// //     productid +
// //     "\n Created at : " +
// //     response.created_at +
// //     "\n Expires at :" +
// //     response.expires_at;

//      count++;
//    bot.editMessageText(message, opts);

//       });

// };

module.exports = buyproduct;
