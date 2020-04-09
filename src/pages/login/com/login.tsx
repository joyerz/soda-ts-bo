// @flow
import * as React from 'react'
import { Menu } from 'antd'
import { replaceto } from '@utils/url'
import { ActionModifyT, VoidFuncT } from '@src/@types/actions'
import Code from './code'
import Password from './password'
import './login.scss'

type Props = {
  actionSendCode: ActionModifyT,
  actionSendCodeReset: VoidFuncT,
  sendCode: any,
}

type State = {
  type: string,
}

export default class Login extends React.PureComponent<Props, State> {
  state = {
    type: window.location.hash === '#password' ? 'password' : 'sms', // password | sms
  }

  mounted = false

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount(): void {
    this.mounted = false
  }

  toggle = (e: any) => {
    this.setState({ type: e.key })
    replaceto(`#${e.key}`)
  }

  render() {
    return (
      <div styleName="login-form">
        <div styleName="title">
          <Menu onClick={this.toggle} selectedKeys={[this.state.type]} mode="horizontal">
            <Menu.Item key="sms">
              短信登录
            </Menu.Item>
            <Menu.Item key="password">
              密码登录
            </Menu.Item>
          </Menu>
        </div>

        <div className="paddingT24 page-login" style={{ display: this.state.type === 'sms' ? 'block' : 'none' }}>
          <Code
            data={this.props.sendCode}
            actionSendCode={this.props.actionSendCode}
            actionSendCodeReset={this.props.actionSendCodeReset}
          />
        </div>

        <div className="paddingT24 page-login" style={{ display: this.state.type === 'password' ? 'block' : 'none' }}>
          <Password />
        </div>
      </div>
    )
  }
}
