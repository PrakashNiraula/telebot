const TelegramBot = require("node-telegram-bot-api");
const token = "5342231228:AAH3bg9l3lR_28HHm0qgHoYsZCa21kdV5L0";
//5342231228:AAHYB9aYGkfwfMnuOOWpAS048JZ5hkgEdKY
const bot = new TelegramBot(token, { polling: true });
var sendcat = require("./telecontroller/sendcategories");
var sendsubcat = require("./telecontroller/sendsubcategories");
var buyproduct=require('./telecontroller/buyproduct')
console.log("Starting.....");

bot.on("message", async (msg) => {
  console.log(msg);
  const chatId = msg.chat.id;
  if (msg.text == "🏡 Home 🏡") {
    sendcat.sendhome(bot, msg);
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
});

bot.on("callback_query", function onCallbackQuery(callbackQuery) {
  console.log(callbackQuery);
  const msg = callbackQuery.message;
  let data = callbackQuery.data;
  const myArray = data.split(":");
  if (myArray[0] == "pid") {
    // console.log("product selected");
    // return;
    console.log("Product id: "+myArray[1]);

    let inline_keyboard=[];
    let button={};
    let buttonwraper=[];
    button.text="Confirm"
    button.callback_data="confirm:"+"Product id: "+myArray[1];
    buttonwraper.push(button);
   inline_keyboard[inline_keyboard.length]=buttonwraper
 const opts = {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
    reply_markup: {
      inline_keyboard: inline_keyboard
    }
  };
  var message=" Do you want to confirm this purchase?? ";
  bot.editMessageText(message, opts);
  }
  if(myArray[0] =="confirm"){
  buyproduct.buy("9869804695",myArray[2],bot,callbackQuery)


  }
  sendsubcat.sendsubcategories(callbackQuery, bot);
});
module.exports = bot;
