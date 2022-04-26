var config=require('../db/index');
let db={}

db.getallProducts=()=>{
    return new Promise((resolve,reject)=>{
        config.query("select * from products",(err,results)=>{
            if(err){
                return reject(err);
            } 
            return resolve(results);
         }) 
     })

}


db.createProduct=(catid,subcatid,details,price)=>{
    return new Promise((resolve,reject)=>{
        config.query("insert into products values(Null,?,?,?,?,?)",[catid,subcatid,details,price,'','instock'],(err,results)=>{
            if(err){
                return reject(err);
            } 
            return resolve(results);
         }) 
     })

}


db.getProductsbyId=(id)=>{
    return new Promise((resolve,reject)=>{
        config.query("select * from products where id=?",[id],(err,results)=>{
            if(err){
                return reject(err);
            } 
            return resolve(results);
         }) 
     })

}

db.deleteProductsByid=(id)=>{
    return new Promise((resolve,reject)=>{
        config.query("delete from products where id=?",[id],(err,results)=>{
            if(err){
                return reject(err);
            } 
            return resolve(results);
         }) 
     })

}







module.exports=db;