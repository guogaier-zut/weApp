Page({
  data: {
   circleList: [],//圆点数组
   awardList: [],//奖品数组
   colorCircleFirst: '#FFDF2F',//圆点颜色1
   colorCircleSecond: '#FE4D32',//圆点颜色2
   colorAwardDefault: '#F5F0FC',//奖品默认颜色
   colorAwardSelect: '#ffe400',//奖品选中颜色
   indexSelect: 0,//被选中的奖品index
   isRunning: false,//是否正在抽奖
   imageAward: [
    '../../images/8.png',
    '../../images/1.png',
    '../../images/2.png',
    '../../images/3.png',
    '../../images/4.png',
    '../../images/5.png',
    '../../images/6.png',
    '../../images/7.png'
   ],//奖品图片数组
   names:['黄焖鸡','老碗面','热干面','小汉堡','炸鸡','麻辣烫','鸡公煲','奶茶'],
   loading:false
  },
 
  onLoad: function () {
   var _this = this;
   //圆点设置
   var leftCircle = 7.5;
   var topCircle = 7.5;
   var circleList = [];
   for (var i = 0; i < 24; i++) {
    if (i == 0) {
     topCircle = 15;
     leftCircle = 15;
    } else if (i < 6) {
     topCircle = 7.5;
     leftCircle = leftCircle + 102.5;
    } else if (i == 6) {
     topCircle = 15
     leftCircle = 620;
    } else if (i < 12) {
     topCircle = topCircle + 94;
     leftCircle = 620;
    } else if (i == 12) {
     topCircle = 565;
     leftCircle = 620;
    } else if (i < 18) {
     topCircle = 570;
     leftCircle = leftCircle - 102.5;
    } else if (i == 18) {
     topCircle = 565;
     leftCircle = 15;
    } else if (i < 24) {
     topCircle = topCircle - 94;
     leftCircle = 7.5;
    } else {
     return
    }
    circleList.push({ topCircle: topCircle, leftCircle: leftCircle });
   }
   this.setData({
    circleList: circleList
   })
   //圆点闪烁
   setInterval(function () {
    if (_this.data.colorCircleFirst == '#FFDF2F') {
     _this.setData({
      colorCircleFirst: '#FE4D32',
      colorCircleSecond: '#FFDF2F',
     })
    } else {
     _this.setData({
      colorCircleFirst: '#FFDF2F',
      colorCircleSecond: '#FE4D32',
     })
    }
   }, 500)
   //奖品item设置
   var awardList = [];
   //间距,怎么顺眼怎么设置吧.
   var topAward = 25;
   var leftAward = 25;
   for (var j = 0; j < 8; j++) {
    if (j == 0) {
     topAward = 25;
     leftAward = 25;
    } else if (j < 3) {
     topAward = topAward;
     leftAward = leftAward + 166.6666 + 15;
    } else if (j < 5) {
     leftAward = leftAward;
     topAward = topAward + 150 + 15;
    } else if (j < 7) {
     leftAward = leftAward - 166.6666 - 15;
     topAward = topAward;
    } else if (j < 8) {
     leftAward = leftAward;
     topAward = topAward - 150 - 15;
    }
    var imageAward = this.data.imageAward[j];
    awardList.push({ topAward: topAward, leftAward: leftAward, imageAward: imageAward });
   }
   this.setData({
    awardList: awardList
   })
  },
  //开始游戏
  startGame: function () {
    this.setData({
      loading:true
    })
   if (this.data.isRunning) return
   this.setData({
    isRunning: true
   })
   var _this = this;
   var indexSelect = 0
   var i = 0;
   var timer = setInterval(function () {
    indexSelect++;
    i += parseInt(Math.random()*(80+1) + 0);
    if (i > 1000) {
     clearInterval(timer)
     wx.showModal({
      title: '抽取结果',
      content:'吃'+ _this.data.names[_this.data.indexSelect]+'怎么样？',
      showCancel: false,
      success: function (res) {
       if (res.confirm) {
        _this.setData({
         isRunning: false,
         loading:false
        })
       }
      }
     })
    }
    indexSelect = indexSelect % 8;
    _this.setData({
     indexSelect: indexSelect
    })
   }, (200 + i))
  }
 })
 
 