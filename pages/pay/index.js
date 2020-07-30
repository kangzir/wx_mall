// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo: [],
    totlsPri: '0',
    totallist:'0',
    bdaddress:null,
    ischecked:false,

    isremo:false,
    isadd:false,

    token:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bdaddress : wx.getStorageSync('address')
    })
    
    const data = wx.getStorageSync('cart');
    const dataa = data.filter(v => v.checked)
    // console.log(aa);
    this.setData({
      goodsInfo:dataa
    })
    this.calculate()
  },
  // 计算 总价格 总条数 是否全选状态
  calculate(){
    const {goodsInfo} = this.data
    if(goodsInfo){
      const totlsPri = goodsInfo.reduce((newvalue,oldvalue) => {
        return newvalue + oldvalue.goods_price * oldvalue.num
      },0)
      // 总条数
      const totallist = goodsInfo.length
      this.setData({
        totlsPri,
        totallist,
      })
    }

  },
  // 点击去结算
  payment(){
    const {token} = this.data
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
      });
    }else{

    }
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
    const data = wx.getStorageSync('cart');
    const dataa = data.filter(v => v.checked)
    this.setData({
      goodsInfo:dataa
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