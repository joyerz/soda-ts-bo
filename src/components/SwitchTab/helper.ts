import { buildRedux } from 'react-redux-creator'
import * as localStore from '@utils/localStore'

export default {}

const SWTICH_TAB_KEY = 'TAB_SWITCH'
export const setIsFromTab = (value: boolean = true) => {
  localStore.save(SWTICH_TAB_KEY, value)
}

let timeId: any = 0
// 判断是否来源于Tab
export const isFromTab = () => {
  const result = localStore.get(SWTICH_TAB_KEY)
  if (result) {
    clearTimeout(timeId)
    timeId = setTimeout(() => localStore.save(SWTICH_TAB_KEY, false), 0)
    return true
  }
  return false
}

const EmptyAction = buildRedux('emptyAction')({})

export const mapDispatchByTab = (config: any) => {
  const newConfig: any = {}
  Object.keys(config).forEach((key: any) => {
    newConfig[key] = (params: any) => {
      const isTab = isFromTab()
      if (isTab) {
        return EmptyAction.start()
      }

      return config[key](params)
    }
  })
  return newConfig
}
