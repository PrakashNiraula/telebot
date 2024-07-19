const { NotExtended } = require('http-errors')
const mysql=require('mysql')

const pool=mysql.createPool({
connectionLimit:10,
host:'localhost',
user:'root',
password:'asdfghjkl',
database:'telebot',
port:3306,
charset: 'utf8mb4'

})


module.exports=pool;