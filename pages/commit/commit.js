// pages/commit/commit.js
var request = require('../../utils/request.js')
var app = getApp()
Page({

  data: {
    pageData: {
      content: ""
    },
    formats: {}, // 样式
    formData: {},
    placeholder: '开始输入...',
  },
  onLoad(options) {
    //that = this;
    console.log(app.globalData.userInfo);
    this.setData({
      ['formData.question']: options.question,
    })
    
  },

  /** editor 部分 **/
  getEditorValue(e) {
    this.setData({
      ['formData.content']: e.detail.html,
      content: e.detail.html
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
        request.CreateHeader("media/", function (header){
          wx.uploadFile({
            url: request.apiHost+"media/", //仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            header: header,
            name: 'src',
            formData: {},
            success(res) {
              wx.hideLoading();
              console.log('上传成功！');
              
              const data = JSON.parse(res.data);//获取到的json 转成数组格式 进行赋值 和渲染图片
              console.log(data.src);
              _this.editorCtx.insertImage({
                src: data.src,
                data: {
                  id: data.id,
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
        })
        
      }
    })
  },
    /** editor 部分结束 **/

  formSubmit: function (e) {
    
    request.postRequest('answers/', this.data.formData,
      function (res) {
        let res_data = res.data
        wx.navigateTo({
          url: '../answer/answer?answer=' + res_data.id
        })
      },
      function (error) {
        console.log(error);
      }
    )
  },
})