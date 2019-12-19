// @flow
import { pathInfo, replaceto } from '@utils/url'
import { obj2params } from '@utils/objectHelper'
import { ActionModifyT } from '@src/@types/actions'

export default function paginationInit(
  page: number,
  limit: number,
  total: number,
  params: {},
  actionList: ActionModifyT,
  prefix?: string
) {
  return ({
    current: page,
    pageSize: limit,
    total,
    size: 'large',
    pageSizeOptions: ['10', '20', '30', '40', '50'],
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal: showTotal,
    onChange: (page: number, limit: number) => {
      params = {
        ...params,
        page,
        limit,
      }
      actionList(params)
      replaceURL(params, prefix)
    },
    onShowSizeChange: (page: number, limit: number) => {
      params = {
        ...params,
        page,
        limit,
      }
      actionList(params)
      replaceURL(params, prefix)
    },
  })
}

const showTotal = (total: number) => `共 ${total} 条`

const replaceURL = (params: {}, prefix?: string) => {
  if (!prefix) {
    prefix = pathInfo().first
  }
  replaceto(`/${prefix}?${obj2params(params)}`)
}
