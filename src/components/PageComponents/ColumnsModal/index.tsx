/**
* @page 表格列配置弹窗
**/
import * as React from 'react'
import { Modal, Checkbox, Row, Col, Spin, Button } from 'antd'

import { simpleClone } from '@utils/objectHelper'
import { ActionModifyT } from '@src/@types/actions'
import './index.scss'

type Props = {
  onCancel: () => void,
  data: any[], // 保证在data有值后再渲染此组件
  wholeColumns: any[],
  isUpdateSuccess: boolean, // 获取操作是否成功
  onReset: () => void, // 操作成功后重置操作状态
  onClose: () => void, // 操作成功后的关闭弹窗
  isLoading?: boolean,
  onSubmit: ActionModifyT,
}

type State = {
  columns: any[]
}

export default class ColumnsModal extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      columns: this.getColumns()
    }
  }

  componentDidUpdate() {
    const { isUpdateSuccess, onReset, onClose } = this.props
    if (isUpdateSuccess) {
      onClose()
      onReset()
    }
  }

  render() {
    const { onCancel, isLoading = false } = this.props

    return (
      <Modal
        title="自定义列"
        visible={true}
        width={500}
        okText="提交"
        onCancel={onCancel}
        onOk={this.submit}
        footer={null}
      >
        <Spin spinning={isLoading}>
          {
            this.state.columns.map((item, index) => (
              <div key={item.columnGroup} styleName="groupDivide">
                <p styleName="groupTitle">{item.columnGroupName}</p>
                <Row>
                  {
                    item.columns.map((item2, index2) => (
                      <Col key={item2.dataIndex} span={8} styleName="checkRow">
                        <Checkbox
                          disabled={item2.fixedDisplay}
                          checked={item2.fixedDisplay ? true : (item2.display || false)}
                          onChange={(e) => this.changeCheckbox(
                            { index, index2, display: e.target.checked }
                          )}
                        >
                          {item2.title}
                        </Checkbox>
                      </Col>
                    ))
                  }
                </Row>
              </div>
            ))
          }
          <div styleName="customBtn">
            <Button onClick={onCancel}>取消</Button>
            <Button type="primary" className="marginL12" onClick={this.submit}>提交</Button>
          </div>
        </Spin>
      </Modal>
    )
  }

  changeCheckbox = ({ index, index2, display }) => {
    let columnsCopy = simpleClone(this.state.columns)
    columnsCopy[index].columns[index2].display = display
    this.setState({ columns: columnsCopy })
  }

  submit = () => {
    let columnsCopy = simpleClone(this.state.columns)
    let result = []
    columnsCopy.forEach(item => {
      result = result.concat(item.columns)
    })
    const { onSubmit } = this.props
    if (onSubmit) {
      onSubmit(result)
    }
  }

  getColumns = (): any[] => {
    const { wholeColumns } = this.props
    const dataCopy = simpleClone(this.props.data || [])
    // 先按组分类
    let columnsByGroup = []
    wholeColumns.forEach((item, index) => {
      if (item.columnGroup !== 'action') { // 跳过操作列
        columnsByGroup.push({
          columnGroup: item.columnGroup,
          columnGroupName: item.columnGroupName,
          columns: []
        })
        item.columns.forEach((item2, index2) => {
          columnsByGroup[index].columns.push({
            fixedDisplay: item2.fixedDisplay,
            display: item2.display,
            title: item2.title,
            dataIndex: item2.dataIndex,
          })
          const findColumn = dataCopy.find(column => item2.dataIndex === column.dataIndex)
          if (findColumn) {
            columnsByGroup[index].columns[index2].display = findColumn.display
          }
        })
      }
    })
    return columnsByGroup
  }

}
