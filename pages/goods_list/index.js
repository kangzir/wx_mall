import {request} from '../../network/request'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:['综合','销量','价格'],
    index: 0,
    // 请求对象
    goodsInfo:{
      query:'',
      cid:'',
      pagenum:1,
      pagesize:10,
    },
    // 数据组
    goodslist:[],
    // 总页数
    pagetotal:0
  },
  // 获取子组件的index下标存到data中

  btnchild(e){
    const index = e.detail
    this.setData({
      index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {id} = options
    console.log(id);
    this.data.goodsInfo.cid = id

    this._getGoodsList(this.data.goodsInfo)
  },
  // 请求数据
  async _getGoodsList(datas){
    const {data}  = await request({url:'/goods/search',data:datas})
    console.log(data);

    const goods = data.message.goods

    const total = data.message.total
    // 算出总页码
    const pagetotal = Math.ceil(total/this.data.goodsInfo.pagesize)

    this.setData({
      pagetotal,
      goodslist:[...this.data.goodslist,...goods] //数据拼接
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
    // 置空之前的数据
    this.data.goodsInfo.pagenum = 1
    this.setData({
      goodslist:[]
    })
    // 下拉重新请求数据
    this._getGoodsList(this.data.goodsInfo)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 下拉加载数据
    
    if(this.data.goodsInfo.pagenum >= this.data.pagetotal){
      wx.showToast({title: '没有下一页了',});
    }else{
      this.data.goodsInfo.pagenum ++
      this._getGoodsList(this.data.goodsInfo)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})