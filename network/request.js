let ajaxTiems = 0
export const request = (params) => {
  // 数据请求是提示
  wx.showLoading({
    title: '加载中',
    mask: true,});
    // 每次请求数据加一
    ajaxTiems++
  const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'
  return new Promise((resolve, rejects) => {
    wx.request({
      ...params,
      url:baseURL + params.url,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        rejects(err)
      },
      complete: ()=>{
        // 每次请求数据减一
        ajaxTiems--
        // 归零证明数据都加载完了
        if(ajaxTiems === 0){
           // 才关闭提示
          wx.hideLoading();
        }
      }
    });
  })
}