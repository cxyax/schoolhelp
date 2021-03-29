const db = wx.cloud.database()
var util = require('../util/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSend: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
      },
    })
    db.collection('biaobai')
      .orderBy('createTime', 'desc') //按发布时间排序
      .get({
        success(res) {
          console.log("请求成功", res.data[0].info)
          that.setData({
            dataList: res.data
          })
          console.log(that.data.dataList[0])
        },
        fail(res) {
          console.log("请求失败", res)
        }
      })
  },
  //获取输入内容
  getInput1(event) {
    console.log("输入的对象", event.detail.value)
    this.setData({
      to: event.detail.value
    })
  },
  getInput2(event) {
    console.log("输入的称呼", event.detail.value)
    this.setData({
      writer: event.detail.value
    })
  },
  getInput3(event) {
    console.log("输入的内容", event.detail.value)
    this.setData({
      info: event.detail.value
    })
  },
  //打开弹窗
  send: function () {
    var that = this
    wx.getStorage({
      key: 'login',
      success: function (res) {
        if (res.data) {
          that.setData({
            isSend: true
          })
        } else {
          wx.showToast({
            icon: "none",
            title: '你还未登录'
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          icon: "none",
          title: '你还未登录'
        })
      }
    })
  },
  // 关闭弹窗
  close: function () {
    this.setData({
      isSend: false
    })
  },
  //上传数据
  publish: function () {
    let writer = this.data.writer
    let to = this.data.to
    let info = this.data.info
    var likeNumber = 1
    console.log(likeNumber)
    if (!to) {
      wx.showToast({
        icon: "none",
        title: '对象不能为空'
      })
      return
    }
    if (!writer) {
      wx.showToast({
        icon: "none",
        title: '称呼不能为空'
      })
      return
    }
    if (!info || info.length < 6) {
      wx.showToast({
        icon: "none",
        title: '内容要多于六个字'
      })
      return
    }
    wx.showLoading({
      title: '发布中...',
    })
    wx.cloud.callFunction({
      name: 'love',
      data: {
        info: this.data.info,
        to: this.data.to,
        writer: this.data.writer,
        sendTime: util.formatTime(new Date())
      },
      success: res => {
        wx.hideLoading()
        wx.showToast({
          title: '发布成功',
        })
        console.log('发布成功', res)
        this.setData({
          isSend: false
        })
        this.onLoad()
        this.setData({
          to: null,
          writer: null,
          info: null
        })
      },
      fail: err => {
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: '网络不给力....'
        })
        console.error('发布失败', err)
      }
    })
    // db.collection('biaobai').add({
    //   data: {
    //     createTime: new Date(),
    //     info: this.data.info,
    //     to: this.data.to,
    //     writer: this.data.writer,
    //     sendTime: util.formatTime(new Date())
    //   },
    //   success: res => {
    //     wx.hideLoading()
    //     wx.showToast({
    //       title: '发布成功',
    //     })
    //     console.log('发布成功', res)
    //     this.setData({
    //       isSend: false
    //     })
    //     this.onLoad()
    //   },
    //   fail: err => {
    //     wx.hideLoading()
    //     wx.showToast({
    //       icon: 'none',
    //       title: '网络不给力....'
    //     })
    //     console.error('发布失败', err)
    //   }
    // })

  },
  delete: function (e) {
    var info = e.currentTarget.dataset.t
    console.log(info)
    db.collection('biaobai').doc(info._id).remove({
      success: function (res) {
        console.log(res.data)
        wx.showToast({
          icon: 'success',
          title: '删除成功',
        })
      }
    })
    this.onLoad()
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