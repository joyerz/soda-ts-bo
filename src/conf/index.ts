
export const APP_NAME = 'motor' // APP NAME
export const VERSION = '1.0.0' // 版本号
export const TOKEN_KEY = 'USER_DATA' // 用户TOKEN_KEY
export const PUBLIC_FOLDER = process.env.PATH || '' // 发布目录

export { API } from './api'
export const listConfig = {
  limit: 10,
}

export const MAX_PANES_COUNT = 8 // 最大panel/tab数

export const REFRESH_TOKEN_DURATION = 20 * 60 * 1000 // 20 * 60 * 1000 - 再次尝试拉取权限（距离上一次获得TOKEN的时间）
export const EXPIRE_TOKEN_DURATION = 60 * 60 * 1000 * 4 // 登录超时4个小时，TOKEN自动失效

export const DATE_FORMAT = 'YYYY-MM-DD' // 统一日期格式
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss' // 统一日期时间格式

export const AMAP_KEY = '7814baa92465d2200d5fdc03b38d8b86' // 苏打的amap key
