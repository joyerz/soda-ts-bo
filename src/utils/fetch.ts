import axios from 'axios'
import { message } from 'antd'
import UserManager from '@src/services/userManager'
import { messageActionFailure } from '@utils/messageHelper'
import { API } from '@conf/api'
import { goto } from '@utils/url'
import { NO_REPEAT_POST_API } from '@conf/singlePostAPI'
import { goc } from './objectHelper'

let errorHandler // 先定义
let handleFetchError // 先定义

type Options = {
  url: string,
  method?: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'OPTION',
  data?: any,
  headers?: any,
  noRepeatToken?: any,
}

/**
 * Fetch
 * @param options
 */
export default function doFetch(options: Options) {
  UserManager.checkLoginRouter()
  const {
    url,
    method = 'GET',
    data = null,
    headers = null,
    // noRepeatToken = null,
  } = options
  const config: any = {
    url,
    method,
  }
  if (method !== 'GET' && data) {
    /**
     * 删除空值
     */
    Object.keys(data).forEach((key: any) => {
      const value = data[key]
      if (
        (typeof value === 'string' && value.trim() === '')
        || value === null
        || value === undefined
      ) {
        delete data[key]
      }
    })

    config.data = data
  }
  if (data instanceof FormData) {
    config.headers = { 'Content-Type': 'multipart/form-data' }
  }
  else {
    config.headers = { 'Content-Type': 'application/json' }
  }
  if (headers) {
    config.headers = {
      ...config.headers,
      ...headers,
    }
  }

  const authorizationHeader = UserManager.getRequestHeader()
  if (authorizationHeader) {
    config.headers = config.headers || {}
    // 如果原来header有Authorization, 应该使用原来的
    config.headers.Authorization = config.headers.Authorization || authorizationHeader
  }

  // 如果method 是POST, 并且请求的接口在限制的接口里，加入header token
  if (method === 'POST' && NO_REPEAT_POST_API.indexOf(url) !== -1) {
    config.headers.token = UserManager.getNoRepeatToken()
  }
  // if (noRepeatToken) {
  //   config.headers.token = noRepeatToken
  // }
  // console.log('r', config.headers, noRepeatToken)
  return axios(config)
    .then(res => res.data)
    .catch(err => errorHandler(options, err, url))
}


errorHandler = function (options: any, err: any, url: string) {
  const status = goc(err, 'response.status')
  const status1 = goc(err, 'status')

  if ((status === 406 || status1 === 406)) {
    UserManager.clear()
    goto('/login')
  }
  else if ((status === 401 || status1 === 401)) {
    if (UserManager.getToken()) {
      // 如果本地有token历史
      if (url === API.login.refreshToken) {
        // 如果是刷新token的接口401
        UserManager.clear()
        goto('/login')
        messageActionFailure('refreshTokenFail')
        // throw new Error('登录失效')
      }
      else {
        return UserManager.refreshToken().then((result: any) => {
          // console.log('token', result)
          if (!result) {
            messageActionFailure('refreshTokenFail')
            // throw new Error('登录失效')
          }
          else {
            return doFetch(options)
          }
        })
      }
    }
    else {
      // 如果本地没有有token历史
      messageActionFailure('loginRequired')
    }
  }
  else if (status >= 400 || status1 >= 400) {
    const errorMessage = handleFetchError(err)
    throw new Error(errorMessage)
  } else {
    throw new Error(handleFetchError(err))
  }
}

/**
 * 处理请求错误
 * @param err
 */
handleFetchError = function (err: any) {
  let msg = goc(err, 'response.data.detail.message')
  let errors: any
  if (!msg) {
    errors = goc(err, 'response.data.detail.errors')
    if (errors && errors instanceof Array) {
      msg = goc(errors[0], 'message')
    }
  }
  if (!msg && goc(errors[0], 'message')) {
    if (err.message === 'Network Error') {
      msg = '网络异常!'
    } else {
      msg = err.message
    }
  }

  msg = msg || '未知错误!'
  message.error(msg)
  return msg
}
