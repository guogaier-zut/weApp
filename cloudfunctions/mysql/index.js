// 云函数入口文件
const cloud = require('wx-server-sdk')
//引入mysql操作模块
const mysql = require('mysql2/promise')
cloud.init()
// 云函数入口函数
exports.main = async(event, context) => {
  console.log('start')
 //链接mysql数据库的test库，这里你可以链接你mysql中的任意库
 try {
 const connection = await mysql.createConnection({
  host: "115.29.200.235",
  database: "nikki",
  user: "nikki",
  password: "mJGet66WTn76N8Zr"
 })
 var  sql = 'SELECT * FROM demo';
 //查
 connection.query(sql,function (err, result) {
     console.log('--------------------------SELECT----------------------------');
     console.log(result);
     console.log('------------------------------------------------------------\n\n');
 });
 connection.end();
  } catch (err) {
    console.log("链接错误", err)
    return err
  }
}