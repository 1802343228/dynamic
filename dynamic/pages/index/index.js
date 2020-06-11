// pages/message/message.js
const api = require('../../utils/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData : 0,
    dynamic:[]
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
   */
  onShow: function () {
    api.getDynamic({
      currentPage: 1,
	    pageSize: 10
    }).then(res => {
      if(res.code ==1 ){
        console.log(res.data)
        this.setData({
          dynamic:res.data
        })
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

  },
  checkPost:function() {
    wx.navigateTo({
      url: '/pages/index/alimni_post/alimni_post',
    })
  },
  checkMess:function() {
    wx.navigateTo({
      url: '/pages/index/alimni_message/alimni_message',
    })
  },
  checkFollow:function() {
    wx.navigateTo({
      url: '/pages/index/alimni_post/alimni_post',
    })
  },
  bindPost:function () {
    wx.navigateTo({
      url: '/pages/index/alimni_post/alimni_post',
    })
  },
  changeInfo:function(e) {
    wx.navigateTo({
      url: '/pages/index/alumni_info/alimni_info?title='+ e.currentTarget.dataset.title +
      '&content=' + e.currentTarget.dataset.content + '&thumbs=' + e.currentTarget.dataset.thumbs,
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function (data) {
            console.log(data)
        },
        acceptData: function (data) {
          console.log(data)
      }
    },
    success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
            data: e.currentTarget.dataset.comment
        }),
        res.eventChannel.emit('acceptData', {
          data: e.currentTarget.dataset.id
      })
    }
    })
  }
})
