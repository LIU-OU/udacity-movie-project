const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
    userInfo: {},
    audioFilePath: "",
    audioDuration: 0,
    commentValue: "",

    isRecord: false,
    onRecord: false,
    isAuPlay: false

  },

  /**
   * 实现录音及播放录音 功能，但还没思考完成代码复用
   * 
   * ......
   */

  //播放或停止录音预览的播放
  onTapTurnAudio() {
    if (!this.data.isAuPlay) {
      console.log('开始k播放')
      this.setData({
        isAuPlay: true
      })
    } else {
      console.log('暂停k播放')
      this.setData({
        isAuPlay: false
      })
    }
    console.log("播放录音的路径", this.data.audioFilePath)
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = false
    innerAudioContext.src = this.data.audioFilePath
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onStop(() => {
      console.log('停止播放')
      this.setData({
        isAuPlay: false
      })
    })
    innerAudioContext.onEnded(() => {
      console.log('播放完毕')
      this.setData({
        isAuPlay: false
      })
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
    if (this.data.isAuPlay) {
      innerAudioContext.play()
    }
    if (!this.data.isAuPlay) {
      innerAudioContext.stop()
    }

  },
  /** ............................... */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let movie = {}
    movie.id = options.id
    movie.image = options.image
    movie.title = options.title
    this.setData({
      movie: movie,
      userInfo: app.data.userInfo,
      audioFilePath: options.audioFilePath,
      audioDuration: options.audioDuration,
      commentValue: options.commentValue
    })
    console.log("全局变量userInfo", app.data.userInfo)
    console.log("影评预览页面，录音路径是", options.audioFilePath)


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