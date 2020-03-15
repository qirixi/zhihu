//answer.js
var util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    motto: '融媒体中心小程序版',
    userInfo: {},
    questionInfo: {}
  },
  //事件处理函数
  bindItemTap: function() {
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
  //事件处理函数
  bindWriteTap: function () {
    wx.navigateTo({
      url: '../commit/commit'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    this.getData();

    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  getData: function () {
    var question_info = util.getQuestion();
    console.log("loaddata");
    var feed_data = question_info.data;
    this.setData({
      questionInfo: feed_data
    });
  },
  tapName: function(event){
    console.log(event)
  }
})
