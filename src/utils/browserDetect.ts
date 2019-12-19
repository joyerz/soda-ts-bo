import UserManager from '@src/services/userManager'
import { goto, pathInfo } from '@utils/url'

export default function isMobile() {
  const ua = window.navigator.userAgent.toLowerCase()
  return /(iphone|android|winPhone)/.test(ua)
}

interface UserManager {
  getToken: () => {}
}

/**
 * 检测是否在mobile模式的页面
 */
function detectInMobilePage() {
  const pages = ['forgot', 'set-password', 'login', 'vehicle', 'bind-vehicle', 'change-password']

  if (pages.indexOf(pathInfo().first) === -1) {
    if (UserManager.getToken()) {
      goto('/vehicle')
    } else {
      goto('/login')
    }
  }
}

((function mobileDetect() {
  if (isMobile()) {
    let meta: any = document.getElementById('meta')
    if (meta) return

    meta = document.createElement('meta')
    meta.id = 'meta'
    meta.name = 'viewport'
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1'
    document.head.append(meta)

    detectInMobilePage()
  } else {
    const meta = document.getElementById('meta')
    if (meta) {
      document.head.removeChild(meta)
    }
  }
})())

/**
 * input 失去焦点后 页面显示不完整 兼容
 * @param {*} e
 */
export const blurAdjust = () => {
  setTimeout(() => {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      try {
        let currentPosition = document.documentElement.scrollTop || document.body.scrollTop
        currentPosition -= 1
        window.scrollTo(0, currentPosition) // 页面向上滚动
        currentPosition += 1 // speed变量
        window.scrollTo(0, currentPosition) // 页面向下滚动
      } catch (e) {
        console.log(e)
      }
    }
  }, 100)
}
