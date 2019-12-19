import * as React from 'react'

type Props = {
  children: any
}

export default (props: Props) => (
  <div
    style={
      {
        width: 0,
        height: 0,
        overflow: 'hidden',
        display: 'none',
      }
    }
  >
    {props.children}
  </div>
)
