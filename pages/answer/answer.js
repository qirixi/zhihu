//answer.js
var util = require('../../utils/util.js')
var request = require('../../utils/request.js')
var WxParse = require('../../wxParse/wxParse.js');

var app = getApp()
Page({
  data: {
    answer_id: "",
    question_id: "",
    answerer_des: "",
    userInfo: {},
    answerInfo: {},
    questionInfo: {},
    
  },
  //事件处理函数
  toQuestion: function() {
    wx.navigateTo({
      url: '../question/question?question=' + this.data.question_id
    })
  },
  onLoad: function (options) {
    console.log('onLoad')
    this.setData({
      answer_id: options.answer,
      question_id: options.question,
      userInfo: app.globalData.userInfo
    })
    this.getData();
  },
  tapName: function(event){
    console.log(event)
  },
  getData: function () {

    console.log("loaddata");
    var that = this

    request.getRequest('questions/' + this.data.question_id, [],
      function (res) {
        var feed_data = res.data;
        that.setData({
          questionInfo: feed_data
        });
      },
    )

    request.getRequest('answers/' + this.data.answer_id, [],
      function (res) {
        var feed_data = res.data;
        var content = feed_data.content
        WxParse.wxParse('htmlcontent', 'html', content, that, 5);

        var delhtmltag = util.delHtmlTag(content)
        delhtmltag = delhtmltag.substring(0, 20) + "..."
        that.setData({
          answerInfo: feed_data,
          answerer_des: delhtmltag
        });
      },
    )
  },
})
