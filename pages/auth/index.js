// pages/auth/index.js
import regeneratorRuntime from '../../lib/runtime/runtime';
import {request} from '../../network/request'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // code:'',
  },
  code:'',

   logina(){
    return new Promise((resolve,rejects) =>{
      wx.login({
        timeout:10000,
        success: (res)=>{
          resolve(res)
        },
        fail: (err)=>{rejects(err)},
      });
    })
  },

  async GetUserInfo(e){
    const {encryptedData,iv,rawData,signature} = e.detail

    const {code} = await this.logina()
    const tokenInfo = {encryptedData,iv,rawData,signature,code}
    const data = await request({url:'/users/wxlogin',data:tokenInfo,method:'post'})
    console.log(data);
    if(data.data.meta.status == 400){
      wx.setStorageSync('token', data.data.meta.msg);
      wx.navigateTo({
        url: '/pages/pay/index',
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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