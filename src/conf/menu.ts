// @flow
import { lazy } from 'react'

export default [
  {
    key: '/',
    name: '设备管理',
    icon: 'deployment-unit',
    subMenu: [
      {
        key: 'device-detection',
        name: '设备检测',
        path: [
          '/device-detection',
          '/device-detection/results',
        ],
        component: lazy(
          (): any => import('@pages/home'),
        ),
        permission: '',
      },
    ],
  },
]
