let termsandconditions={};


termsandconditions.sendterms=async(bot,callbackQuery)=>{

    let inline_keyboard = [];
      let button = {};
      let buttonwraper = [];
      button.text = "Go To Home ";
      button.callback_data = "gotoHome:";
      buttonwraper.push(button);
      inline_keyboard[inline_keyboard.length] = buttonwraper;

      const opts = {
        chat_id:  callbackQuery.chat.id,
        message_id:callbackQuery.message_id,
        reply_markup: {
          inline_keyboard: inline_keyboard,
        }
      };

      var message =
        "Sample terms and conditions";
        bot.sendMessage( callbackQuery.chat.id,message,opts);
    
}



module.exports=termsandconditions;