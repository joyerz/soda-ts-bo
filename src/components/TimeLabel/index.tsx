import * as React from 'react'
import * as moment from 'moment'
import { DATE_FORMAT, DATE_TIME_FORMAT } from '@conf/index'

type Props = {
  type: string,
  value: number | string | {} | null,
  format?: string,
  placeholder?: any,
}

const typeMap = {
  'date': DATE_FORMAT,
  'dateTime': DATE_TIME_FORMAT,
}

const TimeLabel = (props: Props) => (
  props.value
    ? <span>{moment(props.value).format(props.format || typeMap[props.type || 'dateTime'])}</span>
    : (props.placeholder || null)
)

TimeLabel.defaultProps = {
  type: 'date',
}

export default TimeLabel
