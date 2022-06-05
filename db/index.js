const { NotExtended } = require('http-errors')
const mysql=require('mysql')

const pool=mysql.createPool({
connectionLimit:10,
host:'localhost',
user:'root',
password:'',
database:'tele_bot',
port:3306,
charset: 'utf8mb4'
//collation: utf8mb4_bin

// connectionLimit:2,
// host:'database-1.cmn2hbmgvegk.ap-south-1.rds.amazonaws.com',
// user:'admin',
// password:'#pvug209y',
// database:'rajgharana',
// port:3306

})


module.exports=pool;