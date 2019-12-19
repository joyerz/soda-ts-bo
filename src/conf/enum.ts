// 性别
export const GENDER = {
  W: '女',
  M: '男',
}

// 车辆风控状态
export const VEHICLE_RISK_CONTROL_STATUS = [
  { label: '在线', value: true },
  { label: '离线', value: false },
]
// 车辆行驶状态
export const VEHICLE_DRIVING_STATUS = [{ ON: '行驶' }, { OFF: '停车' }]

// 报警级别
export const ALARM_LEVEL = {
  NORMAL: '普通报警',
  SERIOUS: '严重报警',
}

// 报警规则类型
export const ALARM_RULES = {
  // 'ONLINE': '上线报警',
  // 'OFFLINE': '离线报警',
  UNEXPECTED_ACTIVE: '行驶报警',
  // 'INACTIVE': '停车报警',
  DEFENSE: '原地设防报警',
  FENCE: '电子围栏报警',
  // 'IGNITE': '点火报警',
  SHAKE: '震动报警',
  // 'OVERSPEED': '超速报警',
  // 'FATIGUE': '疲劳驾驶报警',
  // 'LOW_VOLTAGE': '电池低电压报警',
  // 'LOW_BATTERY': '电量耗尽报警',
  // 'TRAILED': '拖车报警',
  // 'REGION': '区域行驶报警',
  // 'DEVICE_TEAR_DOWN': '设备拆除报警',
  // 'RISKY': '风险地点报警',
}

// 报警消息状态
export const ALARM_STATUS = {
  PENDING: '未处理',
  HANDLED: '已处理',
}

// 车辆报警状态
export const VEHICLE_ALERT_STATUS = {
  PENDING: '未处理',
  HANDLED: '已处理',
}
export const VEHICLE_ALERT_STATUS_BADGE = {
  PENDING: '未处理',
  HANDLED: '已处理',
}

// 车辆状态
export const VEHICLE_STATUS = {
  ENTERED: '已录入',
  BIND: '已绑设备',
  RIDING: '骑行中',
}
export const VEHICLE_STATUS_BADGE = {
  ENTERED: 'warning',
  BIND: 'success',
  RIDING: 'processing',
}

// 车辆检测状态
export const VEHICLE_CHECK_STATUS = {
  NOT_CHECK: '未检测',
  SUCCESS: '检测通过',
  FAILED: '检测不通过',
}
export const VEHICLE_CHECK_STATUS_BADGE = {
  NOT_CHECK: 'default',
  SUCCESS: 'success',
  FAILED: 'error',
}

// 设备状态
export const DEVICE_STATUS = {
  ENTERED: '已录入',
  TIED: '已绑设备',
  RIDING: '骑行中',
}
export const DEVICE_STATUS_BADGE = {
  ENTERED: 'warning',
  TIED: 'success',
  RIDING: 'processing',
}

// 设备分配状态
export const DEVICE_ASSIGN_STATUS = {
  PENDING: '分配中',
  SUCCESS: '分配成功',
  FAIL: '分配失败',
}
export const DEVICE_ASSIGN_STATUS_BADGE = {
  PENDING: 'default',
  SUCCESS: 'success',
  FAIL: 'error',
}

// 设备检测状态
export const DEVICE_CHECK_STATUS = {
  PENDING: '检测中',
  PASSED: '检测通过',
  FAILED: '检测未通过',
  CONNECT_FAILED: '系统与设备通信失败',
  NO_VOLTAGE_CONF: '未配置外部电压正常指标',
}

export const DEVICE_CHECK_STATUS_BADGE = {
  PENDING: 'default',
  PASSED: 'success',
  FAILED: 'error',
  CONNECT_FAILED: 'error',
  NO_VOLTAGE_CONF: 'warning',
}
