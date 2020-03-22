// pages/answer_comment/ansComment.js
var util = require('../../utils/util.js')
var request = require('../../utils/request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    answer_id: "",
    content: "",
    comment_list: [],
    comment_num: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      answer_id: options.answer
    })
    this.getData();
  },

  getData: function () {

    console.log("loaddata");
    var that = this

    request.getRequest('comments/?answer=' + this.data.answer_id, [],
      function (res) {
        var feed_data = res.data;
        that.setData({
          comment_list: feed_data.results,
          comment_num: feed_data.count
        });
      },
    )
  },

  postData: function () {

    console.log("postdata");
    var that = this
    var data={
      answer: this.data.answer_id,
      comment_content: this.data.content
    }

    request.postRequest('comments/', data,
      function (res) {
        var feed_data = res.data;
        var array = []
        array = that.data.comment_list
        array.push(feed_data)

        var count = that.data.comment_num
        count += 1

        that.setData({
          comment_list: array,
          comment_num: count,
          content: "",
        });
      },
      function (error) {
        console.log(error);
      }
    )
  },

  sendPull: function (e) {
    //通过事件接收
    this.setData({
      content: e.detail.content
    })
    this.postData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})