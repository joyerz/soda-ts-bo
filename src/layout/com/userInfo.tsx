import * as React from 'react'
import UserManager from '@src/services/userManager'
import { isReady } from '@utils/common'
import { Menu, Dropdown, Icon } from 'antd'
import './userInfo.scss'
// import ChangePassword from '@pages/customerManagement/changePassword/changePassword'

const avatar = require('@assets/images/user/avatar.jpg')

type Props = {}
type State = {
  user: any,
  visible: any
}

export default class userInfo extends React.PureComponent<Props, State> {
  mounted = false

  state = { user: null, visible: false }

  componentDidMount(): void {
    this.mounted = true
    isReady(() => !!UserManager.getUserInfo()).then(
      () => this.mounted && this.setState({ user: UserManager.getUserInfo() }),
    )
  }

  componentWillUnmount(): void {
    this.mounted = false
  }

  menu = () => (
    <Menu>
      <Menu.Item key="0">
        <a
          styleName="menu-item"
          role="button"
          onClick={UserManager.logOut}
        >
          <Icon type="logout" />
          &nbsp; 退出登录
        </a>
      </Menu.Item>
      <Menu.Item key="1">
        <a
          styleName="menu-item"
          role="button"
          onClick={this.toggleModal}
        >
          <Icon type="lock" />
          &nbsp; 修改密码
        </a>
      </Menu.Item>
    </Menu>
  )


  toggleModal = () => this.setState((preState: any) => ({ visible: !preState.visible }))

  render() {
    const { user, visible } = this.state
    return (
      <div styleName="container">
        <Dropdown overlay={this.menu()} trigger={['click']}>
          <a className="ant-dropdown-link" href="#">
            <div styleName="avatar">
              <img src={avatar} alt="user" />
            </div>
            <div styleName="user">
              <div styleName="name">
                {user?.real_name}
              </div>
              <div>
                欢迎使用管理系统
                {false
                && (
                  user
                  && user?.roles
                  && user.roles.map((item, idx) => (idx > 0 ? ', ' : '') + item.name?.ch_name)
                )
                }
              </div>
            </div>
          </a>
        </Dropdown>
        {visible && <span />}
        {/* <ChangePassword viewVisible={visible} onCancel={this.toggleModal} /> */}
      </div>
    )
  }
}
