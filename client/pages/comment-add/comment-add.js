// pages/comment-add/comment-add.js
const recorderManager = wx.getRecorderManager()
const options = {
  sampleRate: 44100,
  numberOfChannels: 1,
  encodeBitRate: 192000,
  format: 'mp3',
  frameSize: 50
}


/**
 * 配置录音相关设置
 */
recorderManager.onStart(() => {
    console.log('recorder start')
  }),
  recorderManager.onPause(() => {
    console.log('recorder pause')
  }),

  recorderManager.onFrameRecorded((res) => {
    const {
      frameBuffer
    } = res
    console.log('frameBuffer.byteLength', frameBuffer.byteLength)
  })


/** ....... */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
    // movie: {
    //   image: "https://udacity-movie-1257363573.cos.ap-chengdu.myqcloud.com/p2504277551.jpg",
    //   title: "至暗时刻 Darkest Hour"
    // },
    commentValue: "", //获取的文字评论
    audioFilePath: "",
    audioDuration: 0,
    commentAudio: [],
    textFocus: false, // 输入文字评论的 input 组件是否自动聚焦
    isRecord: false, // 是否通过录音按钮跳转到本页
    onRecord: false, //是否处于录音状态
    canEntrPrev: false, //当前是否能跳转到影评预览页面
    isAuPlay: false //  是否播放录音样

  },
  //input组件上输入字符触发的事件
  onInput(event) {
    console.log(event.detail.value)
    this.setData({

      commentValue: event.detail.value.trim()
    })
  },
  /**
   * 暂时没有实现录音，以及播放录音功能的复用
   * 等我完成上传影评或录音后再说
   */
  //通过检测是否触摸按钮启动录音或停止录音
  onTouchRecord() {
    this.setData({
      isRecord: true,
      onRecord: true,
    })
    recorderManager.start(options)
  },
  onStopRecord() {
    this.setData({
      isRecord: false,
      onRecord: false
    })
    recorderManager.stop()
    recorderManager.onStop((res) => {
      console.log('recorder stop', res)

      const {
        tempFilePath,
        duration
      } = res
      console.log("获取的录音路径", tempFilePath)
      let secDuration = Math.ceil(duration / 1000)
      this.setData({
        audioDuration: secDuration,
        audioFilePath: tempFilePath
      })



    })

  },

  //播放或停止录音预览的播放
  onTapTurnAudio() {
    if (!this.data.isAuPlay) {
      this.setData({
        isAuPlay: true
      })
    } else {
      this.setData({
        isAuPlay: false
      })
    }
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = false
    innerAudioContext.src = this.data.audioFilePath
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onStop(()=> {
      console.log('停止播放')
      this.setData({
        isAuPlay: false
      })
    })
    innerAudioContext.onEnded(()=> {
      console.log('播放完毕')
      this.setData({
        isAuPlay: false
      })
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
    if(this.data.isAuPlay) {
      innerAudioContext.play()
    }
    if(!this.data.isAuPlay) {
      innerAudioContext.stop()
    }

  },

  //跳转至预览页面
  onTapEntrancePrev() {
    if (this.data.commentValue.length !== 0 || !!this.data.audioFilePath) {
      this.setData({
        canEntrPrev: true
      })
      wx.navigateTo({
        url: `/pages/comment-preview/comment-preview?id=${this.data.movie.id}&image=${this.data.movie.image}&title=${this.data.movie.title}&commentValue=${this.data.commentValue}&audioFilePath=${this.data.audioFilePath}&audioDuration=${this.data.audioDuration}`
      })
    }
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let movie = {}
    movie.image = options.image
    movie.title = options.title
    movie.id = options.id
    this.setData({
      movie: movie
    })

    if (options.showText) {
      this.setData({
        textFocus: true
      })
    }
    if (options.showAudio) {
      this.setData({
        isRecord: true
      })
    }

    // console.log(options.showText)
    // if(options.showText == 'text') {
    //   console.log("233")
    // }



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