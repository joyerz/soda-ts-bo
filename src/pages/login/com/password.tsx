import * as React from 'react'
import Form from 'react-conf-form'
import UserManager from '@src/services/userManager'
import fieldsConf from './passwordConf'

type Props = {}

type State = {
  data: any,
  image: {
    src: string,
    uuid: string,
  },
  isLoginning: boolean
}

export default class Code extends React.PureComponent<Props, State> {
  state = {
    data: {},
    image: null,
    isLoginning: false,
  }

  mounted = false

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  onSubmit = (postData: any): void => {
    this.setState({ isLoginning: true }) // 开始禁用登录按钮
    const loginData: any = {
      metadata: {
        mechanism: 'password',
      },
      mobile: postData.username,
      password: postData.password,
      type: 'ADMINISTRATOR',
    }
    UserManager.loginByPassword(
      loginData,
      () => {
        if (this.mounted) {
          const { data } = this.state
          this.setState({
            isLoginning: false, // 启用登录按钮
            data: { ...data },
          })
        }
      }, () => {
        this.setState({ isLoginning: false }) // 启用登录按钮
      },
    )
  }

  onReset = () => {
  }

  /**
   * on form changes
   */
  onChange = () => {

  }

  render() {
    return (
      <Form
        fields={fieldsConf(this.state.image?.src, this.state.isLoginning)}
        dataSource={this.state.data}
        onSubmit={this.onSubmit}
        onReset={this.onReset}
        onChange={this.onChange}
      />
    )
  }
}
