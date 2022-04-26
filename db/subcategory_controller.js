var config=require('../db/index');
let db={}



db.getallsubcategories=()=>{

    return new Promise((resolve,reject)=>{
        config.query("select * from subcategory",(err,results)=>{
            if(err){
                return reject(err);
            } 
            return resolve(results);
         }) 
 })
}

db.getsubcategorybyCategory=(id)=>{

    return new Promise((resolve,reject)=>{
        config.query("select * from subcategory where cat_id=?",[id],(err,results)=>{
            if(err){
                return reject(err);
            } 
            return resolve(results);
         }) 
     })


}


db.createsubCategory=(catid,name)=>{

    return new Promise((resolve,reject)=>{
        config.query("insert into subcategory values(Null,?,?)",[catid,name],(err,results)=>{
            if(err){
                return reject(err);
            } 
            return resolve(results);
         }) 
     })


}


db.deletesubCategory=(subcatId)=>{

    return new Promise((resolve,reject)=>{
        config.query("delete from subcategory where subcat_id=?",[subcatId],(err,results)=>{
            if(err){
                return reject(err);
            } 
            return resolve(results);
         }) 
     })


}







module.exports=db;