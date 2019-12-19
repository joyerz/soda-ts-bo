// @flow
import * as React from 'react'
import { VoidFuncT } from '@src/@types/actions'

import './setPassword.scss'

export default (ignoreSetupPassword: VoidFuncT): any[] => [
  {
    span: 24,
    gutter: 16,
    type: 'field',
    fields: [
      {
        label: null,
        key: 'np',
        type: 'render',
        props: {
          render: () => <span>新密码</span>,
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
        label: '新密码',
        key: 'new_password',
        type: 'inputPassword',
        props: {
          size: 'large',
          rules: ['required', 'min_length:6', 'max_length:16', 'password'],
          placeholder: '请输入6～16位新密码',
          maxLength: 16,
        },
        display: true,
      },
    ],
  },
  {
    type: 'button',
    align: 'center',
    wrapperStyle: { border: 'none', paddingTop: 16 },
    fields: [
      {
        label: '下次设置',
        key: 'next',
        type: 'outline',

        props: {
          size: 'large',
          block: true,
          onClick: ignoreSetupPassword,
        },
      },
    ],
  },
  {
    type: 'button',
    align: 'center',
    style: { border: 'none', paddingTop: 16 },
    fields: [
      {
        label: '设置',
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
