var usercontroller = require("../db/usercontroller");
var productcontroller = require("../db/product_controller");
var client = require("../payment/coinbase");
var coinbase = require("coinbase-commerce-node");
const { response } = require("express");
const res = require("express/lib/response");
var Charge = coinbase.resources.Charge;


let buyproduct = {};
let count=0;
buyproduct.confirmPayment=async(productid,chargeid,callbackQuery,bot)=>{
    if(count!=0){
        console.log("Retrieving all changes")
        Charge.all({}, function (error, list) {
            //console.log(error);
            //console.log(list);
            for(let i=0;i<list.length;i++){
                if(list[i].id==chargeid)
                {

                    let inline_keyboard = [];
                    let button = {};
                      let buttonwraper = [];
                      button.text = " Refresh ";
                      button.callback_data = "payment:"+productid+":"+chargeid;
                      buttonwraper.push(button);
                      inline_keyboard[inline_keyboard.length] = buttonwraper;
                
                    const opts = { 
                        chat_id:  callbackQuery.message.chat.id,
                        message_id:callbackQuery.message.message_id,
                        reply_markup: {
                          inline_keyboard: inline_keyboard,
                        },
                      };
                      var message ="Payment created. Waiting for confirmation.\n Status: "+list[i].timeline[0].status+"\n Charge id:"+list[i].id+"\n URL: "+list[i].hosted_url+"\n Product id:"+productid+"\n Created at : "+list[i].created_at+"\n Expires at :"+list[i].expires_at;
                      bot.editMessageText(message, opts); 

                }
            }
          });

    }else{
        Charge.retrieve(chargeid, function (error, response) {
            count++;
        console.log("retrieving charge") ;
        let inline_keyboard = [];
        let button = {};
          let buttonwraper = [];
          button.text = " Refresh ";
          button.callback_data = "payment:"+productid+":"+chargeid;
          buttonwraper.push(button);
          inline_keyboard[inline_keyboard.length] = buttonwraper;
    
        const opts = { 
            chat_id:  callbackQuery.message.chat.id,
            message_id:callbackQuery.message.message_id,
            reply_markup: {
              inline_keyboard: inline_keyboard,
            },
          };
          var message ="Payment created. Waiting for confirmation.\n Status: "+response.timeline[0].status+"\n Charge id:"+response.id+"\n URL: "+response.hosted_url+"\n Product id:"+productid+"\n Created at : "+response.created_at+"\n Expires at :"+response.expires_at;
          bot.editMessageText(message, opts);    
          });

    }

    


}


module.exports = buyproduct;

