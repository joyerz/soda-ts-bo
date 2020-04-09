import { message } from 'antd'
import { history } from 'react-redux-creator'
import md5 from 'blueimp-md5'
import * as localStore from '@utils/localStore'
import { getPath, goto, isLoginPage } from '@utils/url'
import doFetch from '@utils/fetch'
import { isReady } from '@utils/common'
import { obj2FormData } from '@utils/objectHelper'
import { API, TOKEN_KEY } from '@conf/index'
import { messageActionFailure, messageActionSuccess } from '@utils/messageHelper'

type HistoryWatcherItemT = {
  name: string,
  cb: () => void,
}

type VoidFuncT = () => void

type UserInfo = {
  loading: boolean,
  data: any,
  message: string | Function,
  passwordSetupRequired: boolean,
  permission: string[]
}

class UserManager {
  // 用户token
  token: {} = null

  // 无需登录的路由地址
  routersWithoutLogin = [
    '/login',
    '/forgot',
    '/set-password',
  ]

  historyWatcher: Array<HistoryWatcherItemT> = []

  // 用户信息
  userInfo: UserInfo = {
    loading: false,
    data: null,
    message: null,
    passwordSetupRequired: false, // 是否需要重设密码
    permission: [],
  }

  tokenRefreshing: boolean = false // 是否在刷新token中

  didFetchUserInfoCallbacks: any[] = [] // 用户权限获取好之后

  afterLogoutCallbacks: any[] = [] // 用户退出之后的操作

  noRepeatToken: any = null // 生成POST存放的唯一TOKEN

  constructor() {
    this.initHistoryWatcher().then(() => {
      if (this.isLogin()) {
        this.fetchUserInfo()
        this.isSetPassword()
      } else if (!this.isInLoginPage()) {
        goto('/login')
      }
    })
  }

  /**
   * 初始化路由的监听
   */
  async initHistoryWatcher() {
    await isReady(() => !!history)
    history.listen(() => {
      this.historyWatcher.forEach((item: HistoryWatcherItemT) => {
        item.cb()
      })
    })
  }

  /**
   * 添加路由变化的操作
   */
  addHistoryWatcher(funcObject: HistoryWatcherItemT): void {
    this.historyWatcher.push(funcObject)
  }

  /**
   * 移除路由变化的操作
   */
  removeHistoryWatcher(name: string): void {
    this.historyWatcher = this.historyWatcher.filter(
      (item: HistoryWatcherItemT) => item.name !== name,
    )
  }

  /**
   * 确保访问的地址是需要登录的
   */
  checkLoginRouter() {
    if (!this.isLogin() && !this.isInLoginPage()) {
      messageActionFailure('loginRequired')
      goto('/login')
    }
  }

  /**
   * 验证码登录
   * @param data
   */
  loginByCode(data: {}, onError: Function, onSuccess: Function) {
    const msg = message.info('登录中...请稍后！', 0)
    doFetch({
      url: API.login.authByCode,
      method: 'POST',
      data: obj2FormData(data),
      headers: {
        Authorization: 'Basic Y29uc29sZTpzZWNyZXQ=',
      },
    })
      .then((res: any) => {
        msg()
        if (onSuccess) onSuccess()
        this.saveToken(res)
        this.fetchUserInfo()
        this.isSetPassword()
      })
      .catch(() => {
        msg()
        if (onError) onError()
      })
  }

  /**
   * 密码登录
   * @param data
   */
  loginByPassword(data: {}, onError?: VoidFuncT, onSuccess?: VoidFuncT) {
    const msg = message.info('登录中...请稍后！', 0)
    doFetch({
      url: API.login.authByCode,
      method: 'POST',
      data: obj2FormData(data),
      headers: {
        Authorization: 'Basic Y29uc29sZTpzZWNyZXQ=',
      },
    })
      .then((res: any) => {
        msg()
        if (onSuccess) onSuccess()
        this.saveToken(res)
        this.fetchUserInfo()
        this.afterLogin()
      })
      .catch(() => {
        msg()
        if (onError) onError()
      })
  }

  /**
   * 修改密码
   * @param data
   */
  changePassword(data: {}, onSuccess?: VoidFuncT, onError?: VoidFuncT) {
    doFetch({
      url: API.system.changePassword,
      method: 'PUT',
      data,
      headers: {
        Authorization: this.getRequestHeader(),
      },
    })
      .then(() => {
        if (onSuccess) onSuccess()
      })
      .catch(() => {
        if (onError) onError()
      })
  }

