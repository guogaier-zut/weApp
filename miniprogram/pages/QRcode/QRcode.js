const db = wx.cloud.database()
Page({
  data: {
    imageurl:'../../images/qr.png',
    order:[],
    orderid:'',
    openid:'',
    steps: [
      {
        desc: '已下单',
      },
      {
        desc: '已取餐',
      },
      {
        desc: '已完成',
      }
    ],
  },
  finish(){
    console.log('订单id：'+this.data.orderid)
    var orderid = this.data.orderid
    console.log('订餐人id：'+this.data.openid)
    var openid = this.data.openid
    wx.showModal({
      title:'提示',
      content:'请确认您已取餐',
      success(res){
        if(res.confirm){
          //修改订单状态为2
          wx.request({
            url: 'https://api.sernikki.cn/myms/endOrder',
            data:{
              _openid:openid,
              _id:orderid
            },
            success(res){
              console.log(res)
              if(res.data.code==200){
                wx.showToast({
                  title: 'OK！',
                })
              }
            }
          })
        }
      }
    })
  },
  showQR(){ 
    var id = this.data.orderid 
   this.setData({
     imageurl:'https://api.qrserver.com/v1/create-qr-code/?size=128x128&data='+id
   })  
  },
  onLoad: function (options) {
    var that =this
    wx.cloud.callFunction({
      name:'getopenid',
      success(res){
        console.log(res.result.openid)
        that.setData({
          openid:res.result.openid
        })
      }
    })
    this.setData({
      orderid:options.id
    })
   this.showQR()
  }
})