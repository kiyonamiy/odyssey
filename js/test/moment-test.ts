import moment from 'moment'
import 'moment/locale/zh-cn'

// const date = moment()
const date = moment()
// console.log(date.calendar()) // Today at 6:12 AM

// console.log('年', date.year()) // 等价 date.weekYear() // console.log(date.years()) // Deprecation warning: years accessor is deprecated. Use year instead.
// console.log('月', date.month()) // 一月 = 0 // console.log(date.months()) // Deprecation warning: months accessor is deprecated. Use month instead.
// console.log('日', date.date()) // console.log(date.dates()) // Deprecation warning: dates accessor is deprecated. Use date instead.
// console.log('小时', date.hour()) // 等价 date.hours()
// console.log('分钟', date.minute()) // 等价 date.minutes()
// console.log('秒', date.second()) // 等价 date.seconds()
// console.log('毫秒', date.millisecond()) // 等价 date.milliseconds()
// console.log('星期', date.day()) // 等价 date.days() date.weekday()  // 但是设置了 zh-cn，weekday()少一天

// console.log('这天在一年中是第几天', date.dayOfYear())
// console.log('这个月总共有多少天', date.daysInMonth())
// console.log('第几周', date.week())
// console.log('未知：返回一个对象', date.creationData())

/**
 * 开始日期 = 当月1号的日期 - 当月1号的星期
   结束日期 = 开始日期 + 42天
 */
// const firstDayOfMonth = date.startOf('month')
// const firstDayWeekDay = firstDayOfMonth.isoWeekday()
// const startDateOfCalendar = firstDayOfMonth.clone().subtract(firstDayWeekDay - 1, 'day')
// const endDateOfCalendar = startDateOfCalendar.clone().add(41, 'day')
// console.log(startDateOfCalendar, startDateOfCalendar.isoWeekday())
// console.log(endDateOfCalendar, endDateOfCalendar.isoWeekday())
const str = '2019-01-28 10,1'
const date1 = moment(str, 'YYYY-MM-DD HH:mm')
console.log(date1)
