import * as React from 'react'
import TableList from '@com/TableList'
import paginationInit from '@utils/paginationHelper'
import { ActionModifyT } from '@src/@types/actions.d'
import TimeLabel from '@com/TimeLabel'
import { simpleClone } from '@utils/objectHelper'
import { getReduxParams } from '@utils/url'
import Detail from './detail'

type Props = {
  list: any,
  actionList: ActionModifyT,
  original: any[]
}

type State = {
  isVisible: boolean,
  lineData: Object
}

export default class extends React.Component<Props, State> {
  state = {
    isVisible: false,
    lineData: {}
  }

  componentDidMount() {
    this.props.actionList(getReduxParams())
  }

  render() {
    const { list, actionList, original } = this.props
    const { isVisible, lineData } = this.state

    return (
      <div className="box marginT20">
        <TableList
          columns={this.columns()}
          dataSource={list?.data.entries}
          loading={list?.loading}
          showSerialNumber={false}
          pagination={paginationInit(
            list?.data.page,
            list?.data.per_page,
            list?.data.total_count,
            list?.params,
            actionList,
            window.location.pathname.replace(/^\//, '')
          )}
        />
        {isVisible && (
          <Detail
            onCancel={this.closeDetail}
            lineData={lineData}
            original={original}
          />
        )}
      </div>
    )
  }

  columns = () => {
    return [
      {
        title: '操作时间',
        dataIndex: 'created_at',
        width: 120,
        render: (text: string | number) => (
          <TimeLabel value={text} type="dateTime" />
        )
      },
      {
        title: '用户名',
        dataIndex: 'username',
        width: 100,
        render: (text: string, record: any) =>
          record.username || record.party?.username || '-'
      },
      {
        title: '手机号',
        dataIndex: 'mobile',
        width: 120,
        render: (text: string, record: any) =>
          record.mobile || record.party?.mobile || '-'
      },
      {
        title: '操作类型',
        width: 100,
        render: (record: any) => <span>{this.getOperateType(record)}</span>
      },
      {
        title: '操作内容',
        width: 120,
        render: (item: Object) => (<a onClick={() => this.openDetail(simpleClone(item))}>查看详情</a>)
      }
    ]
  }

  openDetail = (item: Object) => {
    this.setState({ isVisible: true, lineData: item })
  }

  closeDetail = () => {
    this.setState({ isVisible: false, lineData: {} })
  }

  getOperateType = (item: any) => {
    const before = JSON.parse(item.change_before)
    const after = JSON.parse(item.change_after)
    let type = '编辑'
    if (!before.id && after.id) {
      type = '新增'
    } else if (before.enabled && !after.enabled) {
      type = '删除'
    } else if (before.status === 'ACTIVE' && after.status === 'INACTIVE') {
      type = '禁用'
    } else if (before.status === 'INACTIVE' && after.status === 'ACTIVE') {
      type = '启用'
    }
    // 用户审核专用
    if (item.type === 'manual_audit') type = '审核'
    if (item.type === 'customer_certificate') type = '编辑'

    return type
  }
}
