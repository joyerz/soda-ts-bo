import UserManager from '@src/services/userManager'
import { messageActionFailure } from '@utils/messageHelper'

const doHttp = (config: { url: string, method?: string }): void => {
  let { url, method = 'GET' } = config
  url = encodeURI(url)
  const request = getRequest()

  /** 添加token */
  const loginDetail = UserManager.getToken()
  let Authorization = ''
  if (loginDetail) {
    Authorization = 'Bearer ' + loginDetail.access_token
  }

  request.onreadystatechange = function(res: any) {
    if (request.readyState == 4) {
      const status = request.status
      if (status >= 200 && status < 300) {
        let name = request.getResponseHeader('content-disposition')
          || request.getResponseHeader('Content-disposition')
          || request.getResponseHeader('Content-Disposition')
        name = decodeURI(name)
        // console.log('name', name, request.getResponseHeader('Content-Disposition'))
        const filename = name.substring(20, name.length)
        if (navigator.appVersion.toString().indexOf('.NET') > 0) {
          const blob = request.response
          window.navigator.msSaveBlob(blob, filename)
        }
        else {
          const blob = request.response
          const elink = document.createElement('a')
          elink.download = filename
          elink.style.display = 'none'
          elink.href = window.URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          document.body.removeChild(elink)
        }
      }
      else {
        try {
          res
            .json()
            .then((res: any) => {
              messageActionFailure(errorMsg(res))
            })
            .catch((err: any) => {
              messageActionFailure(errorMsg(res))
            })
        } catch (err) {
          messageActionFailure(errorMsg(res))
        }
        throw new Error('error')
      }
    }
  }
  request.open('GET', url, true)
  request.responseType = 'blob'
  request.setRequestHeader('Authorization', Authorization) // 头部验证信息 --- 暂时屏蔽
  // request.setRequestHeader('Content-Type', 'application/octet-stream')
  request.setRequestHeader('Content-Type', 'application/vnd.ms-excel')
  request.send()
}

function getRequest() {
  if ((<any>window).ActiveXObject) {
    const ActiveXObject = (<any>window).ActiveXObject
    //IE
    try {
      //IE6以及以后版本中可以使用
      return new ActiveXObject('Msxml2.XMLHTTP')
    } catch (e) {
      //IE5.5以及以后版本可以使用
      return new ActiveXObject('Microsoft.XMLHTTP')
    }
  }
  else if ((<any>window).XMLHttpRequest) {
    const XMLHttpRequest = (<any>window).XMLHttpRequest
    //其他
    return new XMLHttpRequest()
  }
}

const errorMsg = (res: any) => {
  return (
    (res &&
      (res.message ||
        (res.code === 'conflict_with_previous' && '日期冲突') ||
        res.code)) ||
    '未知错误'
  )
}

export default doHttp
