//answer.js
var utils = require('../../utils/util.js')
var request = require('../../utils/request.js')
//var WxParse = require('../../wxParse/wxParse.js');

var app = getApp()
Page({
  data: {
    motto: '融媒体中心小程序版',
    question_id:"",
    answerList: [],
    questionInfo: {}
  },
  //事件处理函数
  bindItemTap: function (event) {
    wx.navigateTo({
      url: '../answer/answer?answer=' + event.currentTarget.dataset.id + '&question=' + this.data.question_id
    })
  },
  //事件处理函数
  bindWriteTap: function () {
    wx.navigateTo({
      url: '../commit/commit?question='+this.data.question_id
    })
  },
  onLoad: function (options) {
    console.log('onLoad')
    this.setData({
      question_id : options.question_id
    })
    //调用应用实例的方法获取全局数据
    this.getData();

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

    request.getRequest('answers/?question=' + this.data.question_id, [],
      function (res) {
        var feed_data = res.data;
        var answer_list = feed_data.results

        for (let i = 0; i < answer_list.length; i++) {
          answer_list[i].content = utils.delHtmlTag(answer_list[i].content)
        }
        feed_data.results = answer_list

        that.setData({
          answerList: feed_data
        });
        
      },
    )

    
  },
  tapName: function(event){
    console.log(event)
  }
})
