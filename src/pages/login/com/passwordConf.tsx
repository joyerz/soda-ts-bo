import * as React from 'react'
import { goto } from '@utils/url'
import { Icon } from 'antd'

export default (img: string, isLoginning: boolean): any[] => [
  {
    type: 'field',
    fields: [
      {
        span: 24,
        label: null,
        key: 'username',
        type: 'input',
        props: {
          size: 'large',
          rules: ['required'],
          placeholder: '请输入11位手机号',
          prefix: (
            <Icon type="mobile" style={{ color: '#85848b', fontSize: '14px' }} />
          ),
          maxLength: 20,
        },
        display: true,
      },
    ],
  },
  {
    type: 'field',
    fields: [
      {
        span: 24,
        label: null,
        key: 'password',
        type: 'inputPassword',
        props: {
          size: 'large',
          rules: ['required'],
          placeholder: '请输入账号密码',
          prefix: (
            <Icon type="lock" style={{ color: '#85848b', fontSize: '14px' }} />
          ),
        },
        display: true,
      },
      {
        span: 24,
        label: null,
        type: 'render',
        key: 'render',
        props: {
          addon: () => (
            <div
              style={{
                textAlign: 'right',
                position: 'relative',
                zIndex: 2,
                width: '100%',
                height: '0',
                lineHeight: '20px',
                transform: 'translateY(-12px)',
              }}
            >
              <a onClick={() => goto('/forgot')}>忘记密码?</a>
            </div>
          ),
        },
      },
    ],
  },
  {
    type: 'FooterButtons',
    align: 'center',
    style: { border: 'none', marginTop: 0, paddingTop: 6 },
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
