// pages/shop/shop.js
const db = wx.cloud.database()  
Page({
  /**
   * 页面的初始数据
   */
  data: {
    food:[],
    num:0,
    temp_id:'',
    price:0,
    show: false,
    loading: true,
    array:[],
    order_id:'',
    openid:'',
    skeleton:true
  },
  //搜索
  onSearch(){
    var that =this
    if(this.data.value==''){
      wx.showToast({
        title: '请输入商品名称',
        icon:'none'
      })
    }else{
     wx.request({
       url: 'https://api.sernikki.cn/myms/getFoods?goods_name='+that.data.value,
       success(res){
        console.log(res.data)
         var code = res.data.code
         if(code==500){
           wx.showModal({
            title:'提示',
            content:'没找到您想要的食物，请重新搜索',
            showCancel:false,
            success(res){
              if(res.confirm){
                that.init()
              }
            }
           })
         }
         else{
           console.log(res.data.data)
           that.setData({
             array:res.data.data
           })
         }
       }
     })
    }
  },
  toShop(res){
    console.log(res.currentTarget.dataset.id)
    var M_id = res.currentTarget.dataset.id
    wx.navigateTo({
      url: '../shop_detail/shop_detail?M_id='+M_id,
    })
  },
  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  // 数据加载
  init(){
    var that = this
    wx.cloud.callFunction({
      name:'getopenid'
    }).then(res=>{
      console.log(res.result.openid)
      that.setData({
        openid:res.result.openid
      })
    })
    wx.request({
      url: 'https://api.sernikki.cn/myms/getFoods',
      success(res){
        console.log(res)
        that.setData({
          array:res.data.data,
          skeleton:false
        })
      }
    })
  },
  //弹出页面
  showPopup() {
    if(this.data.num==0){
      wx.showToast({
        icon:'none',
        title: '购物车为空!',
      })
    }else{
      this.setData({ show: true });
      console.log(this.data.food)
    }
  },
  //关闭弹出页
  onClose() {
    this.setData({ show: false});
  },
  clearAll(){
    this.setData({
      num:0,
      price:0,
      show: false,
      food:[],
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name:'get_count'
    }).then(res=>{
      this.setData({
        count:res.result.total
      })
    })
    var that = this;
    that.init()
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
    this.init()
    console.log("下拉了")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var page = this.data.array.length
    this.init(5,page)
    if(page==this.data.count){
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