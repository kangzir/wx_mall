// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    orderbar:[
      {
        name:'全部订单',
        icon:'icon-wenben'
      },
      {
        name:'待付款',
        icon:'icon-fukuantongzhi'
      },
      {
        name:'待收货',
        icon:'icon-qiche'
      },
      {
        name:'退款/退货',
        icon:'icon-RectangleCopy'
      },
    ],
    collectlength:0
  },
  getuserinfo(e){
    console.log(e);
    const {userInfo} = e.detail
    wx.setStorageSync('user', userInfo);
    this.setData({
      userInfo,
    })
  },
  getcollect(){
    wx.navigateTo({
      url: '/pages/collect/index',
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      userInfo:wx.getStorageSync('user')
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
    this.setData({
      collectlength:wx.getStorageSync('collect').length
    })
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