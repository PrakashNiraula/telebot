const res = require("express/lib/response");
const { DATE } = require("mysql/lib/protocol/constants/types");
const pool = require("../db/index");
let db = {};

db.loginUser = (username, password) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "select * from users where number=? and password=?",
      [username, password],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

db.addbalance = (amount, userid) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "update users set balance=balance+? where id=?",
      [amount, userid],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

db.decreaseBalance = (amount, userid) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "update users set balance=balance-? where id=?",
      [amount, userid],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

db.getuserbyNumber = (number) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "select * from users where number=?",
      [number],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

db.createuser = async (phone, fname) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "select * from users where number=?",
      [phone],
      async (error, result) => {
        if (error) {
          console.log(error);
        }
        console.log(result);
        if (result.length == 1) {
          return reject("Error" + "User exists");
        } else {
          //2022-05-02 16:34:56
          var currentDate = new Date();
          var date = currentDate.getDate();
          let month = currentDate.getMonth()+1;
          var year = currentDate.getFullYear();
          var time=currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds();
          var monthDateYear = year+"-"+month + "-" + date + " " +time;
          pool.query(
            "insert into users values(Null,?,?,?,?,?,?)",
            [phone, fname, "0", phone, "user",monthDateYear],
            async (error, response) => {
              return resolve(response);
            }
          );
   
        }

       
      }
    );
  });
};

module.exports = db;
