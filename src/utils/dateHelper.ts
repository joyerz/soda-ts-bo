// @flow
import * as moment from 'moment'
import { simpleClone } from './objectHelper'

export default {}

/**
 * 时间转换成日期后加上0点0分0秒，返回时间戳
 *
 * @param time
 * @return {number}
 */
export const dayStart = (time: any) =>
  moment(moment(time).format('YYYY-MM-DD') + ' 00:00:00').valueOf()

export const dayEnd = (time: any) =>
  moment(moment(time).format('YYYY-MM-DD') + ' 23:59:59').valueOf()

export const objectDate2Moment = (obj: {[name: string]: any}, keys: string[]) => {
  let p: {[name: string]: any} = {}
  Object.keys(obj).forEach((key) => {
    const item = obj[key]
    if (keys.indexOf(key) !== -1) {
      if (item.constructor.name === 'Array') {
        p[key] = [moment(item[0]), moment(item[1])]
      } else {
        p[key] = moment(item[0])
      }
    } else {
      p[key] = item
    }
  })
  return p
}
