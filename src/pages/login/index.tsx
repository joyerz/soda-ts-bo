// @flow
import * as React from 'react'
import { connect } from 'react-redux-creator'
import { ActionModifyT, VoidFuncT } from '@src/@types/actions'
import { pathInfo } from '@utils/url'
import UserManager from '@src/services/userManager'
import Login from './com/login'
import SetPassword from './com/setPassword'

import Forgot from './com/forgot'
import { sendCodeRedux } from './redux'
import './index.scss'

const logoText = require('../../assets/images/logo-transparent.svg')

type Props = {
  actionSendCode: ActionModifyT,
  actionSendCodeReset: VoidFuncT,
  sendCode: any,
}

class Index extends React.PureComponent<Props> {
  componentDidMount() {
    if (UserManager.isLogin()) {
      UserManager.isSetPassword()
    }
  }

  render() {
    return (
      <div styleName="container">
        <div styleName="wrapper">
          <div styleName="inner">
            <div styleName="logo">
              <img src={logoText} alt="" />
            </div>
            <div styleName="frame">
              { /* 登录 code or password */
                (pathInfo().first === 'login')
                && (
                  <Login
                    sendCode={this.props.sendCode}
                    actionSendCode={this.props.actionSendCode}
                    actionSendCodeReset={this.props.actionSendCodeReset}
                  />
                )
              }

              { /* 忘记密码 */
                (pathInfo().first === 'forgot')
                && (
                  <Forgot
                    data={this.props.sendCode}
                    actionSendCode={this.props.actionSendCode}
                    actionSendCodeReset={this.props.actionSendCodeReset}
                  />
                )
              }

              {false && (
                <div styleName="copyright">
                  Powered by Soda Mobility
                </div>
              )}
            </div>
          </div>
        </div>

        { /* 如果是首次登录，弹出设置密码 */
          (pathInfo().first === 'set-password')
          && <SetPassword />
        }
      </div>
    )
  }
}

export default connect(
  state => ({
    sendCode: state.sendCode,
  }),
  {
    actionSendCode: params => sendCodeRedux.start(params), // send code
    actionSendCodeReset: () => sendCodeRedux.reset(), // reset send code status
  },
)(Index)
