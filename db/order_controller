let config = require("./index");

let db = {};
db.getorderbyid=async(id)=>{
    return new Promise((resolve, reject) => {
        config.query("select * from products where id='?'",[id], (err, results) => {
          if (err) {
            return reject(err);
          }
          return resolve(results);
        });
      });
}

db.getallorders=async()=>{
  return new Promise((resolve, reject) => {
    config.query("select * from products where status='sold' and buyer!='0'", (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });


}

db.getallordersbydate=async(date)=>{
  return new Promise((resolve, reject) => {

    config.query("select * from products where payment_details like '%"+date+"'", (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });


}

db.salestoday=async(date)=>{
  return new Promise((resolve, reject) => {

    config.query("select sum(price) from products where payment_details like '%"+date+"'", (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });


}




module.exports=db;