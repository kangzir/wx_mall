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
    isadd:false
  },
  // 获取收货地址
  address(){
    // 获取当前获取地址授权的状态
    wx.getSetting({
      success: (result)=>{
        // 获取状态 为布尔值
        const bllo = result.authSetting['scope.address']
        // 点击确定true 或者为点击undefined都调出 wx.chooseAddress 跳转的收货地址页面
        if(bllo === true||bllo == undefined){
          wx.chooseAddress({
            success: (result1)=>{
              wx.setStorageSync('address', result1);
              this.setData({
                bdaddress : wx.getStorageSync('address')
              })
              
            },
          });
        }else{
          // 点取消进入这个else
          // wx.openSetting 引导用户重新跳转到授权页面
          wx.openSetting({
            success: (result2)=>{
              // 用户授权之后跳转到收货地址页面
            },
          });
        }
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bdaddress : wx.getStorageSync('address')
    })
    
    const data = wx.getStorageSync('cart');
    this.setData({
      goodsInfo:data
    })
    this.calculate()
  },
  // 计算 总价格 总条数 是否全选状态
  calculate(){
    const {goodsInfo} = this.data
    if(goodsInfo){
      const totlsPri = goodsInfo.filter(v => {
        return v.checked
      }).reduce((newvalue,oldvalue) => {
        return newvalue + oldvalue.goods_price * oldvalue.num
      },0)
      // 总条数
      const totallist = goodsInfo.filter( v =>v.checked).length
      // 全选
      const ischecked = goodsInfo.every( v =>{
        return v.checked
      })
      this.setData({
        totlsPri,
        totallist,
        ischecked
      })
    }

  },
  // 点击更改checked的状态
  cartCheck(e){
    const goods_id = e.currentTarget.dataset.id
    const {goodsInfo} = this.data
    // 获取到对应点击的下标
    const index = goodsInfo.findIndex(v => goods_id === v.goods_id)
    // 然后把checked取反
    goodsInfo[index].checked = !goodsInfo[index].checked
    // 重新赋值给本地储存更改
    wx.setStorageSync('cart', goodsInfo);
    // 调用计算函数
    this.calculate()
  },
  // 全选 全不选
  allcheck(){

    const {goodsInfo} = this.data
    const {ischecked} = this.data
    if(goodsInfo.length == 0){
      this.setData({
        ischecked:false
      })
      return
    }else{
      if(ischecked){
        goodsInfo.forEach( v => v.checked = false)
      }else{
        goodsInfo.forEach(v => v.checked = true)
      }
      // 最新的结果重新赋值
      this.setData({
        goodsInfo
      })
      // 最新的结果重新赋值本地
      wx.setStorageSync('cart', goodsInfo);
      // 调用计算函数
      this.calculate()
    }
  },
  // 减
  remonum(e){
    const {goodsInfo} = this.data
    const {id} = e.currentTarget.dataset
    const index = goodsInfo.findIndex(v => id === v.goods_id)
    if(goodsInfo[index].num == 1){
      wx.showToast({
        title: '最少一个',
        duration: 500,
        mask: false,
      });
        return
    }else{
      goodsInfo[index].num--
      this.calculate()
      wx.setStorageSync('cart', goodsInfo);
      this.setData({
        goodsInfo,
        isremo:false
      })
    }
  },
  // 加
  addnum(e){
    const {goodsInfo} = this.data
    const {id} = e.currentTarget.dataset
    const index = goodsInfo.findIndex(v => id === v.goods_id)
    goodsInfo[index].num++
    this.calculate()
    wx.setStorageSync('cart', goodsInfo);
    this.setData({
      goodsInfo
    })
  },
  // 点击去结算
  settlement(){
    const {bdaddress,totallist} = this.data
    if(!bdaddress){
      wx.showToast({
        title: '请选择收货地址',
      });
    }else{
      if(totallist == 0){
        wx.showToast({
          title: '请选择商品',
        });
        return
      }else{
        wx.navigateTo({
          url: '/pages/pay/index'});
      }
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
    this.calculate()
    this.setData({
      goodsInfo:data
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