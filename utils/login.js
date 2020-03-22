var common = require('./common.js')

function getWXUserInfo() {
  const login = promisify(wx.login);
  const getUserInfo = promisify(wx.getUserInfo);

  return new Promise(function (resolve, reject) {
    _wxLogin();
    function _wxLogin() {
      login().then(function (res) {
        getUserInfo().then(function (r) {
          let userInfo = r;
          userInfo.code = res.code;
          try {
            wx.setStorageSync('userInfo', userInfo);
          } catch (e) {
            console.log(e)
          }
          if (userInfo && userInfo.code && userInfo.iv) {
            resolve(userInfo);
          }
          else {
            reject('wx login fail');
          }
        }).catch(function (error) {
          reject(error);
        });
      }).catch(function (error) {
        reject(error);
      });
    }
  });
}

//登录接口验证
getWXUserInfo().then(function (data) {
  var result = {
    code: 0,
    data: {}
  };
  var params = {
    'code': data.code,
    'userinfo': data.userInfo
  }
  wx.request({
    url: '/api/login',
    data: params,
    dataType: 'json',
    method: 'POST',
    success: function (response) {
      // 返回成功
      if (response.data && response.data.code == '00000') {
        try {
          var resData = {
            custNo: data.user_id,
            nickname: data.nickname
          };
          result.code = 0;
          result.data = resData;
          resolve(result);
        }
        catch (e) {
          console.warn(result)
          // 登录失败
          result.code = 2;
          resolve(result);
        }
      }
      else {
        // 获取 customNum 失败
        console.warn(result)
        result.code = 1;
        result.data = 'get customNum fail';
        resolve(result);
      }
    }
  })
})

module.exports = {
    formatTime: formatTime
};
