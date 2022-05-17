loadbalance = {};

loadbalance.loadMenu = async (msg, bot) => {
  let inline_keyboard = [];
  let button = {};
  let buttonwraper = [];
  button.text = "Load USD 10";

  button.callback_data = "load:10";
  buttonwraper.push(button);
  inline_keyboard[inline_keyboard.length] = buttonwraper;
  button = {};
  buttonwraper = [];
  button.text = "Load USD 20";
  //button.url=response.hosted_url;
  button.callback_data = "load:20";
  buttonwraper.push(button);
  inline_keyboard[inline_keyboard.length] = buttonwraper;

  button = {};
  buttonwraper = [];
  button.text = "Load USD 50";
  //button.url=response.hosted_url;
  button.callback_data = "load:50";
  buttonwraper.push(button);
  inline_keyboard[inline_keyboard.length] = buttonwraper;

  button = {};
  buttonwraper = [];
  button.text = "Load USD 100";
  //button.url=response.hosted_url;
  button.callback_data = "load:100";
  buttonwraper.push(button);
  inline_keyboard[inline_keyboard.length] = buttonwraper;

  button = {};
  buttonwraper = [];
  button.text = "Load USD 500";
  //button.url=response.hosted_url;
  button.callback_data = "load:500";
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
    " You can load balance using coinbase. You need coinbase account to load balance\n";
  bot.editMessageText(message, opts);
};

module.exports = loadbalance;
