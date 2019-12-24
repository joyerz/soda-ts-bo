import * as React from 'react'
import { PageHeader } from 'antd'

import './index.scss'

type Props = {
  title: string
  [name: string]: any
}

export default class index extends React.PureComponent<Props> {
  render() {
    return (
      <div className="pageHeader">
        <PageHeader {...this.props} />
      </div>
    )
  }
}
