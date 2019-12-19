import * as React from 'react'
import StatusLabel from '@com/StatusLabel'
import './deviceCheck.scss'

type CheckResult = {
  [ a: string ]: string
}

export default function dataMap(key: string, value: any,  renderWithStyle: boolean = true, data: any) {
  const map: any = {
    obliquity: {
      label: '倾角',
    },
    type: {
      label: '类型',
      render: (value: any) =>
        <StatusLabel
          statusMap={{ CONDITION: '实时信息上报', EVENT: '事件上报' }}
          statusMapBadge={{ CONDITION: 'success', EVENT: 'warning' }}
          value={value}
        />,
    },
    power_consumption: {
      label: '能量消耗',
      render: (value: any) =>
        <StatusLabel
          statusMap={{ LOW: '低', HIGHT: '高', NORMAL: '正常', UNKNOWN: '未知' }}
          statusMapBadge={{ LOW: 'warning', HIGHT: 'error', NORMAL: 'processing', UNKNOWN: 'default' }}
          value={value}
        />,
    },
    angle: {
      label: '角度',
    },
    speed: {
      label: '速度',
    },
    accelerometer: {
      label: '加速度',
      // render: (value: any) => value ? JSON.stringify(value).replace(/({|})/g, '') : null,
    },
    accelerometer_status: {
      label: '加速度状态',
      render: (value: any) =>
        <StatusLabel
          statusMap={{ TRUE: '正常', FALSE: '不正常' }}
          statusMapBadge={{ TRUE: 'success', FALSE: 'error' }}
          value={value && value.toString().toUpperCase()}
        />,
    },
    altitude: {
      label: '海拔高度',
    },
    location: {
      label: '经纬度',
      render: (value: any) =>
        <>
          [{value.lat}, {value.lon}] {value.coordinate}
        </>
    },
    thing: {
      label: '物联网卡号',
      render: (value: any) => value.card_number,
    },
    voltage: {
      label: '电压',
      render: (value: any, record: any) => value
        ? <>
          {value}V &nbsp;&nbsp;
          {data.voltage_status &&
          <StatusLabel
            statusMap={{ TRUE: '正常', FALSE: '异常' }}
            statusMapBadge={{ TRUE: 'success', FALSE: 'error' }}
            value={data.voltage_status.toString().toUpperCase()}
          />
          }
          </>
        : null
    },
    // voltage_status: {
    //   label: '电压状态',
    //   render: (value: any) =>
    //     <StatusLabel
    //       statusMap={{ TRUE: '正常', FALSE: '异常' }}
    //       statusMapBadge={{ TRUE: 'success', FALSE: 'error' }}
    //       value={value.toString().toUpperCase()}
    //     />,
    // },
    gyroscope: {
      label: '陀螺仪',
    },
    ignition: {
      label: '点火状态',
      render: (value: any) =>
        <StatusLabel
          statusMap={{ ON: '点火', OFF: '熄火' }}
          statusMapBadge={{ ON: 'success', OFF: 'default' }}
          value={value}
        />,
    },
    simStatus: {
      label: 'SIM卡状态',
      render: (value: any) =>
        <StatusLabel
          statusMap={{ TRUE: '正常', FALSE: '异常' }}
          statusMapBadge={{ TRUE: 'success', FALSE: 'error' }}
          value={value.toString().toUpperCase()}
        />,
    },
    gps_status: {
      label: 'GPS状态',
      render: (value: any) =>
        <StatusLabel
          statusMap={{ TRUE: '正常', FALSE: '异常' }}
          statusMapBadge={{ TRUE: 'success', FALSE: 'error' }}
          value={value.toString().toUpperCase()}
        />,
    }
  }

  if (map[key]) {
    return (
      <span styleName={renderWithStyle ? 'check-results-item' : ''}>
        <span styleName={renderWithStyle ? 'check-results-label' : ''}>{map[key].label}:</span>
        <span styleName={renderWithStyle ? 'check-results-result' : ''}>
          &nbsp;{
            map[key].render
              ? map[key].render(value, )
              : staticRender(value)
          }
        </span>
      </span>
    )
  }
  return null
}

const staticRender = (value: any) => typeof value === 'object' ? JSON.stringify(value) : value


export const popoverMessage = (check_result: CheckResult) => {
  const PICKUP_KEY = ['voltage', 'simStatus', 'accelerometer_status',  'gps_status']
  const results = []
  for (let key of PICKUP_KEY) {
    if (check_result[key]) {
      results.push(<div key={key}>{dataMap(key, check_result[key], false,  check_result)}</div>)
    }
  }
  return results
}

export const popoverStatus = (check_result: CheckResult) => {
  const PICKUP_KEY = ['thing']
  const results = []
  for (let key of PICKUP_KEY) {
    if (check_result[key]) {
      results.push(<div key={key}>{dataMap(key, check_result[key], false,  check_result)}</div>)
    }
  }
  return results
}
