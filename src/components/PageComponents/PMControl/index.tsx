// import * as React from 'react'
import UserManager from '@src/services/userManager'

type Props = {
  permission: string,
  children: any
}

const PMControl = (props: Props): any => (
  UserManager.isPermission(props.permission)
    ? props.children
    : null
)

//权限控制
export default PMControl
