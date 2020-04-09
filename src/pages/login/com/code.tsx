import * as React from 'react'
import Form from 'react-conf-form'
import { ActionModifyT, VoidFuncT } from '@src/@types/actions'
import UserManager from '@src/services/userManager'
import fieldsConf from './codeConf'

type PropsT = {
  data: {
    success: boolean,
    loading: boolean,
    error: boolean,
  },
  actionSendCode: ActionModifyT,
  actionSendCodeReset: VoidFuncT,
}

type StateT = {
  data: any,
  count: number, // 发送验证码后的倒计时
  isLoginning: boolean // 是否正在登录
}

export default class Code extends React.Component<PropsT, StateT> {
  state = {
    data: {
      mobile: undefined,
    },
    count: 0,
    isLoginning: false,
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
    console.log('sendCode')
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
  checkSendCodeButtonStatus = () => {
    const { data } = this.state
    // const result = data.phone && data.phone.length === 11 && data['verification-pic-code'] &&
    // data['verification-pic-code'].length === 5
    const result = data?.mobile && data?.mobile?.length === 11

    return {
      enabled: result && !this.props.data.success && !this.props.data.loading,
      count: this.state.count,
    }
  }

  /**
   * 登录
   * @param data
   */
  onSubmit = (postData: any) => {
    this.setState({ isLoginning: true }) // 开始禁用登录按钮
    const loginData: any = {
      metadata: {
        mechanism: 'passwordless',
      },
      mobile: postData.mobile,
      $code: postData.sms,
      type: 'ADMINISTRATOR',
    }

    UserManager.loginByCode(
      loginData,
      () => {
        this.setState({ isLoginning: false }) // 启用登录按钮
      },
      () => {
        this.setState({ isLoginning: false }) // 启用登录按钮
      },
    )
  }

  onReset = () => {
  }

  render() {
    const fields = fieldsConf({
      sendCodeButtonStatus: this.checkSendCodeButtonStatus(),
      onSendCode: this.onSendCode,
      isLoginning: this.state.isLoginning,
    })
    return (
      <Form
        validateOnChange={false}
        fields={fields}
        dataSource={this.state.data}
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        onReset={this.onReset}
      />
    )
  }
}
