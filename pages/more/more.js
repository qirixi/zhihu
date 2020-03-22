var request = require('../../utils/request.js')
//logs.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: ''
    })
  },
  onLoad: function () {
    console.log('onLoad')
  
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } 
  },
  login: function (e) {
    console.log(e)
    var that = this;
    if (!e.detail.userInfo) {
      console.log("登陆失败！");
      return;
    }

    var data = e.detail.userInfo;
    wx.login({
      success: function (res) {
        if (!res.code) {
          console.log("登陆失败：login code获取失败！");
          return;
        }
        data['code'] = res.code;
        request.postRequest('api-token-auth/',data,
          function(res){
            let res_data = res.data
            app.globalData.userInfo = res_data.userInfo
            that.setData({
              userInfo: res_data.userInfo,
              hasUserInfo: true
            })
          },
        )
      }
    });
    
  }
})