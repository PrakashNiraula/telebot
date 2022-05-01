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

db.getuserbyNumber = (number) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "select * from users where number=?",
      [ number],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

db.createuser = (phone, password) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "select * from users where number=?",
      [phone],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        if (results.length == 0) {
          return new Promise((resolve, reject) => {
            pool.query(
              "insert into users values(Null,?,?,?,?)",
              [phone, "0", password, "user"],
              (err, results) => {
                if (err) {
                  return reject(err);
                }
                return resolve(results);
              }
            );
          });
        } else {
          return reject("Phone number already exists");
        }
      }
    );
  });
};

module.exports = db;
