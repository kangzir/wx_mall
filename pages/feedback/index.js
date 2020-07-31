// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['体验问题', '商品、商家投诉'],
    index: 0,
    textVal: '',
    imgs: [],

  },

  btnchild(e) {
    const index = e.detail
    this.setData({
      index
    })
  },
  // 添加照片
  addImg() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          imgs: [...this.data.imgs, ...result.tempFilePaths]
        })
      },
    });
  },
  // 点击删除照片
  remoimg(e) {
    const i = e.detail
    const { imgs } = this.data
    imgs.splice(i, 1)
    this.setData({
      imgs
    })
  },
  // 获取文本内容
  textinput(e) {
    this.setData({
      textVal: e.detail.value
    })
  },
  // 提交反馈
  subfile() {
    const { textVal, imgs } = this.data
    if (!textVal.trim()) {
      wx.showToast({
        title: '文本内容不合法',
        mask: true,
      });
      return
    }
    wx.showLoading({
      title: '上传中',
      mask: true,
    });
    if (imgs.length != 0) {
      imgs.forEach((item, index) => {
        wx.uploadFile({
          url: ' https://images.ac.cn/Home/Index/UploadAction/',
          filePath: item,
          name: 'file',
          formData: {},
          success: (result) => {
            console.log(result);
            wx.hideLoading();
            this.setData({
              textVal:'',
              imgs:[]
            })
            wx.showToast({
              title: '上传成功',
              duration: 1000,
              mask: true,
            });
            wx.navigateBack({
              delta: 1
            });
          },
        });

      })
    } else {
      wx.hideLoading();
      this.setData({
        textVal:"",
        imgs:[]
      })
      wx.showToast({
        title: '上传成功',
        duration: 1000,
        mask: true,
      });
      console.log('模拟上传完成');
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