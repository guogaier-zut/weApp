// pages/my_info/my_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    openid:'',
    nickName:''
  },
  onChange(event) {
    // event.detail 为当前输入的值
    this.setData({
      value:event.detail
    })
  },
  tip(){
    wx.showToast({
      title: '昵称不可修改',
      icon:'none'
    })
  },
  submit(){
    var that =this
    console.log(this.data.value)
    if(this.data.value==''||this.data.value==undefined){
      wx.showModal({
        title:'提示',
        content:'邮箱不可为空,请将邮箱填写完整',
        showCancel:false
      })
  }else{
    
    wx.showModal({
      title:'提示',
      content:'请确认您的邮箱地址为:'+that.data.value,
      success(res){
        if(res.confirm){
          var nickname = that.data.nickName
          var email = that.data.value
          var openid = that.data.openid
          console.log('昵称:'+nickname)
          console.log('邮箱:'+email)
          console.log('openid:'+openid)
          wx.request({
            url: 'https://api.sernikki.cn/myms/setUser',
            data:{
              uname:nickname,
              _openid:openid,
              email:email
            },
            success(res){
              console.log(res)
              wx.showToast({
                title: '修改成功',
              })
            }
          })
        }
      }
    })
  }
  },
  getEmail(openid){
    wx.request({
      url: 'https://api.sernikki.cn/myms/selectUser',
      data:{
        _openid:openid
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    wx.cloud.callFunction({
      name:'getopenid',
      success(res){
       var openid = res.result.openid
       const url = 'https://api.sernikki.cn/myms/selectUser?_openid='+openid
       console.log(url)
        that.setData({
          openid:res.result.openid
        })
        wx.request({
          url: url,
          success(res){
            console.log(res.data.data)
            if(res.data.data==''){
              that.setData({
                value:''
              })
            }
            else{
              that.setData({
                value:res.data.data
              })
            }
          }
        })
      }
    }) 
    this.setData({
      nickName:options.userinfo,
    })
  },
})