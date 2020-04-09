import * as React from 'react'
import { Row, Col } from 'antd'
import mobileChecker from 'src/utils/browserDetect'
import './index.scss'
import Cell from '../Cell'

type Props = {
  title: string,
  subTitle?: string,
  items: any[]
}

const index = (props: Props) => {
  const { title, subTitle, items } = props
  const isMobile = mobileChecker()
  return (
    <div styleName="infoBox">
      <div styleName="title">
        {title}
        {subTitle !== undefined && <span styleName="sub-title">{subTitle}</span>}
      </div>
      <div styleName="items">
        {
          !isMobile
            ? (
              <Row gutter={24}>
                {items.map((item: any, idx: number) =>
                  <Col key={idx} span={8}>{typeof item === 'function' ? item() : item}</Col>
                )}
              </Row>
            )
            : items.map((item: any, idx: number) => <Cell
              key={idx}>{typeof item === 'function' ? item() : item}</Cell>)}
      </div>
    </div>
  )
}

export default index
