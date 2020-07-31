import { request } from '../../network/request.js'
Page({
  data: {
    imglisg: [],
    barlist:[],
    goodslist:[],
  },

  onLoad: function (options) {
    // 轮播图
    request({ url: '/home/swiperdata' }).then(res => {
      this.setData({
        imglisg: res.data.message
    })
  })
    // 导航栏
    request({url:'/home/catitems'})
    .then( res =>{
      this.setData({
        barlist:res.data.message
      })
    })

    // 商品展示数据
    request({url:'/home/floordata'})
    .then( res => {
      this.setData({
        goodslist:res.data.message
      })
    })
  },
});