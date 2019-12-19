import * as React from 'react'
import { Tabs, Icon } from 'antd'
import { pathInfo, replaceto } from '@utils/url'
import MenuConfig from '@conf/menu'
import * as localStore from '@utils/localStore'
import { separateLineToCamel, isReady } from '@utils/common'
import { MAX_PANES_COUNT } from '@conf/index'
import Children from './children'
import { setIsFromTab } from './helper'

import './index.scss'

const { TabPane } = Tabs

type Props = {
  children: any
}

type State = {
  panes: any[],
  activeKey: string,
  routerReady: boolean
}

export default class SwitchTab extends React.Component<Props, State> {
  mounted = false

  currentURL = ''

  state = {
    panes: [] as any[],
    activeKey: '',
    routerReady: false,
  }

  constructor(props: Props) {
    super(props)
    localStore.save('tabSwitch', false)
  }

  componentDidMount(): void {
    this.mounted = true

    const condition = () => this.props.children.length > 1
    isReady(condition)
      .then(() => this.setState({ routerReady: true }))
  }

  componentWillUnmount(): void {
    this.mounted = false
  }

  findMenuName = (path: string) => {
    let title = ''
    MenuConfig.some((child: any) =>
      child.subMenu.some((item: any) => {
        const camelKey = separateLineToCamel(item.key)
        if (
          camelKey === path
          || camelKey === separateLineToCamel(path)
          || item.key === path
        ) {
          title = item.name
          return true
        }
        return false
      }))
    return title
  }

  isPathInPanes = (path: string = '') => {
    const { panes } = this.state
    const found = panes.filter(item => item.key === path)
    return found.length > 0
  }

  checkCurrentPath = (children: any) => {
    const { panes } = this.state
    const path = pathInfo().first

    const url = window.location.pathname + window.location.search
    if (this.currentURL === url && children.length > 0) {
      return
    }
    this.currentURL = url

    if (path === '') return

    const child1 = children.filter(
      (item: any) => item.key.replace('/', '') === path,
    )[0]
    let child: any
    if (child1 && child1.props && child1.props.render) {
      child = child1.props.render()
    }

    if (this.isPathInPanes(path)) {
      panes.some((item: any, idx: number) => {
        if (item.key === path) {
          if (item.url !== url) {
            const newItem = { ...item }
            newItem.url = url
            newItem.content = child
            panes[idx] = newItem
          }
          return true
        }
        return false
      })
    } else {
      if (panes.length >= MAX_PANES_COUNT) {
        panes.splice(0, 1)
      }
      panes.push({
        key: path,
        url,
        title: this.findMenuName(path),
        content: child,
      })
    }

    setTimeout(() => {
      if (this.mounted) {
        this.setState({
          activeKey: path,
          panes,
        })
      }
    }, 0)
  }

  onChange = (activeKey: string) => {
    const found = this.state.panes.filter((item: any) => item.key === activeKey)
    if (found.length > 0) {
      replaceto(found[0].url)
      setIsFromTab() // 设置为tab切换
    }
    this.setState({ activeKey })
  }

  onEdit = (targetKey: string, action: string) => {
    if (action === 'remove') {
      this.remove(targetKey)
    }
  }

  remove = (targetKey: string) => {
    const { panes, activeKey } = this.state
    let index = panes.findIndex(item => item.key === targetKey)
    panes.splice(index, 1)

    if (targetKey === activeKey) {
      index -= 1
      if (index < 0) {
        index = 0
      }
      const url = panes.length > 0 ? (panes[index]).url : '/'
      if (url === '/') {
        this.currentURL = ''
        setIsFromTab(false) // 设置为tab切换为false
      } else {
        setIsFromTab()
      }
      replaceto(url)

      const key = panes.length > 0 ? (panes[index]).key : ''
      this.setState({
        activeKey: key,
      })
    }
    this.setState({ panes })
  }

  clearTabs = () => {
    replaceto('/')
    this.currentURL = ''
    this.setState({ panes: [], activeKey: '' })
  }

  render() {
    const child = <Children>{this.props.children}</Children>

    const path = pathInfo().first
    if (!this.state.routerReady) {
      return child
    }
    if (path === '') {
      return this.props.children
    }
    this.checkCurrentPath(this.props.children)

    return (
      <div styleName="tab-wrapper">
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onEdit}
          tabBarExtraContent={(
            <span styleName="clearTabs" onClick={this.clearTabs}>
              <Icon type="close" />
              关闭全部
            </span>
          )}
        >
          {this.state.panes.map(pane => (
            <TabPane tab={pane.title} key={pane.key}>
              {pane.content}
            </TabPane>
          ))}
        </Tabs>

        {child}
      </div>
    )
  }
}
