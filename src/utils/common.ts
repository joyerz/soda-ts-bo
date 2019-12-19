/**
 * return promise that resolve it later after duration seconds
 * @param duration (seconds)
 * @return {Promise}
 */
export const delay = (duration: number = 1): any => new Promise(reslove => {
  setTimeout(() => reslove(), duration * 1000)
})

/**
 * promise 检查条件成立后返回resolve
 * @param condition
 * @param times
 * @return {Promise}
 */
export const isReady = (condition: () => boolean, times: number = 0): any =>
  new Promise(resolve => {
    let count = 0
    const checkReady = () => {
      if (condition()) {
        resolve()
      } else {
        count++
        if (times === 0) {
          setTimeout(checkReady, 200)
        } else if (count < times) {
          setTimeout(checkReady, 200)
        }
      }
    }
    checkReady()
  })

/**
 * @param  target {array} 拆分目标值
 * @return {array}
 */
export function getSelectItems(target: any): Array<any> {
  const alarmRulesItems = []
  for (const k in target) {
    if ({}.hasOwnProperty.call(target, k)) {
      alarmRulesItems.push({ label: target[k], value: k })
    }
  }
  return alarmRulesItems
}

/**
 *  下划线转驼峰
 * @param name
 */
export const underScoreToCamel = (name: string): string =>
  name
    .split('_')
    .map((item, index) => {
      if (item.length > 0) {
        if (index === 0) {
          return item.toLowerCase()
        }
        return item[0].toUpperCase() + item.substring(1).toLowerCase()
      }

      return ''
    })
    .join('')


/**
 * 中划线转驼峰
 * @param name
 */
export const separateLineToCamel = (name: string): string =>
  name
    .split('-')
    .map((item, index) => {
      if (item.length > 0) {
        if (index === 0) {
          return item.toLowerCase()
        }
        return item[0].toUpperCase() + item.substring(1).toLowerCase()
      }
      return ''
    })
    .join('')

/**
 * 截取字符串, 指定字数后显示...
 * @param text
 * @param num
 */
export const stringFormat = (text: string, num: number): string => {
  let newText = text
  if (text.length > num) {
    newText = `${text.substring(0, num)}...`
  }
  return newText
}

/**
 * 换行符转换<br />
 * @param str
 * @return {string}
 */
export const brConvert = (str: string) => str.replace(/\n/g, '<br />')

/**
 * 换行符转换成','连接
 * @param str
 * @return {string}
 */
export const br2arr = (str: string): Array<string> => {
  let newStr: any = str.replace(/\r\n/gi, ',')
  newStr = newStr.replace(/\n/gi, ',')
  const arr = newStr.split(',')
  const result = []
  for (const i of arr) {
    const v = i.trim()
    if (v) {
      result.push(v)
    }
  }
  return result
}

/**
 * 换行符转换成','连接
 * @param str
 * @return {string}
 */
export const br2semi = (str: string): string => {
  const result = br2arr(str)
  return result.join(',')
}

/**
 * 过滤字符串非字母数字的字符，并且转换为大写
 * @param str
 * @return {string}
 */
export const upperCaseNumberCharacter = (str: string | number): string => {
  let newStr: string = str.toString()
  newStr = newStr.replace(/[\W_]/ig, '')
  newStr = newStr.toUpperCase()
  return newStr
}

/**
 * 防抖
 * @param {*} func 执行的方法
 * @param {*} wait 间隔时间
 */
export const debounce = (fn: Function, wait?: number): Function => {
  let timer: number = null
  const timeWait = wait || 200
  return () => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(fn, timeWait)
  }
}

/**
 * 节流
 * @param {*} func
 * @param {*} wait
 */
export const throttle = (fn: Function, wait?: number): Function => {
  let prevTime = Date.now()
  const timeWait = wait || 200
  return () => {
    const now = Date.now()
    if (now > prevTime + timeWait) {
      fn()
      prevTime = now
    }
  }
}

/**
 * document信息 （滚动条位置、可视区域高度、文档高度）
 */
interface DocumentScrollInfo {
  getScrollTop: (e?: any) => number
  getClientHeight: (e?: any) => number
  getScrollHeight: (e?: any) => number
}

const documentScrollInfo: DocumentScrollInfo = {
  // 获取滚动条当前的位置
  getScrollTop: () => {
    let scrollTop = 0
    if (document.documentElement && document.documentElement.scrollTop) {
      scrollTop = document.documentElement.scrollTop
    } else if (document.body) {
      scrollTop = document.body.scrollTop
    }
    return scrollTop
  },
  // 获取当前可视范围的高度
  getClientHeight: () => {
    let clientHeight = 0
    const { body, documentElement }: any = document
    if (body.clientHeight && documentElement.clientHeight) {
      clientHeight = Math.min(body.clientHeight, documentElement.clientHeight)
    } else {
      clientHeight = Math.max(body.clientHeight, documentElement.clientHeight)
    }
    return clientHeight
  },
  // 获取文档完整的高度
  getScrollHeight: () => {
    const { body, documentElement }: any = document
    return Math.max(body.scrollHeight, documentElement.scrollHeight)
  },
}

type LoadMoreT = {
  target?: any,
  handler: Function,
  threshold?: number,
  immediately?: boolean,
}
/**
 * 上拉加载更多
 * @param {DOM} params.target   // 监听目标 默认document.body
 * @param {Function} params.handler   // 滚动到底部触发的事件 handler(resolev, reject),事件完成
 * @param {number} params.threshold   // 距底部多远时（单位 px），触发 handler 事件 默认 30px
 * @param {Boolean} params.immediately   // 立即执行
 * @return {Function} // 返回清除listener方法
 */
export const loadMore = (params: LoadMoreT): any => {
  const {
    target,
    threshold = 100,
    handler,
    immediately,
  } = params

  if (!handler) return

  if (immediately) handler()

  const targetCache: any = target

  const scrollFn = throttle(() => {
    let scrollTop
    let clientHeight
    let scrollHeight
    if (targetCache) {
      scrollTop = targetCache.scrollTop
      clientHeight = targetCache.clientHeight
      scrollHeight = targetCache.scrollHeight
    } else {
      // 没有传目标 获取浏览器的滚动条信息
      scrollTop = documentScrollInfo.getScrollTop()
      clientHeight = documentScrollInfo.getClientHeight()
      scrollHeight = documentScrollInfo.getScrollHeight()
    }

    if (scrollTop + clientHeight >= scrollHeight - threshold) {
      handler()
    }
  }, 10)

  const finalTarget = target || document

  finalTarget.addEventListener('scroll', scrollFn, false)

  return () => {
    // const finalTarget = target || document
    finalTarget.removeEventListener('scroll', scrollFn, false)
  }
}

/* // 开启全屏
export function launchFullscreen (domId: string) {
  const element = document.getElementById(domId)
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen()
  }
}
// 退出全屏
export function existFullScreen () {
  document.exitFullscreen()
} */

/* export const launchFullscreen = (domId: string) => {
  const element = document.getElementById(domId)
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen()
  }
}

export const existFullScreen = () => {
  document.exitFullscreen()
} */
