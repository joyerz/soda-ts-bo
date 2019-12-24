import * as React from 'react'
import {
  Checkbox,
  Select,
  Button,
  message,
} from 'antd'

import './index.scss'

type Props = {
  dataSource: Array<any>, // 数据列表
  checkedKeys: Array<any>, // 已选中的key
  setKeys: Function, // 设置选中key方法
  option: [{
    name: string,
    handler: Function,
  }], // 批量操作列表
}

/**
 * 批量操作
 */
class BatchOperaction extends React.PureComponent<Props, any> {
  state = {
    checkboxGroupVal: [], // 全选 or 反选
  }

  currentOperation: any = null // 当前选中的批量操作

  static defaultProps = {
    dataSource: [],
    checkedKeys: [],
    setKeys: () => {
    },
    option: [{
      name: '批量删除',
      handler: () => console.log('删除操作'),
    }],
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    const [groupval] = prevState.checkboxGroupVal
    if (
      groupval === 'all'
      && nextProps.checkedKeys.length < nextProps.dataSource.length
    ) {
      return {
        checkboxGroupVal: [],
      }
    }
    if (
      groupval !== 'noall'
      && nextProps.dataSource.length
      && nextProps.dataSource.length
      === nextProps.checkedKeys.length
    ) {
      return {
        checkboxGroupVal: ['all'],
      }
    }
    return null
  }

  /**
   * 设置当前选中的操作
   */
  setCurOperation = (e: string) => {
    this.currentOperation = e
  }

  /**
   * 全选/反选
   */
  checkboxHandler = (e: any) => {
    const { setKeys, dataSource, checkedKeys } = this.props
    const [boxval] = e.slice(-1)
    let resultKeys = []
    const allkeys = dataSource.map(item => item.id)
    if (boxval === 'all') { // 全选
      resultKeys = allkeys
    }
    if (boxval === 'noall') { // 反选选中和取消反选都执行反选操作
      resultKeys = allkeys.filter(v => checkedKeys.indexOf(v) !== -1)
    }
    setKeys(resultKeys)
    this.setState({
      checkboxGroupVal: [boxval],
    })
  }

  /**
   * 执行批量操作
   */
  runHandler = () => {
    const { checkedKeys, option } = this.props
    // if (!checkedKeys.length) {
    //   return message.error('请至少选择一条要操作的数据', 1.3)
    // }
    if (!this.currentOperation) {
      return message.error('请选择一个要执行的批量操作', 1.3)
    }
    const [handler] = option.filter(e => e.name === this.currentOperation)
    handler.handler(checkedKeys)
  }

  render() {
    const {
      dataSource,
      option,
      checkedKeys,
    } = this.props

    const { checkboxGroupVal } = this.state

    return (
      <div styleName="box">
        <Checkbox.Group
          onChange={this.checkboxHandler}
          value={checkboxGroupVal}
          disabled={!dataSource.length}
        >
          <Checkbox value="all">全选</Checkbox>
          <Checkbox value="noall">反选</Checkbox>
        </Checkbox.Group>
        <Select
          className="selectel"
          placeholder="批量操作"
          onChange={this.setCurOperation}
          disabled={!dataSource.length}
        >
          {
            option.map(item => (
              <Select.Option key={item.name} value={item.name}>
                {item.name}
              </Select.Option>
            ))
          }
        </Select>
        <Button
          type="danger"
          disabled={!dataSource.length || checkedKeys.length < 1}
          onClick={this.runHandler}
        >
          确定
        </Button>
      </div>
    )
  }
}

export default BatchOperaction
