let config = require("./index");

let db = {};

db.getallcategories = () => {
  return new Promise((resolve, reject) => {
    config.query("select * from category", (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

db.createcategory = (name) => {
  return new Promise((resolve, reject) => {
    config.query(
      "insert into category values (Null,?)",
      [name],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

db.getcategoryByid = (id) => {
  return new Promise((resolve, reject) => {
    config.query(
      "select * from category where cat_id=?",
      [id],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        config.query(
          "select * from subcategory where cat_id=?",
          [id],
          (error, results2) => {
            if (error) {
              return reject(error);
            }

            //  results.push(results2);
            results[1] = "Details";
            results[1] = results2;
            //console.log(results2)
            return resolve(results);
          }
        );
      }
    );
  });
};

db.deletecategoryByid = (id) => {
  return new Promise((resolve, reject) => {
    config.query(
      "delete from category where cat_id=?",
      [id],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

//     db.getallcategories=(name)=>{
//         return new Promise((resolve,reject)=>{
//             pool.query("insert into category values(Null,?)",[name],(err,results)=>{
//                if(err){
//                    return reject(err);
//                }
//                return resolve(results);
//             })
//         })

//         }

//         db.getallsubcategory=(catid)=>{
//             return new Promise((resolve,reject)=>{
//                 pool.query("select * from subcategory where cat_id='?'",[catid],(err,results)=>{
//                    if(err){
//                        return reject(err);
//                    }
//                    return resolve(results);
//                 })
//             })

//             }

//             db.getsubcategoryByid=(subcatid)=>{
//                 return new Promise((resolve,reject)=>{
//                     pool.query("select * from subcategory where id='?'",[subcatid],(err,results)=>{
//                        if(err){
//                            return reject(err);
//                        }
//                        return resolve(results);
//                     })
//                 })

//                 }

//                 db.deletesubcategorybyid=(subcatid)=>{
//                     return new Promise((resolve,reject)=>{
//                         pool.query("delete from subcategory where id='?'",[subcatid],(err,results)=>{
//                            if(err){
//                                return reject(err);
//                            }
//                            return resolve(results);
//                         })
//                     })

//                     }

//                 db.insertintosubcat=(catid,name)=>{
//                     return new Promise((resolve,reject)=>{
//                         pool.query("insert into subcategory values(Null,?,?)",[catid,name],(err,results)=>{
//                            if(err){
//                                return reject(err);
//                            }
//                            return resolve(results);
//                         })
//                     })

//                     }

module.exports = db;
