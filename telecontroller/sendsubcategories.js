var db = require("../db/subcategory_controller");
var sendcat = require("./sendcategories");
var dbcat = require("../db/category_controller");
var sendProducts = require("./sendproducts");

let reply = {};
reply.sendsubcategories = async (callback_query, bot) => {
  const msg = callback_query.message;
  let cat_id = callback_query.data;

  const myArray = cat_id.split("=");
  var category = 0;
  var subcategory = 0;
  if (myArray.length == 2) {
    category = myArray[1];
    var res = await db.getsubcategorybyCategory(myArray[1]);
    let inline_keyboard = [];
    for (let i = 0; i < res.length; i++) {
      let button = {};
      let buttonwraper = [];
      button.text = res[i].name;
      button.callback_data =
        "cat_id=" + myArray[1] + ":subcat_id=" + res[i].subcat_id;
      buttonwraper.push(button);
      inline_keyboard[i] = buttonwraper;
    }
    button = {};
    buttonwraper = [];
    button.text = "Go To Home ";
    button.callback_data = "gotoHome:";
    buttonwraper.push(button);
    inline_keyboard[inline_keyboard.length] = buttonwraper;
    const opts = {
      chat_id: msg.chat.id,
      message_id: msg.message_id,
      reply_markup: {
        inline_keyboard: inline_keyboard,
      },
    };
    var message = " Displaying " + res[0].name;
    bot.editMessageText(message, opts);
  } else if (myArray.length == 3) {
    sendProducts.fetchProducts(bot, callback_query);
  } else if (myArray[0] == "back") {
    //todo go back code how to?
  }
};
module.exports = reply;
