import * as React from 'react'
import { Icon } from 'antd'
import { VoidFuncT } from '@src/@types/actions'

type ConfigT = {
  sendCodeButtonStatus: {
    enabled: boolean, // 发验证码的按钮可用状态
    count: number // 不可用时的倒计时
  },
  onSendCode: VoidFuncT,
  isLoginning: boolean
}

export default (config: ConfigT): Array<any> => {
  const { sendCodeButtonStatus, onSendCode, isLoginning } = config

  return [
    {
      fields: [
        {
          span: 24,
          label: null,
          key: 'mobile',
          type: 'input',
          display: true,
          props: {
            size: 'large',
            rules: ['required', 'number', 'min_length:11', 'max_length:11'],
            maxLength: 11,
            placeholder: '请输入11位手机号',
            prefix: (
              <Icon
                type="mobile"
                style={{ color: '#85848b', fontSize: '14px' }}
              />
            ),
          },
        },
      ],
    },
    {
      span: 24,
      gutter: 16,
      type: 'field',
      fields: [
        {
          span: 13,
          responsive: { xs: 13, sm: 13, md: 13 },
          label: null,
          key: 'sms',
          type: 'input',
          display: true,
          props: {
            size: 'large',
            rules: ['required'],
            maxLength: 6,
            placeholder: '请输入6位验证码',
            prefix: (
              <Icon type="lock" style={{ color: '#85848b', fontSize: '14px' }} />
            ),
          },
        },
        {
          span: 11,
          responsive: { xs: 11, sm: 11, md: 11 },
          label:
            !sendCodeButtonStatus.enabled && sendCodeButtonStatus.count > 0
              ? `已发送(${sendCodeButtonStatus.count})`
              : '发送短信验证码',
          key: 'sendBtn',
          disabled: !sendCodeButtonStatus.enabled,
          type: 'button',
          display: true,
          props: {
            size: 'large',
            type: 'default',
            block: true,
            onClick: onSendCode,
          },
        },
      ],
    },
    {
      type: 'FooterButtons',
      align: 'center',
      style: {
        border: 'none',
        background: 'none',
        marginTop: 0,
        paddingTop: 31,
      },
      fields: [
        {
          label: '登录',
          key: 'submit',
          props: {
            type: 'primary',
            size: 'large',
            block: true,
            disabled: isLoginning,
          },
        },
      ],
    },
  ]
}
