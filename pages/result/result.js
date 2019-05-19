// pages/result/result.js
wx.cloud.init({})
const db = wx.cloud.database()

Page({
  data: {
    warn: '\n\n\n',
    msg: '',
    sale: 0,
    giftIn: 0,
    gift: 0,
    loyalty: 0,
    credit: 0,
    outside: 0,
    petty: 0,
    order: 0,
    hour: 0,
    revenue: 0,
    cash: 0,
    cashSale: 0,
    average: 0,
    productivity: 0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var developer = wx.getStorageSync('developer' || []);
    this.setData({
      sale: developer.sale,
      giftIn: developer.giftIn,
      gift: developer.gift,
      loyalty: developer.loyalty,
      credit: developer.credit,
      outside: developer.outside,
      petty: developer.petty,
      order: developer.order,
      hour: developer.hour,
      revenue: developer.revenue,
      cash: developer.cash,
      cashSale: developer.cashSale,
      average: developer.average,
      productivity: developer.productivity
    })
  },

  getTotal: function() {
    var d = new Date()
    if (d.getHours() >= 16 || (d.getHours() == 15 && d.getMinutes() >= 30)) {
      this.setData({
        warn: '\n\nLoading'
      })

      db.collection('info').doc('MORNING').get().then(res => {
        // res.data 包含该记录的数据
        this.setData({
          sale: Math.round((res.data.sale - (-this.data.sale)) * 100) / 100,
          giftIn: Math.round((res.data.giftIn - (-this.data.giftIn)) * 100) / 100,
          gift: Math.round((res.data.gift - (-this.data.gift)) * 100) / 100,
          loyalty: Math.round((res.data.loyalty - (-this.data.loyalty))*100)/100,
          credit: Math.round((res.data.credit - (-this.data.credit)) * 100) / 100,
          outside: Math.round((res.data.outside - (-this.data.outside) * 100) / 100),
          petty: Math.round((res.data.petty - (-this.data.petty)) * 100)/100,
          order: Math.round((res.data.order - (-this.data.order))* 100)/100,
          hour: res.data.hour - (-this.data.hour),
          revenue: Math.round((res.data.revenue - (-this.data.revenue)) * 100) / 100,
          cash: Math.round((res.data.cash - (-this.data.cash)) * 100) / 100,
          cashSale: Math.round((res.data.cashSale - (-this.data.cashSale)) * 100) / 100,
          average: Math.round(((res.data.average - (-this.data.average)) / 2) * 100) / 100,
          productivity: Math.round(((res.data.productivity - 
          (-this.data.productivity)) / 2) * 100) / 100,
          warn: '\nMorning Shift Sale = ' + res.data.sale + '\nINACCURATE IF FALSE'
        })
        console.log("Got Info!")
        console.log(res.data)
      })
    }
    else {
      this.setData({
        warn: '\nO(∩_∩)O Morning shift do NOT\n need to fill out the total column'
      })
    }
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
      
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})