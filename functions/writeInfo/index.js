// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection("info").doc('MORNING').set({
    data: {
      sale: event.sale,
      giftIn: event.giftIn,
      gift: event.gift,
      loyalty: event.loyalty,
      credit: event.credit,
      order: event.order,
      hour: event.hour,
      outside: event.outside,
      petty: event.petty,
      revenue: event.revenue,
      cash: event.cash,
      cashSale: event.cashSale,
      average: event.average,
      productivity: event.productivity
    }
  })
}