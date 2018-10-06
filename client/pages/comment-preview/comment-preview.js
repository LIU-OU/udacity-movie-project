const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')
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
   * 使用wx.uploadFile()  上传音频到存储桶，并返回在存储桶的地址
   */
  uploadAudio(cb) {
    let audioFilePath = this.data.audioFilePath
    audioFilePath = audioFilePath.replace("http","https")
    console.log(audioFilePath)
    wx.uploadFile({
      url: config.service.uploadUrl,
      filePath: audioFilePath,
      name: 'file',
      success: res => {
        let data = JSON.parse(res.data)
        let audio
        if(!data.code) {
          audio = data.data.imgUrl
          console.log("存储桶音频路径是", audio)
        }
        cb(audio)
      }
    })
  },
  addComment() {
    let content = this.data.commentValue
    if(!content) return
    console.log("开始添加电影评论")
    console.log("content的的内容是", content)

    wx.showLoading({
      title: '正在发表评论'
    })
    this.uploadAudio(audio => {
      console.log("准备存储audio 路径到数据库", audio)
      qcloud.request({
        url: config.service.addComment,
        login: true,
        method: 'PUT',
        data: {
          audio: audio,
          content: content,
          movie_id: this.data.movie.id
        },
        success: result => {
          wx.hideLoading()
          console.log("上传评论到数据库结束")
        }
      })
    })
  },
  onTapBack() {
    wx.navigateBack()
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