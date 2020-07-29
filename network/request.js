export const request = (params) => {
  return new Promise((resolve, rejects) => {
    wx.request({
      ...params,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        rejects(err)
      }
    });
  })
}