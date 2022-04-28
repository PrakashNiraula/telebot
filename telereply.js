const TelegramBot = require('node-telegram-bot-api');
const token = '5342231228:AAHYB9aYGkfwfMnuOOWpAS048JZ5hkgEdKY';
const bot = new TelegramBot(token, {polling: true});
var sendcat=require('./telecontroller/sendcategories')
var sendsubcat=require('./telecontroller/sendsubcategories')
console.log("Starting.....");


bot.on('message',async (msg) => {
    const chatId = msg.chat.id;
    if(msg.text=="🏡 Home 🏡"){
      sendcat.sendhome(bot,msg);
        return;
      }

    const opts = {
      
        reply_markup: JSON.stringify({
          keyboard: [
            ['🏡 Home 🏡','🧑‍🎤 Profile 🧑‍🎤'],
            ['📝 Terms and conditions 📝']
          ]
        })
      };
   
    bot.sendMessage(msg.chat.id,"Hello",opts);
    
})

bot.on('callback_query', function onCallbackQuery(callbackQuery) {
  const msg = callbackQuery.message;
    let data=callbackQuery.data;
    const myArray = data.split(":");
    if(myArray[0]=="pid"){
      console.log("product selected")
    return;
    }
  sendsubcat.sendsubcategories(callbackQuery,bot)
    
})
module.exports=bot;
