Page({
  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    food:[],
    M_id:0,
    num:0,
    temp_id:'',
    price:0,
    show: false,
    loading: true,
    array:[],
    order_id:'',
    imgurl:'../../images/activity.jpg'
  },
  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  getimage(){
    var that = this
    const url = 'https://api.sernikki.cn/myms/getSafeImage?S_id='+this.data.M_id
    console.log(url)
    wx.request({
      url: url,
      success(res){
        console.log(res)
        if(res.data.data!==''){
          that.setData({
            imgurl:res.data.data
          })
        }
      }
    })
  },
  // 数据加载
  init(){
    var that =this
    wx.cloud.callFunction({
      name:'getopenid'
    }).then(res=>{
      console.log(res.result.openid)
      that.setData({
        openid:res.result.openid
      })
    })
    var that = this
    wx.request({
      url: 'https://api.sernikki.cn/myms/getStoreFood',
      data:{
        M_id:this.data.M_id
      },
      success(res){
        console.log(res.data)
        that.setData({
          array:res.data.data
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
  add(res){
    var id = res.currentTarget.dataset.index;
    console.log(this.data.array[id])
      this.data.food.push(this.data.array[id])
      var price = parseFloat(this.data.array[id].goods_price);
      console.log(price)
      this.setData({
        food:this.data.food,
        price:this.data.price+price,
        temp_id:id,
        num:this.data.num+1
      })
      wx.showToast({
        title: '添加成功',
      })
      console.log('总价'+this.data.price)
  },
  details(res){
    var id = res.currentTarget.dataset.id
    wx.navigateTo({
      url: '../details/details'+'?id='+id,
})
  },
  onSubmit(){
    wx.showLoading({
      title: '正在处理中',
    })
    var foods = this.data.food
    var arr = []
    var i=0
    for(i=0;i<foods.length;i++){
      var foodid = foods[i]._id
      arr[i] = {F_id:foodid , S_id: parseInt(this.data.M_id)}
    }
    console.log(arr)
    var price = this.data.price
    console.log(price)
    // var a=[this.data.openid,price,0,arr]
    const url = encodeURI( 'https://api.sernikki.cn/myms/generateOrder?'+'_openid='+this.data.openid+'&price='+price+'&state=0&foods='+JSON.stringify(arr))
    console.log(url)
    var that = this
    wx.request({
      // url: 'https://api.sernikki.cn/myms/generateOrder',
      url:url,
      method:'POST',
      success(res){
        console.log(res.data.message)
        that.setData({
          order_id:res.data.order_id
        })
      }
    })
      wx.hideLoading({
        success: (res) => {
          this.setData({
            food:[],
            price:0,
            num:0,
            show:false,
          })
        },
      })
      wx.showModal({
        title: '提示',
        content: '订单已提交，是否查看取餐码？',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '../QRcode/QRcode?'+'id='+that.data.order_id,
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
            wx.showToast({
              icon:'none',
              title: '您可在"我的-我的订单"中查看取餐二维码',
              duration:3000
            })
          }
        }
      })
  }, 
  onLoad: function (options) {
    var id = options.M_id
    this.setData({
      M_id:id
    })
    this.getimage()
    // wx.cloud.callFunction({
    //   name:'get_count'
    // }).then(res=>{
    //   this.setData({
    //     count:res.result.total
    //   })
    // })
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