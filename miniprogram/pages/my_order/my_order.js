
Page({
  data: {
    openid:'',
    order:[],
    steps: [
      {
        desc: '已下单',
      },
      {
        desc: '待取餐',
      },
      {
        desc: '已取餐',
      }
    ],
    active:0,
    loading:true
  },
  init(){
    var that = this
    wx.cloud.callFunction({
      name:'getopenid'
    }).then(res=>{   
      console.log(res.result.openid)  
      that.setData({
        openid:res.result.openid
      }) 
      const url = encodeURI('https://api.sernikki.cn/myms/getOrders?_openid='+res.result.openid+'&state=0')                   
      console.log(url)
      wx.request({
        url: url,
        success(res){
          console.log(res.data)
          that.setData({
            order:res.data.data,
            loading:false
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
  cancel(res){
    var id = res.currentTarget.dataset.id
    var that =this
    wx.showModal({
      title:'提示',
      content:'确定要取消该订单吗？',
      success(res){
        if(res.confirm){
          console.log('取消成功'+id)
          var openid= that.data.openid
          console.log(openid)
          wx.request({
            url: 'https://api.sernikki.cn/myms/cancelOrder',
            data:{
              _id:id,
              _openid:openid
            },
            success(res){
              console.log(res)
              that.init()
            }
          })
        }
        else{
          console.log('cancel')
        }
      }
    })
  },
  onReady() {
    this.setData({
      loading: false,
    });
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
    this.init()
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