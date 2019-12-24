import * as React from 'react'
import { Icon, Spin } from 'antd'
import { FilterBoxT } from '@src/@types/com/filterBox.d'

import './index.scss'

export default class index extends React.PureComponent<FilterBoxT, { open: boolean }> {
  static defaultProps = {
    open: true,
    extensible: true,
    loading: false,
  }

  constructor(props: FilterBoxT) {
    super(props)
    this.state = {
      open: props.open,
    }
  }

  toggle = () => {
    if (!this.props.extensible) return
    this.setState(preState => ({ open: !preState.open }))
  }

  render() {
    const {
      title,
      children,
      extensible,
      loading,
    } = this.props
    const { open } = this.state

    return (
      <Spin spinning={loading}>
        <div
          className="box"
          style={{
            height: open ? 'auto' : 64,
            overflow: 'hidden',
          }}
        >
          <div
            className="page-title"
            onClick={this.toggle}
          >
            {title}
            {extensible && <Icon type={open ? 'caret-up' : 'caret-down'} />}
          </div>
          <div styleName="filter-container">
            {children}
          </div>
        </div>
      </Spin>
    )
  }
}
