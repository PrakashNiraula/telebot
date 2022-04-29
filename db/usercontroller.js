const pool=require('../db/index')
let db={};


db.loginUser=(username,password)=>{

    return new Promise((resolve,reject)=>{
        pool.query("select * from users where number=? and password=?",[username,password],(err,results)=>{
            if(err){
                return reject(err);
            } 
            return resolve(results);
         }) 
 })
}


db.addbalance=(amount,userid)=>{
    return new Promise((resolve,reject)=>{
        pool.query("update users set balance=balance+? where id=?",[amount,userid],(err,results)=>{
            if(err){
                return reject(err);
            } 
            return resolve(results);
         }) 
 })

}



module.exports=db;