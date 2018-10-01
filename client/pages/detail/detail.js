// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: [],
    fragText: "", //电影描述的部分内容
    isPart: true, //是否显示部分描述
    isAll: false, //是否显示全部描述，默认false
    isPanel: false, //评论面板是否显示

  },
  //切换描述显示的长短（全部还是部分）
  onTapTextLength() {
    if (this.data.isPart) {
      this.setData({
        isPart: false,
        isAll: true
      })
    } else {
      this.setData({
        isPart: true,
        isAll: false
      })
    }
  },

  //唤出选择评论方式的面板
  onTapCommentPanel() {
    if(!this.data.isPanel) {
      this.setData({
        isPanel: true
      })
    } else {
      this.setData({
        isPanel: false
      })
    }

  },
  //点击白色面板之外的背景区域，取消评论选择块的显示
  modOnTapCommentPanel(event){
    if(event.currentTarget.id == event.target.id) {
      this.onTapCommentPanel()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let movie = {}
    movie.id = options.id
    movie.image = options.image
    movie.title = options.title
    movie.category = options.category
    movie.createTime = options.createTime
    movie.description = options.description
    let fragText = ""
    if (options.description.length < 100) {
      fragText += options.description.slice(0, 70)
      fragText += "  (点击查看全部) ......"
    } else {
      fragText += options.description.slice(0, 100)
      fragText += "  (点击查看全部) ......"
    }
    console.log(movie)
    this.setData({
      movie: movie,
      fragText: fragText
    })

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