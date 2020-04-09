import * as UUID from 'uuid-js'

/**
 * 对form的数据进行提取到新结构
 * @param handleData form表单提取的data - object
 * @param key: 上传控件（Upload）的name
 */
export const dataFromUploadFiles = (handleData: { [name: string]: any}, key: string): {} => {
  const result: any = {}
  for(let k in handleData) {
    if (k !== key) {
      result[k] = handleData[k]
    }
  }

  result[key] = []
  handleData[key].forEach((image: any) => {
    result[key].push(image.name)
  })
  return result
}

/**
 * 服务端返回的URL数组转换成Upload控件能理解的数组对象
 * @param arr
 * @return {object}
 */
export const imagesArray2UploadFiles = (arr: any[] | null): any[] => {
  if (!arr) return []

  const result: any[] = []
  arr.forEach((item) => result.push(url2fileObject(item)))

  return result
}

/**
 * 将字符串图片地址转换成upload控件需要的object对象
 * @param url
 * @return {{uid: *, name: string, thumbUrl: string, url: string, status: string}}
 */
export const url2fileObject = (url: string) => ({
  name: getFileName(url),
  status: 'done',
  thumbUrl: url,
  url: url,
  uid: (<any>UUID.create()).hex,
})

/**
 * 从服务器地址解析文件名
 * @param url
 * @return {string}
 */
export const getFileName = (url: string): string => {
  const search = url.match(/(\w)+.(\w)+[?]/g)
  return search
    ? search[0].replace('?', '')
    : ''
}
