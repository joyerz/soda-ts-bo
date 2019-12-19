import * as React from 'react'
import { Icon } from 'antd'
import { VoidFuncT } from '@src/@types/actions'
import { goto, pathInfo } from '@utils/url'

type ConfigT = {
  img?: string, // 验证码URL
  refreshImageCode?: VoidFuncT, // 生成验证码的方法
  sendCodeButtonStatus: {
    enabled: boolean, // 发验证码的按钮可用状态
    count: number // 不可用时的倒计时
  },
  onSendCode: VoidFuncT
}
export default (config: ConfigT): any[] => {
  const { sendCodeButtonStatus, onSendCode } = config
  return [
    {
      span: 24,
      gutter: 16,
      type: 'field',
      fields: [
        {
          label: null,
          key: 'mobile',
          type: 'input',
          props: {
            size: 'large',
            rules: ['required', 'number', 'min_length:11'],
            maxLength: 11,
            placeholder: '请输入11位手机号',
            prefix: (
              <Icon
                type="mobile"
                style={{ color: '#85848b', fontSize: '14px' }}
              />
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
            rules: ['required', 'min_length:6', 'max_length:16', 'password'],
            placeholder: '请输入6～16新密码',
            maxLength: 16,
            prefix: (
              <Icon type="lock" style={{ color: '#85848b', fontSize: '14px' }} />
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
          span: 13,
          responsive: { xs: 13, sm: 13, md: 13 },
          label: null,
          key: 'sms',
          type: 'input',
          props: {
            size: 'large',
            rules: ['required'],
            maxLength: 6,
            placeholder: '请输入6位验证码',
            prefix: (
              <Icon type="lock" style={{ color: '#85848b', fontSize: '14px' }} />
            ),
          },
          display: true,
        },
        {
          span: 11,
          responsive: { xs: 11, sm: 11, md: 11 },
          label:
            !sendCodeButtonStatus.enabled && sendCodeButtonStatus.count > 0
              ? `已发送(${sendCodeButtonStatus.count})`
              : '发送短信验证码',
          key: 'sendBtn',
          props: {
            size: 'large',
            type: 'default',
            field: 'button',
            display: true,
            block: true,
            onClick: onSendCode,
            addon: (
              <div
                style={{
                  textAlign: 'right',
                  top: 24,
                  position: 'absolute',
                  width: '100%',
                }}
              >
                <a
                  onClick={() =>
                    goto(
                      pathInfo().first === 'forgot'
                        ? '/login#password'
                        : '/login-staff#password',
                    )
                  }
                >
                  <Icon type="left" />
                  &nbsp;返回登录
                </a>
              </div>
            ),
          },
          disabled: !sendCodeButtonStatus.enabled,
        },
      ],
    },
    {
      type: 'FormButtons',
      align: 'center',
      style: { border: 'none', marginTop: 0, paddingTop: 24 },
      fields: [
        {
          label: '提交',
          key: 'submit',
          props: {
            type: 'primary',
            size: 'large',
            block: true,
          },
        },
      ],
    },
  ]
}
