// pages/comment-add/comment-add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // movie: {}
    movie: {
      image: "https://udacity-movie-1257363573.cos.ap-chengdu.myqcloud.com/p2504277551.jpg",
      title: "至暗时刻 Darkest Hour"
    },
    textFocus: false,  // 输入文字评论的 input 组件是否自动聚焦
    isRecord: false  // 是否通过录音按钮跳转到本页

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let movie = {}
    // movie.image = options.image
    // movie.title = options.title
    // this.setData({
    //   movie: movie
    // })
    
    // if(options.showText) {
    //   this.setData({
    //     textFocus: true
    //   })
    // }
    // if(options.showAudio) {
    //   this.setData({
    //     isRecord: true
    //   })
    // }

    console.log(options.showText)
    if(options.showText == 'text') {
      console.log("233")
    }
  


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