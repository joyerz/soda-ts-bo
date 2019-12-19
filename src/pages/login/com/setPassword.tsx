import * as React from 'react'
import Form from 'react-conf-form'
import { Menu } from 'antd'
import { goto } from '@utils/url'
import UserManager from '@src/services/userManager'
import fieldsConfig from './setPasswordConf'

import './setPassword.scss'

type Props = {}

type State = {
  type: string,
  data: {},
  loading: boolean,
}

export default class SetPassword extends React.Component<Props, State> {
  state = {
    type: 'password', // password | sms
    data: {
      username: '用户名',
    },
    loading: false,
  }

  mounted = false

  componentDidMount() {
    this.mounted = true

    if (!UserManager.getToken()) {
      goto('/login')
    }
  }

  componentWillUnmount(): void {
    this.mounted = false
  }

  toggle = (e: any) => this.setState({ type: e.key })

  onSubmit = (data: any) => {
    this.setState({ loading: true })
    UserManager
      .setPasswordImmediately(data.new_password)
      .then(() => this.mounted && this.setState({ loading: false }))
  }

  onReset = () => {

  }

  ignoreSetupPassword = () => UserManager.ignoreSetupPassword()

  render() {
    return (
      <div styleName="container">
        <div styleName="frame">
          <div styleName="title">
            <Menu onClick={this.toggle} selectedKeys={[this.state.type]} mode="horizontal">
              <Menu.Item key="password">
                设置密码
              </Menu.Item>
            </Menu>
          </div>

          <div className="paddingT24">
            <Form
              spinning={this.state.loading}
              labelDirection="vertical"
              fields={fieldsConfig(this.ignoreSetupPassword)}
              dataSource={this.state.data}
              onSubmit={this.onSubmit}
              onReset={this.onReset}
            />
          </div>

        </div>
      </div>
    )
  }
}
