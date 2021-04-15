
Page({
  data: {
    openid:'',
    order:[],
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
    active:0
  },
  init(){
    var that = this
    wx.cloud.callFunction({
      name:'getopenid'
    }).then(res=>{   
      console.log(res.result.openid)   
      const url = encodeURI('https://api.sernikki.cn/myms/getOrders?_openid='+res.result.openid+'&state=2')                   
      console.log(url)
      wx.request({
        url: url,
        success(res){
          console.log(res.data)
          that.setData({
            order:res.data.data
          })
        }
      })
    })
   
  },
  my_order(res){
    var id = res.currentTarget.dataset.id
    wx.redirectTo({
      url: '../QRcode/QRcode?'+'id='+id,
    })
  },
  onLoad: function (options) {
    this.init()
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