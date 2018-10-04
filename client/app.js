//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

let globalUserInfo

const UNPROMPTED = 0
const UNAUTHORIZED = 1
const AUTHORIZED = 2

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
       
        console.log("app onLoauch 周期函数 获取全局变量 globalUserInfo", globalUserInfo)
    },

    data: {
        locationAuthType: UNPROMPTED,
        userInfo: globalUserInfo
    },

    login({
        success,
        error
    }) {
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo'] === false) {

                    this.data.locationAuthType = UNAUTHORIZED
                    // 已拒绝授权
                    wx.showModal({
                        title: '提示',
                        content: '请授权我们获取您的用户信息',
                        showCancel: false
                    })
                    error && error()
                } else {
                    this.data.locationAuthType = AUTHORIZED
                    this.doQcloudLogin({
                        success,
                        error
                    })
                }
            }
        })
    },

    doQcloudLogin({
        success,
        error
    }) {
        // 调用 qcloud 登陆接口
        qcloud.login({
            success: result => {
                console.log("第一次调用登陆接口登陆 result", result)
                if (result) {
                    globalUserInfo = result
                    let userInfo = result
                    success && success({
                        userInfo
                    })
                } else {
                    // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
                    this.getUserInfo({
                        success,
                        error
                    })
                }
            },
            fail: () => {
                error && error()
            }
        })
    },

    getUserInfo({
        success,
        error
    }) {
        if (globalUserInfo) {
            console.log("使用getUserInfo时全局变量globalUserInfo 存在",globalUserInfo)
            return success && success({
                userInfo:globalUserInfo
            })
        }

        qcloud.request({
            url: config.service.user,
            login: true,
            success: result => {
                let data = result.data
                console.log("不是第一次登陆，重新发起获取个人信息的请求",data)

                if (!data.code) {
                    let userInfo = data.data
                    globalUserInfo = userInfo
                    //通过这里的设置，设置一次全局个人信息后可以在其它页面通过全局对象获取
                    this.data.userInfo =userInfo
                    console.log("设置的全局个人信息", globalUserInfo)

                    success && success({
                        userInfo
                    })
                } else {
                    error && error()
                }
            },
            fail: () => {
                error && error()
            }
        })
    },

    checkSession({
        success,
        error
    }) {
        if (globalUserInfo) {
            return success && success({
                userInfo:globalUserInfo
            })
        }

        wx.checkSession({
            success: () => {
                this.getUserInfo({
                    success: res => {
                        let userInfo = res.userInfo
                        globalUserInfo = userInfo
                        this.data.userInfo = userInfo

                        success && success({
                           userInfo
                        })
                        console.log("处于会话期间")
                    },
                    fail: () => {
                        error && error()
                    }
                })
            },
            fail: () => {
                error && error()
            }
        })
    },
})