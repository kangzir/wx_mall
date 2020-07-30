// component/Tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabsTap(e) {
      const { index } = e.currentTarget.dataset
      this.setData({
        currentIndex: index
      })
      this.triggerEvent('btnchild',index)
    },
  }
})
