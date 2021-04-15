// pages/shop_type.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'',
    Merchants:[]
  },
  init(){
    var that = this
    wx.request({
      url: 'https://api.sernikki.cn/myms/getStores',
      data:{
        M_type:this.data.type
      },
      success(res){
        console.log(res.data.data)
        that.setData({
          Merchants:res.data.data
        })
      }
    })
  },
  click(res){
    console.log(res)
    var id = res.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '../shop_detail/shop_detail?M_id='+id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type:options.type
    })
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