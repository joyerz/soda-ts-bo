import * as React from 'react'
import { Badge } from 'antd'

type Props = {
  statusMap: {
    [name: string]: string
  }
  statusMapBadge?: {
    [name: string]: 'success' | 'processing' | 'default' | 'error' | 'warning'
  }
  value: string | null
}

const StatusLabel: React.FunctionComponent<Props> = props => {
  const { statusMap, statusMapBadge, value } = props

  return (
    value && statusMap[value]
      ? (
        <span>
          {statusMapBadge && statusMapBadge[value] &&
          <Badge status={statusMapBadge[value]} />
          }
          {statusMap[value]}
        </span>
      )
      : null
  )
}

export default StatusLabel
