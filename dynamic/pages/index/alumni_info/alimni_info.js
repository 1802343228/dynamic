// pages/message/alumni_info/alimni_info.js
const api = require('../../../utils/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    content: '',
    thumbs: 0,
    isReply: true,
    content: '',
    commentsNum: '',
    pkDynamicId: '',
    comments: [],
    commentsReply: [],
    isComment: false,
    commentContent: '',
    commentId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      title: options.title,
      content: options.content,
      thumbs: options.thumbs,
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
    var that = this
    const eventChannel = that.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
        console.log(data)
        that.setData({
          commentsNum: data.data
        })
      }),
      eventChannel.on('acceptData', function (data) {
        console.log(data)
        that.setData({
          pkDynamicId: data.data
        })
      })
    var id = that.data.pkDynamicId
    wx.request({
      url: 'http://101.37.31.188:8080/dynamic/' + id,
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        if (res.data.code == 1) {
          that.setData({
            comments: res.data.data.commentVoList
          })
          console.log(1111111111)
          console.log(that.data.comments[0].replyComments)
        }
      }
    })

    // for(var i = 0;i<that.data.comments.length;i++){
    //   var replyId = that.data.comments[i].pkCommentId
    //   console.log(replyId)
    //   wx.request({
    //     url: 'http://101.37.31.188:8080/dynamic/comment/'+replyId,
    //     method:'POST',
    //     success:function(res) {
    //       console.log(res.data)
    //       if(res.data.data == 1){
    //         that.data({
    //           commentsReply:res.data.data.replyComments
    //         })
    //         console.log(222222)
    //         console.log(that.data.commentsReply)
    //       }
    //     }
    //   })
    // }

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

  changeReply: function (e) {
    let id = e.currentTarget.dataset.comment
    this.setData({
      isReply: true,
      isComment: true,
      commentId: id
    })
  },

  changeComment: function () {
    this.setData({
      isComment: true,
      isReply: false
    })
  },
  inputContent: function (e) {
    this.setData({
      commentContent: e.detail.value
    })
  },
  sendComment: function () {
    let content = this.data.commentContent
    let id = this.data.pkDynamicId
    console.log(content, id)
    if (this.data.isReply == false) {
      api.insComment({
        content: content,
        dynamicId: id,
        userId: 1
      }).then(res => {
        console.log(res)
        if (res.code == 1) {
          wx.showToast({
            title: '评论成功',
            icon: 'success',
            duration: 1000
          })
          this.onShow
          this.setData({
            commentContent: '',
            isComment: false
          })
        }
      })
    } else {
      let commentId = this.data.commentId
      api.insReply({
        commentId: commentId,
        content: content,
        userId: 1
      }).then( res => {
        if(res.code == 1){
          wx.showToast({
            title: '评论成功',
            icon: 'success',
            duration: 1000
          })
          this.onShow
          this.setData({
            commentContent: '',
            isComment: false
          })
        }
      })
    }
  }
})