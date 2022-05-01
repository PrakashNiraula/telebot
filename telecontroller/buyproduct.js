var usercontroller=require('../db/usercontroller');
var productcontroller=require('../db/product_controller');
var client=require('../payment/coinbase');
var coinbase = require('coinbase-commerce-node');
const { response } = require('express');
const res = require('express/lib/response');
var Charge = coinbase.resources.Charge;

let buyproduct={};

buyproduct.buy=async (number,productid,bot,callback_query)=>{
    console.log(number,productid);
//var result=
var result=await usercontroller.getuserbyNumber(number);
var result2=await productcontroller.getProductsbyId(productid);

if(result[0].balance>=result2[0].price){

}else{
    var data=callback_query.data;
    var myarray=data.split(":")
    if(myarray[0]=="confirm"){
        console.log("Showing address to pay");

        var firstChargeObj = new Charge({
            "description": "Test product description",
            "metadata": {
                "customer_id": "id_1",
                "customer_name": "Test Name"
            },
            "name": "Product A",
            "payments": [],
            "pricing_type": "no_price"
        });
        firstChargeObj.save(async (err,response)=>{
            if(err){
                console.log(error);
            }
            console.log(response);
            const msg = callback_query.message
            let inline_keyboard=[];
            const myJSON = JSON.stringify(response.addresses);
            // for(let i=0;i<1;i++){
            //     let button={};
            //     let buttonwraper=[];
             
             
            //     button.text="Here"+myJSON;
            //     button.callback_data="callback data";
            //     buttonwraper.push(button);
            //    inline_keyboard[i]=buttonwraper
            //  }
            const opts = {
                chat_id: msg.chat.id,
                message_id: msg.message_id,
                
              };
              var message=" Please pay to address below to complete your purchase \n "+myJSON;
              bot.editMessageText(message, opts);

        })

        //client.Charge(firstChargeObj)
        



    }



}
// console.log(result);
// console.log(result2);

}
module.exports=buyproduct;