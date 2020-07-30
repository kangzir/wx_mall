import { request } from '../../network/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mantlist: [],
    contentlist: [],
    currentIndex: 0,
    scrollTop: 0
  },
  // 所有的数据
  cateData: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Cates = wx.getStorageSync('cates');
    if (!Cates) {
      this._getCetlist()
    } else {
      // 判断本地存放时间如果过期了重新请求数据
      if (Date.now() - Cates.time > 1000 * 60) {
        this._getCetlist()
      } else {

        this.cateData = Cates.data
        let mantlist = this.cateData.map(v => v.cat_name)
        let contentlist = this.cateData[0].children
        this.setData({
          mantlist,
          contentlist,
        })
      }
    }

  },

  //请求数据
  _getCetlist() {
    request({ url: '/categories' })
      .then(res => {
        console.log(res);
        this.cateData = res.data.message

        wx.setStorageSync('cates', { time: Date.now(), data: this.cateData });
        let mantlist = this.cateData.map(v => v.cat_name)
        let contentlist = this.cateData[0].children
        this.setData({
          mantlist,
          contentlist,
        })
      })
  },
  // 点击请求数据
  mantTap(e) {
    const index = e.currentTarget.dataset.index
    let contentlist = this.cateData[index].children
    this.setData({
      contentlist,
      currentIndex: index,
      scrollTop: 0
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