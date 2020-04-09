import { history } from 'react-redux-creator'
import { PUBLIC_FOLDER } from '@conf/index'
import { pathT } from '@src/@types/utils/url'

/**
 * 获取浏览器路径
 * @return {{first, second, thrid, fourth}}
 */
export const pathInfo = (): pathT => {
  let path: any = (<any>window).location.pathname
  if (PUBLIC_FOLDER !== '') {
    path = path.split(PUBLIC_FOLDER)
    path = path[1]
  }

  const match = /\/([\w-]+)\/?([\w-]+)?(?:\/([\w-]+)?)?(?:\/([\w-]+)?)?/gi.exec(
    path,
  )

  let routes: pathT = {
    first: '',
    second: '',
    third: '',
    fourth: '',
  }
  if (match && match.length > 1) {
    routes = {
      first: match[1] || '',
      second: match[2] || '',
      third: match[3] || '',
      fourth: match[4] || '',
    }
  }

  return routes
}

/**
 * 判断当前是否在登录/重置密码/忘记密码的页面
 * @return {boolean}
 */
export function isLoginPage() {
  const paths = ['login', 'set-password', 'forgot']
  return paths.indexOf(pathInfo().first) !== -1
}

export function getPath(path: string): string {
  return PUBLIC_FOLDER + path
}

/**
 * 跳转
 * @param path
 */
export function goto(path: string): void {
  history.push(getPath(path))
}

/**
 * 地址替换
 * @param path
 */
export function replaceto(path: string): void {
  history.replace(getPath(path))
}

/**
 * 获取浏览器的参数
 * @return {object}
 */
export function getParams() {
  const result: any = {}
  const str = (<any>window).location.search
  const params = new URLSearchParams(str)
  Object.keys(params).forEach((k: any) => { result[k] = params[k] })
  return result
}

/**
 * 获取浏览器的参数，针对page, limit额外提取
 * @return {{page, limit, params}}
 */
export function getReduxParams() {
  const params = getParams()
  const page = params.page
  const limit = params['page-limit']
  delete params.page
  delete params['page-limit']
  return {
    page,
    limit,
    params,
  }
}
