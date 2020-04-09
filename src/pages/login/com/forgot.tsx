import * as React from 'react'
import { Menu } from 'antd'
import { ActionModifyT, VoidFuncT } from '@src/@types/actions'

import UserManager from '@src/services/userManager'
import { goto } from '@utils/url'
import Form from 'react-conf-form'
import fieldsConf from './forgotConf'
import './forgot.scss'

type PropsT = {
  data: {
    success: boolean,
    loading: boolean,
    error: boolean
  },
  actionSendCode: ActionModifyT,
  actionSendCodeReset: VoidFuncT
}

type StateT = {
  step: number,
  image: {
    src: string,
    uuid: string
  },
  data: { [name: string]: any },
  data1: any,
  count: number, // 发送验证码后的倒计时
  loading: boolean
}

export default class Forgot extends React.PureComponent<PropsT, StateT> {
  state = {
    step: 1,
    image: {
      src: '',
      uuid: '',
    },
    data: {
      mobile: '',
    },
    data1: {},
    count: 0,
    loading: false,
  }

  mounted = false

  componentDidMount() {
    this.mounted = true
  }

  componentDidUpdate(prevProps: any): void {
    // 发送成功后，倒计时
    if (!prevProps.data.success && this.props.data.success) {
      this.sendCodeButtonCount()
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  /**
   * 倒计时
   * @param count
   */
  sendCodeButtonCount = (count: number = 60) => {
    let newCount = count - 1
    if (newCount <= 0) {
      newCount = 0
      this.props.actionSendCodeReset()
    } else {
      setTimeout(() => this.sendCodeButtonCount(newCount), 1000)
    }
    if (this.mounted) {
      this.setState({ count: newCount })
    }
  }

  /**
   * send sms code
   */
  onSendCode = () => {
    this.props.actionSendCode({
      mobile: this.state.data?.mobile,
    })
  }

  /**
   * on form changes
   * @param name
   * @param value
   * @param data
   */
  onChange = (name: string, value: any, data: any) => {
    this.setState({ data })
  }

  /**
   * 判断发送按钮的状态
   * @return {{count: number, enabled: (*|boolean)}}
   */
  checkSendCodeButtonStatus = (): { enabled: boolean, count: any } => {
    const { data } = this.state
    const result = data && data.mobile && data.mobile.length === 11
    return {
      enabled: result && !this.props.data.success,
      count: this.state.count,
    }
  }

  /**
   * 下一步
   * @param data
   */
  onNextStep = (data: any) => {
    this.setState({
      data,
      step: 2,
    })
  }

  /**
   * 提交
   * @param data
   */
  onSubmit = (data: any) => {
    this.setState({ loading: true })

    const { mobile, sms, new_password } = data
    UserManager.setPasswordByCode(mobile, sms, new_password).then((res: any) => {
      if (res === true) {
        goto('/login#password')
      } else if (
        res === '验证码错误'
        || res === '验证码失败次数过多，请重新获取'
      ) {
        this.setState({ loading: false })
      }
    })
  }

  onReset = () => {
  }

  render() {
    const fields = fieldsConf({
      sendCodeButtonStatus: this.checkSendCodeButtonStatus(),
      onSendCode: this.onSendCode,
    })
    return (
      <div styleName="login-form">
        <div styleName="title">
          <Menu selectedKeys={['forgot']} mode="horizontal">
            <Menu.Item key="forgot">忘记密码</Menu.Item>
          </Menu>

          <div className="paddingT24 page-login">
            <Form
              fields={fields}
              dataSource={this.state.data}
              onSubmit={this.onSubmit}
              onChange={this.onChange}
              onReset={this.onReset}
            />
          </div>
        </div>
      </div>
    )
  }
}
