
import 'core-js'
import 'regenerator-runtime/runtime'
import './assets/scss/global.scss'

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import * as moment from 'moment'
import 'moment/locale/zh-cn'
import 'antd/dist/antd.less'

import { config, Provider } from 'react-redux-creator'
import doFetch from '@utils/fetch'
import routes from './routes'

moment.locale('zh-cn')

// 初始化react-redux-creator
config({
  fetchMethod: doFetch,
  logger: false,
})

const root: any = document.getElementById('app')
ReactDOM.render(
  <Provider routes={routes} />,
  root,
)
