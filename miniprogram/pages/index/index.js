// pages/index/index.js\
const db = wx.cloud.database()
const app = getApp()
import Notify from '@vant/weapp/notify/notify';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    location:'正在获取当前位置',
    page:1,
    Merchants:[],
    show: true,
    total:0,
    skeleton:true
  },
  menu(){
    wx.navigateTo({
      url: '../eat/eat',
    })
  },
  search(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  breakfast() {
    Notify({ type: 'primary', message: '早餐还没做'});
    wx.navigateTo({
      url: '../shop_type/shop_type'+'?type=0'
    })
  },
  lunch() {
    // Notify({ type: 'success', message: '午餐还没做'});
    wx.navigateTo({
      url: '../shop_type/shop_type?type=1',
    })
  },
  dinner(){
    // Notify({ type: 'warning', message: '晚餐还没做'});
    wx.navigateTo({
      url: '../shop_type/shop_type?type=2',
    })
  },
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  click(res){
    console.log(res)
    var id = res.currentTarget.dataset.id
    const url = '../shop_detail/shop_detail'+'?M_id='+id
    wx.navigateTo({
      url: url
    })
  },
  getlocation(){
    var that = this
      wx.getLocation({
        success (res) {
          console.log(res.latitude+','+res.longitude)
          wx.request({
            url: 'https://apis.map.qq.com/ws/geocoder/v1/?',
            data:{
             location: res.latitude+','+res.longitude,
             key:'KGNBZ-UZU3I-HHIGK-5WBOJ-BU4C2-T3FOB'
              },
              success:function(res){
                console.log(res.data.result.formatted_addresses.recommend)
                that.setData({
                  location:res.data.result.formatted_addresses.recommend
                })
              }
             })
        },
       })
  },
  init(){
    var that =this
    wx.request({
      url: 'https://api.sernikki.cn/myms/selectAll',
      success(res){
        console.log(res.data.data)
        that.setData({
          total:res.data.data
        })
      }
    })
    console.log(this.data.page)
    var that = this
    wx.request({
      url: 'https://api.sernikki.cn/myms/getAllStore?num=5',
      data:{
        page:this.data.page
      },
      success(res){
        console.log(res.data.data)
        that.setData({
          Merchants:res.data.data,
          skeleton:false
        })
      }
    })
  },
  islogin(){
    console.log("    ww ww ww ======")
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
    if(!this.data.hasUserInfo && this.data.canIUse){
      wx.showModal({
        title:"提示",
        content:"请先登录",
        showCancel:false
      })
    }
  },
  onLoad: function (options) {
        this.init()
        this.getlocation()
  },
  getUserInfo: function(e) {
    console.log(e)
    console.log(e.detail.userInfo)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onReady: function () {

  },

  onShow: function () {

  },

  
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
   
    if(this.data.page<this.data.total/5){
    this.setData({
      page:this.data.page+1,
      loading:true
    })
    var arr=[]
    var that =this
   wx.request({
    url: 'https://api.sernikki.cn/myms/getAllStore?num=5',
    data:{
      page:this.data.page
    },
    success(res){
      arr=res.data.data
      console.log(arr)
      that.setData({
        Merchants:that.data.Merchants.concat(arr)
      })
      console.log(that.data.Merchants)
    }
   })
    console.log(this.data.page)
  }
  else{
    console.log(this.data.page)
    this.setData({
      loading:false
    })
  }    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})