import { request } from '../../network/request.js'
Page({
  data: {
    imglisg: [],
    barlist:[],
    goodslist:[]
  },

  onLoad: function (options) {
    // 轮播图
    request({ url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata' }).then(res => {
      this.setData({
        imglisg: res.data.message
      })
    })
    // 导航栏
    request({url:'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems'})
    .then( res =>{
      this.setData({
        barlist:res.data.message
      })
    })

    // 商品展示数据
    request({url:'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata'})
    .then( res => {
      this.setData({
        goodslist:res.data.message
      })
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});