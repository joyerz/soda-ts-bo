// demo例子在vehicleList/com/list.jsx
import * as React from 'react'
import { Icon, Checkbox } from 'antd'

import TableList from '@com/TableList'
import * as localStore from '@utils/localStore'
import { notEmptyValue } from '@utils/common'
import './index.scss'

type Props = {
  columns: Array<any>,
  name: string
}
type State = {
  isVisible: boolean
}

// 应用层传递的columns新增属性：key(用于存储在本地区分字段，默认等于dataIndex)，chooseDisabled(是否允许勾选)
// 传递给TableList的columns新增属性：display(表格是否展示列)
export default class TableListWithHeader extends React.Component<Props, State> {
  state = {
    isVisible: true
  }

  render () {
    const { columns, name } = this.props
    const { isVisible } = this.state
    const localColumns = localStore.get(name)
    const wholeColumns = localColumns || columns
    let tableColumns = []
    wholeColumns.forEach(item => {
      if (!notEmptyValue(item.display) || item.display || item.chooseDisabled) {
        // 查找当前列是否有render，若有需要从columns里提取出来放入tableColumns
        const column = columns.find(ele => (item.dataIndex || item.key) === (ele.dataIndex || ele.key))
        let cur = {...item}
        if (column && column.render) {
          cur.render = column.render
        }
        tableColumns.push(cur)
      }
    })

    return (
      <div>
        <div>

          <div styleName="button-wrapper">
            <span styleName="button-column" onClick={this.onClickBtnColumn}>
              {
                isVisible && <><Icon type="up" className="marginR6" />隐藏列</>
              }
              {
                !isVisible && <><Icon type="down" className="marginR6" />显示列</>
              }
            </span>
          </div>

          {
            isVisible &&
            <div styleName="checkbox-wrapper">
              {
                wholeColumns.map(item => {
                  if (item.title) {
                    return (
                      <Checkbox
                        key={item.dataIndex || item.key}
                        value={item.dataIndex || item.key}
                        disabled={item.chooseDisabled}
                        checked={!notEmptyValue(item.display) || !!item.display}
                        // defaultChecked={item.chooseDisabled}
                        onChange={this.onChangeCheckbox}
                      >{item.title}</Checkbox>)
                  }
                  return null
                })
              }
            </div>
          }

        </div>
        <div styleName="table-wrapper">
          <TableList {...this.props} columns={tableColumns} />
        </div>
      </div>
    )
  }

  onClickBtnColumn = () => {
    this.setState(previous => {
      return {
        isVisible: !previous.isVisible
      }
    })
  }

  onChangeCheckbox = (e: any) => {
    const { value:clickValue, checked:clickChecked } = e.target
    const { name, columns } = this.props
    let beforeColumns = localStore.get(name)
    if (!beforeColumns) { // 初始化
      beforeColumns = columns.map(item => (
        {
          ...item,
          display: 'block'
        }
      ))
    }

    const afterColumns = beforeColumns.map(item => (
      {
        ...item,
        display: clickValue === (item.dataIndex || item.key) ? clickChecked : item.display
      }
    ))

    localStore.save(name, afterColumns) // JSON.stringfy会丢失掉函数、Symble、值为underfined的属性
    this.setState({}) // 触发重render
  }
}
