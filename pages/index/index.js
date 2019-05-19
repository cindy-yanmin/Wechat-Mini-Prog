//index.js
//获取应用实例
wx.cloud.init({})
const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    msg: '\n\n',
    info: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.cloud.init({
      env: 'test-x1dzi'
    })
    var d = new Date()
    if (d.getHours() < 15 || (d.getHours() == 15 && d.getMinutes() < 30)) {
      this.setData({
        info: 'Morning Shift\n' + d.toDateString(),
        isMorning: true
      })
    }
    else {
      this.setData({
        info: 'Night Shift\n' + d.toDateString(),
        isMorning: false
      })
    }
    db.collection('info').doc('MORNING').get().then(res => {
      // res.data 包含该记录的数据
      this.setData({
        msg: "\n Net Sale in Database: "+res.data.sale
      })
    })
  },
  generate: function (e) {
    
    //set up variables
    var revenue = Math.round((e.detail.value.sale - e.detail.value.giftIn) * 100) / 100;
    var cashSale = revenue - e.detail.value.gift
      - e.detail.value.loyalty - e.detail.value.credit - e.detail.value.outside;
    cashSale = Math.round(cashSale * 100) / 100;
    var cash = cashSale - (e.detail.value.petty - e.detail.value.giftIn);
    cash = Math.round(cash * 100) / 100;
    var average = Math.round(e.detail.value.sale / e.detail.value.order * 100) / 100;
    var productivity = Math.round(e.detail.value.sale / e.detail.value.hour * 100) / 100;
    var outside = e.detail.value.outside
    var petty = e.detail.value.petty
    if (outside == '') outside = 0
    if (petty == '') petty = 0
    //save morning shift info into cloud
    if (1) {
      wx.cloud.callFunction({
        name: "writeInfo",
        data: {
          sale: e.detail.value.sale,
          giftIn: e.detail.value.giftIn,
          gift: e.detail.value.gift,
          loyalty: e.detail.value.loyalty,
          credit: e.detail.value.credit,
          order: e.detail.value.order,
          hour: e.detail.value.hour,
          outside: outside,
          petty: petty,
          revenue: revenue,
          cash: cash,
          cashSale: cashSale,
          average: average,
          productivity: productivity
        },
        success(res) {
          console.log("Uploaded Info!")
        },
        fail: console.error
      })
    }
    //save to local storage
    var developer = {
      sale: e.detail.value.sale,
      giftIn: e.detail.value.giftIn,
      gift: e.detail.value.gift,
      loyalty: e.detail.value.loyalty,
      credit: e.detail.value.credit,
      order: e.detail.value.order,
      hour: e.detail.value.hour,
      outside: outside,
      petty: petty,
      revenue: revenue,
      cash: cash,
      cashSale: cashSale,
      average: average,
      productivity: productivity
    }
    wx.setStorageSync('developer', developer)
    //jump page
    wx.navigateTo({
      url: '/pages/result/result'})
  },
  onSubmit: function(e) {
    if (e.detail.value.sale == '' ||
      e.detail.value.giftIn == '' ||
      e.detail.value.gift == '' ||
      e.detail.value.loyalty == '' ||
      e.detail.value.credit == '' ||
      e.detail.value.order == '' ||
      e.detail.value.hour == '') {
      this.setData({
        msg: '\n *PLEASE FILL IN EVERYTHING*'
      })
    }
    else {
      this.generate(e);
    }
  }
})