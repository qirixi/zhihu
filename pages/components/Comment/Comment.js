Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    maxlength: {
      type: Number,
      value: 150,
    },
    placeholder: {
      type: String,
      value: '请输入评论内容'
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    content: '',//评论内容
    activty: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    bindinput: function (e) {
      this.setData({
        content: e.detail.value,
        activty: e.detail.cursor > 0 ? true : false
      })
    },

    //发送评论
    sendPull: function (e) {
      this.triggerEvent("sendPull", { content: this.data.content, obj: this });
      this.setData({
        content: "",
        activty: false,
      })
    },


  }
})