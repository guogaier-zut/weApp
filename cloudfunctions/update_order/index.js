// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event.id)
  try {
    return await db.collection('orders').doc(event.id)
    .update({
      data:{
        state:2
      }
    })
  } catch(e) {
    console.error(e)
  }
}