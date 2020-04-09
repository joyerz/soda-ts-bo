import * as React from 'react'
import { Layout } from 'antd'
import UserInfo from './userInfo'

import './header.scss'

const { Header } = Layout

type Props = {}

export default class HeaderLayer extends React.PureComponent<Props> {
  render() {
    return (
      <>
        <div styleName="info-right">
          <UserInfo />
        </div>
        <Header className="header" />
      </>
    )
  }
}
