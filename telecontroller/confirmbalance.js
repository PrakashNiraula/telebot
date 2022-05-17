var coinbase = require("coinbase-commerce-node");
const res = require("express/lib/response");
var Charge = coinbase.resources.Charge;

let confirmbalance = {};

let count = 0;
confirmbalance.confirm = async (msg, bot, amount) => {
  // console.log("Printing msg")
  // console.log(msg);

  var firstChargeObj = new Charge({
    description: "Load on telegram marketplace",
    metadata: {
      customer_id: msg.id,
      customer_name: msg.from.first_name,
    },
    local_price: {
      amount: amount,
      currency: "USD",
    },

    name: "Load on telegram marketplace",
    payments: [],
    pricing_type: "fixed_price",
  });

  firstChargeObj.save(async (error, response) => {
    let inline_keyboard = [];
    let button = {};
    let buttonwraper = [];
    button.text = " Refresh ";
    button.callback_data = "updatebalance:" + amount + ":" + response.id;
    buttonwraper.push(button);
    inline_keyboard[inline_keyboard.length] = buttonwraper;

    const opts = {
      chat_id: msg.chat.id,
      message_id: msg.message_id,
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
      "\n Created at : " +
      response.created_at +
      "\n Expires at :" +
      response.expires_at +
      "\n Click on link above to pay. Once payment is completed press refresh button." +
      "\n Your payment status will be shown here. \n Once the payment is completed your balance will be updated instantly. \n Please do not navigate away from here if you have completed the payment.";
    count++;
    bot.editMessageText(message, opts);
  });
};

module.exports = confirmbalance;
