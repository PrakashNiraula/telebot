var coinbase = require("coinbase-commerce-node");
const res = require("express/lib/response");
const verifytopup = require("./verifytopup");
var Charge = coinbase.resources.Charge;
var topup=require('./verifytopup');

let updatebalance = {};
let count = 0;

updatebalance.update = async (amount, chargeid, bot, callback_query) => {
  Charge.retrieve(chargeid, function (error, response) {
    
verifytopup.verify(amount,response,bot,callback_query);






    // count++;
    // let inline_keyboard = [];
    // let button = {};
    // let buttonwraper = [];
    // button.text = " Refresh ";
    // button.callback_data =
    //   "updatebalance:" + amount + ":" + chargeid + ":" + count;
    // buttonwraper.push(button);
    // inline_keyboard[inline_keyboard.length] = buttonwraper;
    // const opts = {
    //   chat_id: callback_query.message.chat.id,
    //   message_id: callback_query.message.message_id,
    //   reply_markup: {
    //     inline_keyboard: inline_keyboard,
    //   },
    // };

    // var message =
    //   "Payment created. Waiting for confirmation.\n Status: " +
    //   JSON.stringify(response.timeline[0]) +
    //   "\n Charge id:" +
    //   response.id +
    //   "\n URL: " +
    //   response.hosted_url +
    //   "\n Created at : " +
    //   response.created_at +
    //   "\n Expires at :" +
    //   response.expires_at +
    //   "\n Click on link above to pay. Once payment is completed press refresh button." +
    //   "\n Your payment status will be shown here. \n Once the payment is completed your product will be delivered immedietly. \n Please do not navigate away from here if you have completed the payment.";
    // bot.editMessageText(message, opts);
  });
};

module.exports = updatebalance;
