var apiHost = "http://localhost:8000/";
var tokenKey = "token";
// 登录地址, 根据这个地址来设置token
var logInUrl = "api-token-auth/";
// 例外不用token的地址
var exceptionAddrArr = [
  "api-token-auth/"
];

/** 
 * @param url:String  require(必需) 请求地址相对路径
 * @param data:Object   可选  请求数据
 * @param success:Function  可选   成功回调函数
 * @param fail:Function     可选    失败回调函数
 */
function getRequest(url, data, success, fail) {
  CreateHeader(url, function (header) {
    wx.request({
      url: apiHost + url,
      method: 'GET',
      data: data,
      header: header,
      success: function (res) {
        if (success && typeof success === "function") {
          success(res);
        }
      },
      fail: function (error) {
        if (fail && typeof fail === "function") {
          fail(error);
        } else {
          console.log(error);
        }
      }
    })
  });
}
/** 
 * @param url:String  require(必需) 请求地址相对路径
 * @param data:Object   可选  请求数据
 * @param success:Function  可选   成功回调函数
 * @param fail:Function     可选    失败回调函数
 */
function postRequest(url, data, success, fail) {
  CreateHeader(url, function (header) {
    
    wx.request({
      url: apiHost + url,
      method: 'POST',
      data: data,
      header: header,
      success: function (res) {
        if (url === logInUrl) {
          console.log("here");
          console.log(res.data);
        
          wx.setStorage({
            key: tokenKey,
            data: res.data.token
          })
        }
        if (success && typeof success === "function") {
          success(res);
        }
      },
      fail: function (error) {
        if (fail && typeof fail === "function") {
          fail(error);
        } else {
          console.log(error);
        }
      }
    })
  });
}

/** 
 * @param url:String    请求地址(根据请求地址判断是否添加token)
 * @param complete:Function 回调函数
 */
function CreateHeader(url, complete) {
  var header = {
    'content-type': 'application/json'
  }
  if (exceptionAddrArr.indexOf(url) == -1) {  //排除请求的地址不需要token的地址
    wx.getStorage({
      key: tokenKey,
      success: function (res) {
        header.Authorization = 'JWT ' + res.data;
      },
      fail: function (error) {
        console.log(error);
      },
      complete: function () {
        complete && typeof complete === 'function' ? complete(header) : null;
      }
    });
  } else {
    complete && typeof complete === 'function' ? complete(header) : null;
  }
}

module.exports = {
  apiHost: apiHost
};

module.exports.getRequest = getRequest;
module.exports.postRequest = postRequest;
module.exports.CreateHeader = CreateHeader;

