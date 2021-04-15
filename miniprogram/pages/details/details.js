// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    id:'',
    goods_name:'',
    goods_price:'',
    goods_info:'',
    goods_img:'../../images/image.png',
    goods_user:''
  },
  seller(){
    const str = this.data.goods_user
    wx.showModal({
      title: '提示',
      content: '是否复制卖家联系方式',
      success (res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: str,
            success (res) {
              wx.getClipboardData({
                success (res) {
                  console.log(res.data) // data
                }
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  buy(){
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    var id = options.id
    this.setData({
      id:id
    })
    wx.cloud.callFunction({
      name:'get_goods_info',
      data:{
        id:id
      }
    }).then(res=>{
      console.log(res.result.data)
      var item = res.result.data[0]
      this.setData({
        goods_name:item.goods_name,
        goods_info:item.goods_info,
        goods_price:item.goods_price,
        goods_user:item.goods_user,
        goods_img:item.goods_img
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})