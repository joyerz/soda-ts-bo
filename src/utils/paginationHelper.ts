import { pathInfo, replaceto } from '@utils/url'
import { obj2params } from '@utils/objectHelper'
import { ActionModifyT } from '@src/@types/actions'

const showTotal = (total: number) => `共 ${total} 条`

const replaceURL = (params: {}, prefix?: string) => {
  let newPrefix = prefix
  if (!prefix) {
    newPrefix = pathInfo().first
  }
  replaceto(`/${newPrefix}?${obj2params(params)}`)
}

export default function paginationInit(
  page: number,
  limit: number,
  total: number,
  params: {},
  actionList: ActionModifyT,
  prefix?: string,
) {
  return ({
    current: page,
    pageSize: limit,
    total,
    size: 'large',
    pageSizeOptions: ['10', '20', '30', '40', '50'],
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal,

    onChange: (newPage: number, newLimit: number) => {
      const newParams = {
        ...params,
        page: newPage,
        limit: newLimit,
      }

      actionList(newParams)
      replaceURL(newParams, prefix)
    },

    onShowSizeChange: (newPage: number, newLimit: number) => {
      const newParams = {
        ...params,
        page: newPage,
        limit: newLimit,
      }

      actionList(newParams)
      replaceURL(newParams, prefix)
    },
  })
}
