import * as React from 'react'
import { VoidFuncT } from '@src/@types/actions'
import { Badge, Icon } from 'antd'
import './forgot.scss'

type ConfigT = {
  img?: string, // 验证码URL
  refreshImageCode?: VoidFuncT, // 生成验证码的方法
  sendCodeButtonStatus: {
    enabled: boolean, // 发验证码的按钮可用状态
    count: number, // 不可用时的倒计时
  },
  onSendCode: VoidFuncT
}

export default (spinning: boolean) => [
  {
    span: 24,
    gutter: 16,
    type: 'field',
    fields: [
      {
        label: null,
        key: 'render',
        type: 'render',
        props: {
          render: () => (
            <div styleName="pwdWarning">
              <span styleName="icon">
                <Icon type="exclamation-circle" />
              </span> 密码为大小写字母+数字的组合，长度6-20位
            </div>
          ),
        },
        display: true,
      },
    ],
  },
  {
    span: 24,
    gutter: 16,
    type: 'field',
    fields: [
      {
        label: null,
        key: 'new_password',
        type: 'inputPassword',
        props: {
          size: 'large',
          rules: ['required', 'min_length:6', 'password'],
          placeholder: '请输入新密码',
          maxLength: 20,
          prefix: <Icon type='lock' style={{ color: '#85848b', fontSize: '14px' }} />,
        },
        display: true,
      },
    ],
  },
  {
    span: 24,
    gutter: 16,
    type: 'field',
    fields: [
      {
        label: null,
        key: 'new_password_confirm',
        type: 'inputPassword',
        props: {
          size: 'large',
          rules: ['required', 'min_length:6', 'password'],
          placeholder: '请再次输入新密码',
          prefix: <Icon type='lock' style={{ color: '#85848b', fontSize: '14px' }} />,
          maxLength: 20,
        },
        display: true,
      },
    ],
  },
  {
    type: 'FooterButtons',
    align: 'center',
    style: { border: 'none', paddingTop: 32 },
    fields: [
      {
        label: '修改密码',
        key: 'submit',
        type: 'primary',
        size: 'large',
        block: true,
        disabled: spinning,
      },
    ],
  },
]
