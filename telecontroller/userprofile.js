var userController=require('../db/usercontroller');


let userprofie={};

userprofie.getProfie=async(bot,callbackQuery)=>{
    console.log("Showing Profile")

    var userdata=await userController.getuserbyNumber(callbackQuery.from.id);
    let inline_keyboard = [];
      let button = {};
      let buttonwraper = [];
      button.text = " Load Balance ";
      //button.url=response.hosted_url;
      button.callback_data = "loadmoney";
      buttonwraper.push(button);
      inline_keyboard[inline_keyboard.length] = buttonwraper;
      button = {};
      buttonwraper = [];
      button.text = " My Purchases ";
      //button.url=response.hosted_url;
      button.callback_data = "mypurchases:";
      buttonwraper.push(button);
      inline_keyboard[inline_keyboard.length] = buttonwraper;

      button = {};
      buttonwraper = [];
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
        "User Profile:\n"+
        " ❌❌❌❌❌❌❌❌❌ \n\n"+
        "User Id: "+userdata[0].id+"\n"+
        "First Name:"+userdata[0].fname+"\n"+
        "Telegram Id:"+userdata[0].number+"\n\n"+
        "Balance: "+userdata[0].balance+"\n\n"+
        " ❌❌❌❌❌❌❌❌❌ ";
        bot.sendMessage( callbackQuery.chat.id,message,opts);
        

}



module.exports=userprofie;