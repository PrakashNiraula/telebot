var express = require("express");
var usercontroller = require("../db/usercontroller");
var router = express.Router();
var jwt = require("jsonwebtoken");

/* GET users listing. */
router.post("/login", async function (req, res, next) {
  const phone = req.body.phone;
  const password = req.body.password;
  try {
    var res2 = await usercontroller.loginUser(phone, password);
    if (res2.length == 1) {
      

      let payload = {
        number: res2[0].number,
        fname: res2[0].fname,
        type: res2[0].type,
        balance: res2[0].balance,
      };

      jwt.sign(payload, "secretkey", (err, result) => {
        if (err) return next(err);
        res
          .json({
            status: "Login successful",
            token: `Bearer ${result}`,
          })
          .status(200);
      });
    } else {
      res.json("Invalid Credentials");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
