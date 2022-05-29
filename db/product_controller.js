var config=require('../db/index');
let db={}

db.getallProducts=()=>{
    return new Promise((resolve,reject)=>{
        config.query("select id,cat_id,subcat_id,name,price,status from products where status=? ",["instock"],(err,results)=>{
            if(err){
                return reject(err);
            } 
            return resolve(results);
         }) 
     })

}

db.getProductsbycatnsubcat=(catid,subcatid)=>{
    return new Promise((resolve,reject)=>{
        config.query("select p.id, p.name,p.cat_id,p.subcat_id,p.price from products p,category c, subcategory sc where p.cat_id=c.cat_id and p.subcat_id=sc.subcat_id and p.cat_id=? and p.subcat_id=? and p.status='instock';",[catid,subcatid],(err,results)=>{
            if(err){
                return reject(err);
            } 
            return resolve(results);
         }) 
     })

}


db.createProduct=(cat_id,subcat_id,name,details,price,isinstant)=>{
    return new Promise((resolve,reject)=>{
        config.query("insert into products values(Null,?,?,?,?,?,?,?,'',?)",[cat_id,subcat_id,name,details,price,'0','instock',isinstant],(err,results)=>{
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


db.makesales=(productid,paymentid,userid)=>{
    return new Promise((resolve,reject)=>{
        config.query("update products set buyer=?, payment_details=?,status='sold' where id=?",[userid,paymentid,productid],(err,results)=>{
            if(err){
                return reject(err);
            } 
            return resolve(results);
         }) 
     })
}


module.exports=db;