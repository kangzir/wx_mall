// pages/goods_dateil/index.js
import { request } from '../../network/request'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
    isCollect: false
  },
  GoodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options
    console.log(goods_id);

    this._getGoodsDeteils(goods_id)
  },

  async _getGoodsDeteils(id) {
    const { data } = await request({ url: `/goods/detail?goods_id=${id}` })
    //  console.log(data);
    const goods = data.message
    this.GoodsInfo = goods
    // 在数据请求回来之后再进行这步 收藏
    const cllect = wx.getStorageSync('collect') || [];
    // 如果缓存中存在这个商品就返回 真
    const isCollect = cllect.some(v => v.goods_id == this.GoodsInfo.goods_id)

    this.setData({
      goodsObj: {
        pics: goods.pics,
        goods_name: goods.goods_name,
        goods_price: goods.goods_price,
        goods_introduce: goods.goods_introduce.replace(/\.webp/g, '.jpg'),
      },
      isCollect
    })
  },

  Newimg(e) {
    const urls = this.GoodsInfo.pics.map(v => v.pics_sma)
    const { url } = e.currentTarget.dataset
    wx.previewImage({
      current: url,
      urls
    });
  },

  joinCart() {
    let cart = wx.getStorageSync('cart') || [];
    // 判断本地储存中也没有当前商品没有返回 —1
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
    //  判断本地储存中也没有当前商品
    if (index === -1) {
      // 没有的话添加进去
      this.GoodsInfo.num = 1
      this.GoodsInfo.checked = true
      cart.push(this.GoodsInfo)
    } else {
      // 如果本地有的话当前数量加一
      cart[index].num++
    }
    // 不管是有还是没有都把当前对象保存的本地
    wx.setStorageSync('cart', cart);

    wx.showToast({
      title: '加入购物车',
      duration: 1000,
      mask: true,
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  benCollect() {
    const collect = wx.getStorageSync('collect') || [];
    // 查看本地储存中是否收藏了当前商品
    const index = collect.findIndex(v => v.goods_id == this.GoodsInfo.goods_id)
    // -1为没有收藏
    if (index == -1) {
      // 改变状态为
      this.setData({
        isCollect: true
      })
      // 收藏到本地储存
      collect.push(this.GoodsInfo)
      wx.showToast({
        title: '收藏成功',
        duration: 1000,
        mask: true,
      });
    } else {
      // 如果收藏了取消收藏
      // 删除本地储存数组中的商品
      collect.splice(index, 1)
      this.setData({
        isCollect: false
      })
      wx.showToast({
        title: '取消收藏',
        duration: 1000,
        mask: true,
      });
    }
    wx.setStorageSync('collect', collect);

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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