var db=require('../db/category_controller')

let reply={};
reply.sendhome=async(bot,msg)=>{
   var res=await db.getallcategories();
   let inline_keyboard=[];
   for(let i=0;i<res.length;i++){
      let button={};
      let buttonwraper=[];
      button.text=res[i].name;
      button.callback_data="cat_id="+res[i].cat_id;
      buttonwraper.push(button);
     inline_keyboard[i]=buttonwraper
   }
   const opts = {
      reply_markup: {
        inline_keyboard: inline_keyboard
      }
    };
    var message=" Dispalying Home Items. Click on items to view subcategory";
  bot.sendMessage( msg.chat.id,message,opts);
}

module.exports=reply