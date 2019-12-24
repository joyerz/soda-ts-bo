// @flow

/***
 * ==============================================================
 * 过滤组件 - filter  继承类
 * ==============================================================
 *
 * 配置参数: ***必需***
 * 参数 @prefix -- 路由的一级地址
 *
 * --------------------------------------------------------------
 *
 * props: ***必需***
 * 方法 @actionList(page, limit, params) -- 请求的action
 *
 * --------------------------------------------------------------
 */

import * as React from 'react'
import { replaceto, getReduxParams, pathInfo } from '@utils/url'
import {
  obj2params,
  paramsDateRange2string,
  paramsString2DateRange,
  simpleClone,
} from '@utils/objectHelper'
import { ActionModifyT } from '@src/@types/actions'
import { listConfig } from '@conf/index'

type PropsT = {
  actionList: ActionModifyT
}

type State = {

}

export default class FilterBase<P extends PropsT, S extends State>
  extends React.PureComponent<P, S> {
  prefix: string = ''

  dateRange: Array<any> = []

  componentDidMount() {
    this.prefix = this.prefix || pathInfo().first
    const reduxParams = getReduxParams()
    let params: any = simpleClone(reduxParams)

    this.dateRange.forEach(item => {
      params = paramsString2DateRange(
        params,
        item.dateKey,
        item.fromKey,
        item.toKey,
      )
    })
    params = {
      ...params,
      page: params.page || 1,
      limit: params.limit || listConfig.limit,
    }
    this.props.actionList(params)
  }

  onSubmit = (data: any) => {
    let params: any = getReduxParams()
    const newData = {}
    Object.keys(data).forEach((key: any) => {
      newData[key] = data[key]
    })
    params = {
      page: 1,
      limit: params?.limit || listConfig.limit,
      ...newData,
    }
    this.props.actionList(params)

    this.dateRange.forEach(item => {
      params = paramsDateRange2string(
        params,
        item.dateKey,
        item.fromKey,
        item.toKey,
      )
    })

    replaceto(`/${this.prefix}?${obj2params(params)}`)
  }

  onReset = () => {
    const reduxParams: any = getReduxParams()
    const limit = reduxParams?.limit || listConfig.limit
    const page = reduxParams?.page || 1

    this.props.actionList({ page: 1, limit })
    replaceto(`/${this.prefix}?page=${page}&limit=${limit}`)
  }
}
