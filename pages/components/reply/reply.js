// pages/components/reply/reply.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    comment_num: {
      type: Number,
      value: 0,
    },
    comment_list: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    scrollTop: 1,
    lastX: 0,
    lastY: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMoreEvent: function () {

    },

    clear: function (e) {
      console.info(">>>>clear");
      this.setData({
        showReply: false,
      });

    },

    handletouchmove: function (event) {
      console.info(">>>>", event);
      let currentX = event.touches[0].pageX
      let currentY = event.touches[0].pageY
      let tx = currentX - this.data.lastX
      let ty = currentY - this.data.lastY
      if (Math.abs(tx) < Math.abs(ty)) {
        if (ty < 0) {
          this.setData({
            showReply: false,
          });
          console.info("向上滑动" + ty);
        } else if (ty > 0) {
          console.info("向下滑动");
        }
      }

      //将当前坐标进行保存以进行下一次计算

      this.data.lastX = currentX
      this.data.lastY = currentY

    }

  }
})