// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:['商品收藏','品牌收藏','店铺收藏','浏览足迹'],
    isIndex:0,
    goodslist:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const collect = wx.getStorageSync('collect');
    this.setData({
      goodslist:collect
    })
  },
  btnchild(e){
    this.setData({
      isIndex:e.detail
    })
  },
  remoInfo(e){
    const {id} = e.currentTarget.dataset
    const {goodslist} = this.data

    const index = goodslist.findIndex(v =>v.goods_id == id)
    console.log(index);
    goodslist.splice(index,1)
    this.setData({
      goodslist
    })
    wx.setStorageSync('collect', goodslist);
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