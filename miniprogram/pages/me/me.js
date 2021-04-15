// pages/cart/cart.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  my_order(){
    let that =this;
    if(!this.data.hasUserInfo && this.data.canIUse){
      wx.showModal({
        title:"提示",
        content:"请先登录",
        showCancel:false
      })
    }
    else{
      wx.navigateTo({
        url: '../my_order/my_order',
      })
    }
  },
  order_history(){
    let that =this;
    if(!this.data.hasUserInfo && this.data.canIUse){
      wx.showModal({
        title:"提示",
        content:"请先登录",
        showCancel:false
      })
    }
    else{
      wx.navigateTo({
        url: '../order_history/order_history',
      })
    }
  },
  my_info(){
    let that =this;
    if(!this.data.hasUserInfo && this.data.canIUse){
      wx.showModal({
        title:"提示",
        content:"请先登录",
        showCancel:false
      })
    }
    else{
      // console.log(that.data.userInfo.nickName)
      var userinfo = that.data.userInfo.nickName
      wx.navigateTo({
        url: '../my_info/my_info?userinfo='+userinfo,
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e.detail.errMsg)
    if(e.detail.errMsg=='getUserInfo:ok'){
    console.log(e.detail.userInfo)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
   }else{
     wx.showModal({
       title:'提示',
       content:'登陆后才能使用哦',
       showCancel:false
      })
   }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  toWeight(){
    wx.navigateToMiniProgram({
      appId: 'wx85c6a237d9ce0a67',
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