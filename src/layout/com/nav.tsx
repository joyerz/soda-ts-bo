import * as React from 'react'
import { Menu, Icon } from 'antd'
import { pathInfo, goto } from '@utils/url'
import menuConfig from '@conf/menu'
import UserManager from '@src/services/userManager'

import './nav.scss'

const SubMenu = Menu.SubMenu

export default class Nav extends React.Component<{ collapsed: boolean }, any> {
  mounted = false

  state = {
    defaultSeletedKey: [pathInfo().first],
    openKeys: [], // 存放一级菜单key
    selectedKeys: [], // 存放二级菜单key
  }

  rootSubmenuKeys = [] // 存放一级菜单key

  componentDidMount(): void {
    this.mounted = true
    UserManager.addHistoryWatcher({
      name: 'nav-router-change',
      cb: () => {
        this.initMenu()
      },
    })

    // 用户登录以后
    UserManager.userInfoDidFetch(() => {
      if (this.mounted) {
        this.setState({})
      }
    })

    UserManager.afterLogout({
      name: 'nav-logout',
      cb: () => {
        if (this.mounted) {
          this.initMenu()
          this.setState({})
        }
      },
    })

    this.initMenu()
  }

  componentWillUnmount(): void {
    this.mounted = false
    UserManager.removeHistoryWatcher('nav-router-change')
    UserManager.removeAfterLogout('nav-logout')
  }

  initMenu = () => {
    // 直接网址进入页面，高亮对应菜单
    const path: string = window.location.pathname ? window.location.pathname : ''
    // console.log('path', path)
    if (!path) return

    let openKey = ''
    let selectedKey = ''
    menuConfig.forEach((menu: any) => {
      // 有二级菜单
      if (menu.subMenu) {
        menu.subMenu.some((subMenu: any) =>
          subMenu.path.some((p: string) => {
            if (p === path) {
              openKey = menu.key
              selectedKey = subMenu.key
              return true
            }
            if (p.indexOf(':') !== -1) {
              const idx = p.indexOf(':')
              if (p.substring(0, idx) === path.substring(0, idx)) {
                openKey = menu.key
                selectedKey = subMenu.key
                return true
              }
            }
            return false
          }))
      } else {
        // 只有一级菜单
        menu.path.some((p: string) => {
          if (p === path) {
            openKey = menu.key
            selectedKey = menu.key
            return true
          }
          if (p.indexOf(':') !== -1) {
            const idx = p.indexOf(':')
            if (p.substring(0, idx) === path.substring(0, idx)) {
              openKey = menu.key
              selectedKey = menu.key
              return true
            }
          }
          return false
        })
      }
    })
    const { openKeys } = this.state
    openKeys.push(openKey)

    this.setState({
      selectedKeys: [selectedKey],
      openKeys: [...new Set(openKeys)],
    })
  }

  /* getMenu = () => {
   const result = []
   menuConfig.map(item => {
   result.push(
   <Menu.Item key={item.key} onClick={() => {
   goto(item.path[0])
   }}>
   <Icon type={item.icon} />
   <span>{item.name}</span>
   </Menu.Item>
   )
   })
   return result
   }*/
  getMenu = () => {
    const result = []
    menuConfig.forEach((group: any) => {
      if (group.subMenu) {
        const subMenu = this.getSubMenu(group.subMenu)
        if (subMenu.length > 0) {
          this.rootSubmenuKeys.push(group.key)
          result.push(
            <SubMenu
              key={group.key}
              title={(
                <span styleName="title">
                  <Icon type={group.icon} />
                  <span>{group.name}</span>
                </span>
              )}
            >
              {subMenu}
            </SubMenu>,
          )
        }
      } else {
        result.push(
          <Menu.Item
            key={group.key}
            onClick={() => goto(group.path[0])}
          >
            <span styleName="title">
              <Icon type={group.icon} />
              <span>{group.name}</span>
            </span>
          </Menu.Item>,
        )
      }
    })
    return result
  }

  getSubMenu = (subMenu: Array<any>): Array<any> => {
    const result = []
    subMenu.forEach((item: any) => {
      if (UserManager.isPermission(item.permission)) {
        result.push(
          <Menu.Item
            key={item.key}
            onClick={() => goto(item.path[0])}
            // onClick={() => this.props.onClickMenu(item.key)}
          >
            {item.name}
          </Menu.Item>,
        )
      }
    })
    return result
  }

  onOpenChange = (openKeys: Array<any>) => {
    this.setState({ openKeys })
  }

  // 点击二级菜单项
  onClickItem = (tt: any) => {
    this.setState({
      selectedKeys: [tt.key],
    })
  }

  render() {
    const key = pathInfo().first

    return (
      <Menu
        mode="inline"
        theme="dark"
        style={{ paddingBottom: '80px' }}
        defaultSelectedKeys={[key]}

        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        selectedKeys={this.state.selectedKeys}
        onClick={this.onClickItem}

      >
        {this.getMenu()}
      </Menu>
    )
  }
}
