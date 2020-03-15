// pages/commit/commit.js
Page({

  data: {
    pageData: {
      content: "hello world"
    },
    content: '',
    formats: {}, // 样式
    placeholder: '开始输入...',
  },
  onLoad() {
    //that = this;
  },

  /** editor 部分 **/
  getEditorValue(e) {
    this.setData({
      ['formData.content']: e.detail.html
    })
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context;
      wx.showLoading({
        title: '加载内容中...',
      })
      setTimeout(function () {
        let data = that.data;
        wx.hideLoading();
        that.editorCtx.setContents({
          html: data.pageData ? data.pageData.content : '',
          success: (res) => {
            console.log(res)
          },
          fail: (res) => {
            console.log(res)
          }
        })
      }, 1000)
    }).exec()
  },

  //插入分割线
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    })
  },
  format(e) {
    let { name, value } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)
  },
  insertImage() {

    var _this = this;
    wx.showLoading({
      title: '上传中...',
    })
    wx.chooseImage({
      success(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        //执行上传文件操作
        wx.uploadFile({
          url: config.HOME + config.url.uploadFile, //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {},
          success(res) {
            wx.hideLoading();
            app.myToast('上传成功！');
            const data = JSON.parse(res.data);//获取到的json 转成数组格式 进行赋值 和渲染图片
            console.log(data.data.src);
            _this.editorCtx.insertImage({
              src: config.HOME + data.data.src,
              data: {
                id: 'abcd',
                role: 'god'
              },
              success: function () {
                console.log('insert image success')
              }
            })
          },
          fail(e) {
            wx.hideLoading();
            console.log(e);
          },
          complete(e) {
            wx.hideLoading();
            console.log(e);
          }
        })
      }
    })
  },
    /** editor 部分结束 **/

})