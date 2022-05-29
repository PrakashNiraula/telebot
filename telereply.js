const TelegramBot = require("node-telegram-bot-api");
//5342231228:AAH3bg9l3lR_28HHm0qgHoYsZCa21kdV5L0
const token = "5312045191:AAFdXMntO3bIdLhpygmWKESzbp5MlRn2DJo";
const bot = new TelegramBot(token, { polling: true });
var sendcat = require("./telecontroller/sendcategories");
var sendsubcat = require("./telecontroller/sendsubcategories");
var buyproduct = require("./telecontroller/buyproduct");
var confirmPayment = require("./telecontroller/confirmpurchase");
var loadbalance = require("./telecontroller/loadbalance");
var usercontroller = require("./db/usercontroller");
var userProfile = require("./telecontroller/userprofile");
var confirmbalance = require("./telecontroller/confirmbalance");
var termsandconditions = require("./telecontroller/termsandconditions");
var updatebalance = require("./telecontroller/updatebalance");
const purchaseproduct = require("./telecontroller/purchaseproduct");

console.log("Starting.....");

bot.on("message", async (msg) => {
  //check incomming and add user to db if needed
  console.log(msg);

  var res = await usercontroller.getuserbyNumber(msg.from.id);
  if (res.length == 1) {
    showmenu(bot, msg);
  } else {
    var res2 = await usercontroller.createuser(
      msg.from.id,
      msg.from.first_name
    );
    if (res2) {
      showmenu(bot, msg);
    }
  }
});

showmenu = async (bot, msg) => {
  const chatId = msg.chat.id;
  if (msg.text == "🏡 Home 🏡") {
    sendcat.sendhome(bot, msg);
    return;
  } else if (msg.text == "🧑‍🎤 Profile 🧑‍🎤") {
    userProfile.getProfie(bot, msg);
    return;
  } else if (msg.text == "📝 Terms and conditions 📝") {
    termsandconditions.sendterms(bot, msg);
    return;
  }

  const opts = {
    reply_markup: JSON.stringify({
      keyboard: [
        ["🏡 Home 🏡", "🧑‍🎤 Profile 🧑‍🎤"],
        ["📝 Terms and conditions 📝"],
      ],
    }),
  };

  bot.sendMessage(msg.chat.id, "Hello", opts);
};

bot.on("callback_query", function onCallbackQuery(callbackQuery) {
  console.log(callbackQuery);
  const msg = callbackQuery.message;
  let data = callbackQuery.data;
  const myArray = data.split(":");
  if (myArray[0] == "gotoProfile") {
    userProfile.getProfie(bot, callbackQuery.message);
  }
  if (myArray[0] == "updatebalance") {
    updatebalance.update(myArray[1], myArray[2], bot, callbackQuery);
  }
  if (myArray[0] == "load") {
    confirmbalance.confirm(callbackQuery.message, bot, myArray[1]);
  }
  if (myArray[0] == "loadmoney") {
    loadbalance.loadMenu(callbackQuery.message, bot);
  }
  if (myArray[0] == "confirmwallet") {
   
    //update pay only using wallet
    purchaseproduct.purchase(myArray[2], bot, callbackQuery);
  }
  if (myArray[0] == "gotoHome") {
    sendcat.sendhome(bot, callbackQuery.message);
  }
  if(myArray[0] == "confirmcoinbase"){
    console.log("confirming coinbase")

    buyproduct.buy(msg.from.id, myArray[2], bot, callbackQuery);
   }
  if (myArray[0] == "payment") {
    confirmPayment.confirmPayment(myArray[1], myArray[2], callbackQuery, bot);
  }
  if (myArray[0] == "pid") {
    // console.log("product selected");
    // return;
    console.log("Product id: " + myArray[1]);

    let inline_keyboard = [];
    let button = {};
    let buttonwraper = [];

    button.text = "Confirm Using Coinbase";
    button.callback_data = "confirmcoinbase:" + "Product id: " + myArray[1];
    buttonwraper.push(button);
    inline_keyboard[inline_keyboard.length] = buttonwraper;

     button = {};
     buttonwraper = [];

  button.text = "Confirm Pay From Wallet";
    button.callback_data = "confirmwallet:" + "Product id: " + myArray[1];
     buttonwraper.push(button);
    inline_keyboard[inline_keyboard.length] = buttonwraper;


    const opts = {
      chat_id: msg.chat.id,
      message_id: msg.message_id,
      reply_markup: {
        inline_keyboard: inline_keyboard,
      },
    };
    var message = " Do you want to confirm this purchase??"+ " Product id: " + myArray[1];
    bot.editMessageText(message, opts);
  }
 

  
  sendsubcat.sendsubcategories(callbackQuery, bot);
});
module.exports = bot;
