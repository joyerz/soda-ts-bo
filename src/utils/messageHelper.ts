import { message } from 'antd'

message.config({
  duration: 3,
  maxCount: 1,
})

/**
 * 操作类成功提示
 * @param type
 * @return {*|string}
 */
export const messageActionSuccess = (type: string = 'action', definedMessage: string = '') => {
  const map: { [name: string]: string } = {
    add: '添加成功！',
    edit: '修改成功！',
    delete: '删除成功！',
    detect: '操作成功！',
    import: '导入成功！',
    export: '导出成功！',
    sendCode: '验证码已发送！',
    action: '操作成功！',
    setPasswordSuccess: '设置密码成功!',
    changePasswordSuccess: '修改密码成功!',
    setNewPasswordSuccess: '设置密码成功, 请登录!',
    assign: '分配成功!',
    assignDevice: '分配成功！',
  }

  const msg = definedMessage || map[type] || map.action
  message.success(msg)
}

/**
 * 操作类失败提示
 * @param type
 * @return {*|string}
 */
export const messageActionFailure = (type: string = 'action') => {
  const map: { [name: string]: string } = {
    add: '添加失败！',
    edit: '修改失败！',
    delete: '删除失败！',
    action: '操作失败！',
    passwordNotMatch: '两次输入的密码不一致！',
    passwordNotChange: '新密码不能跟旧密码相同！',
    refreshTokenFail: '登录失效，请重新登录！',
    loginRequired: '请登录!',
    assignDevice: '分配失败！',
    deviceNotFound: '设备号不匹配!',
    selectPermission: '请选中对应的权限！',
  }

  const msg = map[type]
  message.error(msg)
}

/**
 * 操作类进行中提示
 * @param type
 * @return {*|string}
 */
export const messageActionInfo = (type: string = 'action') => {
  const map: { [name: string]: string } = {
    export: '正在导出, 请稍候!',
    action: '进行中, 请稍后!',
  }
  const msg = map[type] || map.action
  message.info(msg)
}
