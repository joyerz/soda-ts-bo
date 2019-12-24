/**
 * 枚举所有的（枚举）状态
 */
import * as React from 'react'
// import {
//   DEALER_STATUS, DEALER_STATUS_BADGE,
//   DRIVER_STATUS, DRIVER_STATUS_BADGE,
//   ORDER_STATUS,
//   ORDER_STATUS_BADGE, PAYMENT_STATUS, PAYMENT_STATUS_BADGE, RELET_PAYMENT_STATUS, RELET_PAYMENT_STATUS_BADGE,
//   VEHICLE_MANAGER_STATUS,
//   VEHICLE_MANAGER_STATUS_BADGE,
// } from '@conf/enum'
import StatusLabel from '@com/StatusLabel'

import './index.scss'

const { useState } = React

const StatusArr = [
  // ['订单状态', ORDER_STATUS, ORDER_STATUS_BADGE],
  // ['服务顾问状态', VEHICLE_MANAGER_STATUS, VEHICLE_MANAGER_STATUS_BADGE],
  // ['司机状态', DRIVER_STATUS, DRIVER_STATUS_BADGE],
  // ['经销商状态', DEALER_STATUS, DEALER_STATUS_BADGE],
  // ['支付状态', PAYMENT_STATUS, PAYMENT_STATUS_BADGE],
  // ['续租支付状态', RELET_PAYMENT_STATUS, RELET_PAYMENT_STATUS_BADGE],
]


export default () => {

  const [open, setOpen] = useState('')

  const toggle = () => {
    const state = !open ? ' active' : ''
    console.log('open', state)
    setOpen(state)
  }

  return (
    <div styleName={`container ${open}`}>
      <div styleName="after" onClick={e => { console.log('click'); toggle() }}>状态一览</div>

      {StatusArr.map((item: any) => (
        <div key={item[0]}>
          <div styleName="title">{item[0]}:</div>
          {Object.keys(item[1]).map((key) =>
            <div key={key}>
              <StatusLabel value={key} statusMap={item[1]} statusMapBadge={item[2]} />
            </div>,
          )
          }
        </div>
      ))}
    </div>
  )
}