  /**
   * 是否需要设置密码
   */
  isSetPassword() {
    this.afterLogin() // 暂时默认通过

    // 先屏蔽掉
    // doFetch({
    //   url: API.login.isSetPassword,
    //   method: 'GET',
    // }).then((res: any) => {
    //   // this.refresh() // 获取用户数据
    //   const first = pathInfo().first
    //   if (res && res.value) {
    //     this.userInfo.passwordSetupRequired = true
    //     if (first !== 'set-password') {
    //       goto('/set-password')
    //     }
    //   } else if (this.isInLoginPage()) {
    //     this.afterLogin()
    //   }
    // })
  }

  onAfterLogin() {
    const token = this.getToken()
    if (
      this.userInfo?.data?.password_status === 'INIT'
      && !token.passwordIgnored
    ) {
      goto('/set-password')
    } else if (this.isInLoginPage()) {
      (<any>window).location = getPath('/')
    }
  }

  ignoreSetupPassword() {
    const token = this.getToken()
    if (!token) return

    token.passwordIgnored = true
    this.saveToken(token)
    this.onAfterLogin()
  }

  afterLogin = () => {
    if (isLoginPage()) {
      goto('/') // 如果不是手机，跳转到根上
    }
  }

  /**
   * 设置密码
   */
  async setPassword(new_password: string) {
    try {
      await doFetch({
        url: API.login.setPassword,
        method: 'PUT',
        data: {
          new_password: md5(new_password),
        },
      })
      messageActionSuccess('setPasswordSuccess')
      this.userInfo.passwordSetupRequired = false
      this.afterLogin()
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * 设置新密码(忘记密码)
   */
  setNewPassword = async (phone: string, code: string, new_password: string) => {
    try {
      await doFetch({
        url: API.login.setNewPassword,
        method: 'PUT',
        data: {
          phone,
          sms_code: code,
          new_password: md5(new_password),
        },
      })
      messageActionSuccess('setNewPasswordSuccess')
      return true
    } catch (err) {
      console.log(err.message)
      return err.message
    }
  }

  /**
   * 设置新密码(忘记密码)
   */
  setPasswordByCode = async (mobile: string, code: string, new_password: string) => {
    try {
      const data = {
        mobile,
        new_password,
        $code: code,
      }
      await doFetch({
        url: API.login.changePasswordByCode(mobile),
        method: 'POST',
        data,
      })
      messageActionSuccess('setNewPasswordSuccess')
      return true
    } catch (err) {
      return err.message
    }
  }


  /**
   * 登陆后设置密码
   */
  async setPasswordImmediately(new_password: string) {
    try {
      await doFetch({
        url: API.login.setPasswordImmediately,
        method: 'POST',
        data: { new_password },
      })
      messageActionSuccess('setPasswordSuccess')
      this.ignoreSetupPassword()
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * 刷新token
   */
  async refreshToken() {
    const token: any = this.getToken()
    if (!token) return false

    if (this.tokenRefreshing) {
      await isReady(() => !this.tokenRefreshing)
      return this.getToken()
    }

    this.tokenRefreshing = true

    try {
      const newToken = await doFetch({
        url: API.login.refreshToken,
        method: 'POST',
        data: obj2FormData({
          grant_type: 'refresh_token',
          refresh_token: token.refresh_token,
        }),
        headers: {
          Authorization: 'Basic Y29uc29sZTpzZWNyZXQ=',
        },
      })

      // 如果没有获取到新token
      if (!newToken) {
        throw new Error('刷新token失败')
      }

      this.saveToken(newToken)
      this.tokenRefreshing = false
      return newToken
    } catch (err) {
      this.clear()
      this.tokenRefreshing = false
      setTimeout(() => goto('/login'), 0)
      return false
    }
  }

  /**
   * 获取token
   * @return {*}
   */
  getToken = () => localStore.get(TOKEN_KEY) || null

  /**
   * 存token
   * @param userData
   */
  saveToken(userData: any): void {
    let token = null
    if (userData) {
      const newUserData = { ...userData }
      const currentToken: any = this.getToken()
      const now = Date.now()
      // 如果需要存的token 跟当前token一致，那么只需要更新一下token的时间
      if (
        currentToken
        && currentToken.access_token === newUserData.access_token
        && currentToken.refresh_token === newUserData.refresh_token
        && currentToken.time
      ) {
        newUserData.time = currentToken.time
      } else {
        newUserData.time = now
      }
      newUserData.updateTime = now
      token = newUserData
    }

    localStore.save(TOKEN_KEY, token)
  }

  /**
   * 更新Token的时间
   */
  updateTokenTime() {
    let token = this.getToken()
    token = Object.assign({}, token, { updateTime: new Date().getTime() })
    localStore.save(TOKEN_KEY, token)
  }

  isInLoginPage() {
    const url = (<any>window).location.href
    const found = this.routersWithoutLogin.filter(
      item => url.indexOf(item) !== -1,
    )
    return found.length > 0
  }

  /**
   * 检查是否登录
   * @return {boolean}
   */
  isLogin() {
    // console.log('is login', !!this.getToken())
    return !!this.getToken()
  }

  /**
   * 从服务器获取用户信息
   */
  async fetchUserInfo() {
    const token = this.getToken()
    if (!token) return null

    if (this.userInfo.loading) {
      await isReady(() => !this.userInfo.loading)
    } else {
      this.userInfo.loading = true

      if (!this.userInfo.message) {
        this.userInfo.message = message.loading('正在加载用户信息...', 0)
      }

      // try {
      //   this.userInfo.data = await doFetch({
      //     url: API.login.userData,
      //     method: 'GET',
      //   })
      //   const permission = await doFetch({
      //     url: API.login.permission,
      //     method: 'GET',
      //   })
      //   this.userInfo.permission = this.flatPermission(permission)
      // } catch (err) {
      //   console.log(err)
      // }

      // 临时用户数据
      this.userInfo.data = {
        real_name: 'Joyer',
      }

      if (typeof this.userInfo.message === 'function') this.userInfo.message()
      this.userInfo.message = null
      this.userInfo.loading = false
    }
    this.doUserInfoDidFetch() // 登录并获取用户消息以后执行相关操作
    return this.userInfo.data
  }

  /**
   * 扁平化权限数组
   * @param permission
   * @return {Array}
   */
  flatPermission = (permission: Array<any>): Array<string> => {
    const result: string[] = []
    permission.forEach(item => {
      if (item.base && item.operations && item.operations.length > 0) {
        item.operations.forEach((per: any) => result.push(`${item.base.action}/${per.action}`))
      }
    })
    return result
  }

  getRequestHeader() {
    const token: any = this.getToken()
    if (token) {
      return `Bearer ${token.access_token}`
    }
    return null
  }

  getUserInfo() {
    return this.userInfo.data
  }

  isPermissionReady() {
    return this.userInfo.permission.length > 0
  }

  userInfoDidFetch(cb: () => void): void {
    // if (this.isPermissionReady()) {
    //   this.doUserInfoDidFetch()
    // } else {
    //   this.didFetchUserInfoCallbacks.push(cb)
    // }
    this.didFetchUserInfoCallbacks.push(cb)
  }

  doUserInfoDidFetch() {
    this.didFetchUserInfoCallbacks.forEach(cb => cb())
  }

  /**
   * 是否有权限
   */
  isPermission(str: string): boolean {
    return !!(this.userInfo.permission && str && this.userInfo.permission.indexOf(str) !== -1)
      || true // 先强制返回返回true
  }

  fetchNoRepeatToken() {
    this.noRepeatToken = null
    doFetch({
      url: API.noRepeat.token,
    }).then((token: any) => {
      this.noRepeatToken = token
    })
  }

  getNoRepeatToken() {
    return this.noRepeatToken
  }

  afterLogout(obj: { name: string, cb: any }) {
    this.afterLogoutCallbacks.push(obj)
  }

  removeAfterLogout(name: string) {
    const index = this.afterLogoutCallbacks.findIndex((item: any) => item.name === name)
    this.afterLogoutCallbacks.splice(index, 1)
  }

  didLogout() {
    this.afterLogoutCallbacks.map((item: any) => item.cb())
  }

  logOut = () => {
    this.clear()
    goto('/login')
  }

  clear() {
    this.saveToken(null)
    if (typeof this.userInfo.message === 'function') this.userInfo.message()
    this.userInfo.data = null
    this.userInfo.message = null
    this.userInfo.loading = false
    this.userInfo.permission = []
    this.tokenRefreshing = false
    this.didLogout()
  }
}

export default new UserManager()
// const Instant = (() => {
//   let instant: any = null
//   return () => {
//     if (!instant) {
//       instant = new userManager()
//     }
//     return instant
//   }
// })()()
//
// export default Instant
