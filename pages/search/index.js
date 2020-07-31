import { request } from '../../network/request'
import regeneratorRuntime from '../../lib/runtime/runtime';
import {debounce} from '../../utils/util'
Page({
  data: {
    goods: [],
    isShow:true,
    inputVal:''
  },
  Time:0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  getinput(e) {
    const { value } = e.detail
    console.log(value);
    if(!value.trim()){
      this.setData({
        isShow:true,
        goods:[]
      })
      return
    }
    this.setData({
      isShow:false
    })
    clearTimeout(this.Time)
    this.Time = setTimeout(() => {
      this._getgoodsList(value)
    }, 1000);
  },

  async _getgoodsList(query) {
    const { data } = await request({ url: '/goods/qsearch', data: { query } })
    console.log(data);
    this.setData({
      goods: data.message
    })
  },
  getremo(){
    this.setData({
      isShow:true,
      goods: [],
      inputVal:''
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

})