import * as React from 'react'
import InfoBox from '@com/InfoBox'
import dataMap from 'src/services/deviceCheck'

import './index.scss'

const ability = ['voltage', 'voltage_status', 'simStatus', 'accelerometer_status',  'gps_status']
const status = ['thing']

type Props = {
  data: any
}

const index = (props: Props) => {
  const { data } = props
  return (
    <div styleName="result-detail">

      {convertData(data, '设备状态', status)
        .map((item, idx) => (
        <InfoBox key={item.title + '_' + idx} {...item} />
      ))}

      {convertData(data, '功能检测', ability)
        .map((item, idx) => (
        <InfoBox key={item.title + '_' + idx} {...item} />
      ))}

      {convertData(data, '设备数据', [], [].concat(ability, status))
        .map((item, idx) => (
        <InfoBox key={item.title + '_' + idx} {...item} />
      ))}

      <InfoBox key='4' title='ODB数据:' items={[]} />
    </div>
  )
}

const convertData = (data: any, title: string, inKeys: Array<string> = [], notInKeys: Array<string> = []) => {
  let result = []
  if (typeof data === 'object') {
    Object.keys(data).forEach((key) => {
      if(
        (
        inKeys.length === 0
        || (inKeys.length > 0 && inKeys.indexOf(key) !== -1)
        )
        &&
        (
          notInKeys.length === 0
          || (notInKeys.length > 0 && notInKeys.indexOf(key) === -1)
        )
      ) {
        const value = data[key]
        if (dataMap(key, value)) {
          result.push(dataMap(key, value, true, data))
        }
      }
    })
  }
  return [{ title: title + ':', items: result }]
}

export default index
