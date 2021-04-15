// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var openid = wxContext.OPENID
  console.log(openid)
  const result = await db.collection('orders').where({
 _openid:openid,
 state:2
}).get()
  return result
}