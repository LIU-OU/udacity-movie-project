// pages/home/home.js
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: [], //电影列表
    userInfo: null
  },
  //获取某个范围随机整数的方法
  selectFrom(lowerValue, upperValue) {
    let choices = upperValue - lowerValue + 1
    return Math.floor(Math.random() * choices + lowerValue)
  },

  /**
   * 随机获取一部电影的详细信息
   */
  getRandomMovie() {
    wx.showLoading({
      title: '电影列表加载中...',
    })
    let randomId = this.selectFrom(1, 15)
    

    qcloud.request({
      url: config.service.movieDetail + randomId,
      login: true,
      success: result => {
        wx.hideLoading()
        let data = result.data
        console.log(data)
        if(!data.code) {
          this.setData({
            movie: data.data
          })
        }
      }
    })

   

    
  },
  /**  
   * 首页随机页面，跳转到当前电影的详情页面
   */
  onTapMovieDetail() {
    let movie = this.data.movie
    wx.navigateTo({
      url: `/pages/detail/detail?id=${movie.id}&title=${movie.title}&image=${movie.image}&category=${movie.category}&createTime=${movie.create_time}&description=${movie.description}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   * app 重新加载的第一个页面是home,所以要在它的周期函数 onShow 中执行
   * 会话检测，在会话检测回调中会正确设置全局 个人信息 userInfo
   * 这样页面在会话期间，一加载首页就可以获取  userInfo  信息，以便使用
   */
  onShow: function () {
    this.getRandomMovie()
    app.checkSession({

      success: ({
        userInfo
      }) => {
        this.setData({
          userInfo
        })
        console.log("检测会话")
        console.log(this.data.userInfo)
      }
    })
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