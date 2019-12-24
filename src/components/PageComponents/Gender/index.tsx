import * as React from 'react'
import { goc } from '@utils/objectHelper'
import { GENDER } from '@conf/enum'

const index = (props: { value: string | null }) => {
  let { value } = props
  value = value ? value.toUpperCase() : 'M'
  return (
    <span>{goc(GENDER, value)}</span>
  )
}

export default index
