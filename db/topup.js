var config=require('../db/index');
let db={}


db.getpaymentbyId=(userid)=>{
    return new Promise((resolve,reject)=>{
        config.query("select * from topup where uid=?",[userid],(err,results)=>{
            if(err){
                return reject(err);
            } 
            return resolve(results);
         }) 
     })

}

db.createtopup=(userid,paymentdetails)=>{
    return new Promise((resolve,reject)=>{
        config.query("insert into topup values (Null,?,?)",[userid,paymentdetails],(err,results)=>{
            if(err){
                return reject(err);
            } 
            return resolve(results);
         }) 
     })

}






module.exports=db;