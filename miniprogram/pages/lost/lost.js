const db = wx.cloud.database()
Page({
  data: {
    page: 0, //预设当前项的值
    isSend: false
  },

  onLoad: function(e) {
    var that = this
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        that.setData({
          openid: res.data
        })
      },
    })
    this.getLost()
    this.getFound()
  },
  onShow: function() {
    this.setData({
      isSend: false
    })
    this.onLoad()
  },
  delete: function(e) {
    var info = e.currentTarget.dataset.t
    console.log(info)
    db.collection('lost').doc(info._id).remove({
      success: function(res) {
        console.log(res.data)
        wx.showToast({
          icon: 'success',
          title: '删除成功',
        })
        that.setData({
          contentlistn: res.data // 页面分配数据
        });
      }
    })
    this.onLoad()
  },
  delete1: function(e) {
    var info = e.currentTarget.dataset.t
    console.log(info)
    db.collection('found').doc(info._id).remove({
      success: function(res) {
        console.log(res.data)
        wx.showToast({
          icon: 'success',
          title: '删除成功',
        })
      }
    })
    this.onLoad()
  },
  //联系方式
  call: function(e) {
    var temp = e.currentTarget.dataset.call
    wx.setClipboardData({
      data: temp.pCall,
      success(res) {
        wx.showToast({
          title: '电话已经复制',
        })
      },
      fail(res) {
        wx.showToast({
          icon: 'none',
          title: '该用户没有输入手机号码!',
        })
      }
    })
  },
  wechat: function(e) {
    var temp = e.currentTarget.dataset.wechat
    wx.setClipboardData({
      data: temp.pWechat,
      success(res) {
        wx.showToast({
          title: '微信号已经复制',
        })
      },
      fail(res) {
        wx.showToast({
          icon: 'none',
          title: '该用户没有输入微信号',
        })
      }
    })
  },
  // 预览图片
  previewImg: function(e) {
    let imgData = e.currentTarget.dataset.img;
    wx.previewImage({
      //当前显示图片
      current: imgData[0],
      //所有图片
      urls: imgData[1]
    })
  },
  getLost: function() {
    var that = this
    db.collection('lost')
      .orderBy('createTime', 'desc') //按发布时间排序
      .get({
        success(res) {
          that.setData({
            dataList: res.data
          })
        },
        fail(res) {
          console.log("请求失败", res)
        }
      })
  },
  getFound: function() {
    var that = this
    db.collection('found')
      .orderBy('createTime', 'desc') //按发布视频排序
      .get({
        success(res) {
          that.setData({
            dataList1: res.data
          })
        },
        fail(res) {
          console.log("请求失败", res)
        }
      })
  },
  //打开分类按钮
  send: function() {
    var that = this
    wx.getStorage({
      key: 'login',
      success: function(res) {
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
  //退出分类按钮
  back: function() {
    this.setData({
      isSend: false,
      isCall: false
    })
  },
  //跳转至发送页面
  send_lost: function() {
    wx.navigateTo({
      url: '../send/send?name=lostlost',
    })
  },
  send_found: function() {
    wx.navigateTo({
      url: '../send/send?name=lostfound',
    })
  },
  // 滚动切换标签样式
  switchTab: function(e) {
    this.setData({
      page: e.detail.current
    });
  },
  // 点击标题切换当前页时改变样式
  swichNav: function(e) {
    var temp = e.target.dataset.page;
    if (this.data.page == temp) {} else {
      this.setData({
        page: temp
      })
    }
  }
})