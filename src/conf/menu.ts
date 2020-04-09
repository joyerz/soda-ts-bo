import { lazy } from 'react'

export default [
  {
    key: 'normal',
    name: '常规操作',
    icon: 'cloud',
    path: [
      '/normal',
    ],
    component: lazy((): any => import('@pages/home')),
    permission: '',
  },

  // 二级菜单样本
  // {
  //   key: 'device',
  //   name: '设备管理',
  //   icon: 'deployment-unit',
  //   subMenu: [
  //     {
  //       key: 'device-detection',
  //       name: '设备检测',
  //       path: [
  //         '/device-detection',
  //         '/device-detection/results',
  //       ],
  //       component: lazy(
  //         (): any => import('@pages/home'),
  //       ),
  //       permission: '',
  //     },
  //   ],
  // },
]
