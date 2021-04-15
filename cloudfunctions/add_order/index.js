// 云函数入口文件
const cloud = require('wx-server-sdk')
var request = require('request-promise');
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  request({
    url: 'https://api.sernikki.cn/myms/generateOrder',
      method:'POST',
      data:{
        foods:event.food,
        _openid:wxContext.OPENID,
        price:event.price,
        state:0
      },complete(res){
        return res.code
      }
  })
}