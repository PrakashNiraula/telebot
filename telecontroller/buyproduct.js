var usercontroller = require("../db/usercontroller");
var productcontroller = require("../db/product_controller");
var client = require("../payment/coinbase");
var coinbase = require("coinbase-commerce-node");
const { response } = require("express");
const res = require("express/lib/response");
var Charge = coinbase.resources.Charge;

let buyproduct = {};

buyproduct.buy = async (number, productid, bot, callback_query) => {
  var result = await usercontroller.getuserbyNumber(number);
  var result2 = await productcontroller.getProductsbyId(productid);
  var data = callback_query.data;
  var myarray = data.split(":");
  console.log(result2[0].price);
  if (myarray[0] == "confirm") {
    console.log("Showing address to pay");

    var firstChargeObj = new Charge({
      description: result2.name,
      metadata: {
        customer_id: result.number,
        customer_name: result.first_name,
      },
      local_price: {
        amount: result2[0].price,
        currency: "USD",
      },

      name: result2.name,
      payments: [],
      pricing_type: "fixed_price",
    });

    firstChargeObj.save(async (error, response) => {
      let inline_keyboard = [];
      let button = {};
      let buttonwraper = [];
      button.text = " Pay ";
      button.url = response.hosted_url;
      button.callback_data = "payment";
      buttonwraper.push(button);
      inline_keyboard[inline_keyboard.length] = buttonwraper;
      button = {};
      buttonwraper = [];
      button.text = " Refresh ";
      //button.url=response.hosted_url;
      button.callback_data = "payment:" + productid + ":" + response.id;
      buttonwraper.push(button);
      inline_keyboard[inline_keyboard.length] = buttonwraper;

      const opts = {
        chat_id: callback_query.message.chat.id,
        message_id: callback_query.message.message_id,
        reply_markup: {
          inline_keyboard: inline_keyboard,
        },
      };
      var message =
        " Please click on Pay button to pay.\n You may close the page after the successful payment but do not navigare away from here.\n Press Refresh Button to confirm your payment once your payment is successful. \n";
      bot.editMessageText(message, opts);
    });
  }
};
module.exports = buyproduct;
