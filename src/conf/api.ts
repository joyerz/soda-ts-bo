const api = '/api' // api point
const auth = '/auth' // auth point
const upload = '/upload' // upload point

export const API = {
  noRepeat: {
    token: `${api}/common/token/generate`,
  },
  login: {
    authByCode: `${auth}/oauth/token`,
    refreshToken: `${auth}/oauth/token`,
    userData: `${api}/account/me`,
    pic: `${api}/verification-code/pic`,
    sendCode: `${api}/verification-code/sms/with-check`,
    isSetPassword: `${api}/account/me/check`, // 检查是否需要设置密码
    setPassword: `${api}/account/me/password`,
    setNewPassword: `${api}/account/password/reset`,
    setPasswordImmediately: `${auth}/users/me/change-password-immediately-requests`,
    changePasswordByCode: mobile =>
      `${auth}/users/password-${mobile}-ADMINISTRATOR/change-password-base-on-channel-requests`,
    permission: `${api}/menu/account/me`, // 拥有的权限
  },
  user: {
    list: (page: number, limit: number) => `${api}/user?page=${page}&page-limit=${limit}`,
  },
  device: {
    list: (page: number, limit: number) => `${api}/device?page=${page}&page-limit=${limit}`,
    item: (id: number | string) => `${api}/device/${id}`,
    delete: (id: number | string) => `${api}/device/${id}/disable`,
    add: `${api}/device`,
    import: `${api}/device/upload`,
    detect: `${api}/device-check`,
    export: `${api}/device/export`,
  },
  deviceDetection: {
    list: (page: number, limit: number) =>
      `${api}/device-check?page=${page}&page-limit=${limit}`,
    item: (id: number | string) => `${api}/device/${id}`,
    add: `${api}/device`,
    detect: `${api}/device-check`,
    export: `${api}/device-check/export`,
  },
  deviceAssignment: {
    add: `${api}/device-assign`,
  },
  bindVehicle: {
    list: (page: number, limit: number) =>
      `${api}/vehicle/check-histories?page=${page}&page-limit=${limit}`,
    bind: `${api}/vehicle/device-bind-check`,
    check: `${api}/vehicle/check`,
    export: `${api}/vehicle/check-histories/export`,
  },
  vehicle: {
    list: (page: number, limit: number) => `${api}/vehicle?page=${page}&page-limit=${limit}`,
    add: `${api}/vehicle`,
    edit: (id: number | string) => `${api}/vehicle/${id}`,
    delete: (id: number | string) => `${api}/vehicle/${id}`,
    export: `${api}/vehicle/export`,
    import: `${api}/vehicle/import`,
    importDevice: `${api}/vehicle/device-bind-batch`,
  },
  claimVehicle: {
    add: `${api}/account/me/vehicle-claim`,
  },
  assignVehicle: {
    add: `${api}/vehicle/distribution`,
  },
  brand: {
    list: (page: number, limit: number) => `${api}/brand?page=${page}&page-limit=${limit}`,
    add: `${api}/brand`,
    edit: (id: number | string) => `${api}/brand/${id}`,
    export: `${api}/brand/export`,
  },
  model: {
    list: (page: number, limit: number) => `${api}/model?page=${page}&page-limit=${limit}`,
    add: `${api}/model`,
    edit: (id: number | string) => `${api}/model/${id}`,
    upload: `${upload}/uploadFile`,
    export: `${api}/model/export`,
  },
  riskControl: {
    tableColumn: (tableName: string) => `${api}/account/me/table-columns/${tableName}`,

    countVehicle: () => `${api}/vehicle/statistic?bind-user=true`,
    countNotRead: () => `${api}/risk-control-alert/unread-counts`,
    vehicleList: (page: number, limit: number) =>
      `${api}/vehicle?page=${page}&page-limit=${limit}&bind-user=true`,
    exportVehicleList: () => `${api}/vehicle/export`,
    vehicleRemark: (id: number | string) => `${api}/vehicle/${id}/remark`,
    alarmList: (page: number, limit: number) =>
      `${api}/risk-control-alert?page=${page}&page-limit=${limit}`,
    clearSingleAlarm: (id: number | string) => `${api}/risk-control-alert/${id}/clear`,
    clearAllAlarms: () => `${api}/risk-control-alert/clear`,
    readSingleAlarm: (id: number | string) => `${api}/risk-control-alert/${id}/read`,
    handleAlarm: (id: number | string) => `${api}/risk-control-alert/${id}/handle`,

    alarmHistoryList: (page: number, limit: number) =>
      `${api}/risk-control-alert?page=${page}&page-limit=${limit}`,
    alarmHistoryExport: () => `${api}/risk-control-alert/export`,

    alarmRulesList: (page: number, limit: number) =>
      `${api}/risk-control-rule?page=${page}&page-limit=${limit}`,
    alarmRulesCreate: () => `${api}/risk-control-rule`,
    alarmRulesUpdate: (id: number | string) => `${api}/risk-control-rule/${id}`,
    alarmRulesDetail: (id: number | string) => `${api}/risk-control-rule/${id}`,
    alarmRulesDelete: (id: number | string) => `${api}/risk-control-rule/${id}`,

    electronicFenceList: (page: number, limit: number) =>
      `${api}/area?page=${page}&page-limit=${limit}`,

    riskLocationList: (page: number, limit: number) =>
      `${api}/area?page=${page}&page-limit=${limit}`,

    vehicleTrackQueryList: (page: number, limit: number) =>
      `${api}/vehicle-telemetry?page=${page}&page-limit=${limit}`,
  },
  account: {
    list: (page: number, limit: number) => `${api}/account?page=${page}&page-limit=${limit}`,
    item: (id: number | string) => `${api}/account/${id}`,
    add: `${api}/account`,
    edit: (id: number | string) => `${api}/account/${id}`,
    disableItem: (id: number | string) => `${api}/account/${id}/state`,
  },
  role: {
    list: (page: number, limit: number) => `${api}/role?page=${page}&page-limit=${limit}`,
    add: `${api}/role`,
    edit: (id: number | string) => `${api}/role/${id}`,
    del: (id: number | string) => `${api}/role/${id}`,
    item: (id: number | string) => `${api}/role/${id}`,
    editPermissionList: (id: number | string) => `${api}/resource/role/${id}`, // 编辑模块的权限列表
    addPermissionList: () => `${api}/resource/role/new`, // 添加模块的权限列表
  },
  feedback: {
    list: (page: number, limit: number) =>
      `${api}/app-feedback?page=${page}&page-limit=${limit}`,
    read: (id: number | string) => `${api}/app-feedback/${id}/read`,
  },
  manufacturer: {
    list: (page: number, limit: number) =>
      `${api}/manufacturer?page=${page}&page-limit=${limit}`,
    disableItem: (id: number | string) => `${api}/manufacturer/${id}/operate`,
    edit: (id: number | string) => `${api}/manufacturer/${id}`,
    item: (id: number | string) => `${api}/manufacturer/${id}`,
    add: `${api}/manufacturer`,
  },
  dealer: {
    list: (page: number, limit: number) => `${api}/dealer?page=${page}&page-limit=${limit}`,
    disableItem: (id: number | string) => `${api}/dealer/${id}/operate`,
    item: (id: number | string) => `${api}/dealer/${id}`,
    add: `${api}/dealer`,
  },
  banner: {
    list: (page: number, limit: number) => `${api}/banner?page=${page}&page-limit=${limit}`,
    item: (id: number | string) => `${api}/banner/${id}`,
  },
  bulkPush: {
    list: (page: number, limit: number) => `${api}/bulkPush?page=${page}&page-limit=${limit}`,
    item: (id: number | string) => `${api}/bulkPush/${id}`,
  },
  indicatorScore: {
    list: () => `${api}/platform-config/monthly-index`,
    update: () => `${api}/platform-config/monthly-index`,
  },
  historicalTrack: {
    list: () => `${api}/platform-config/history-track`,
    update: () => `${api}/platform-config/history-track`,
  },
  insuranceDescription: {
    data: () => `${api}/platform-config/insurance-img`,
    update: () => `${api}/platform-config/insurance-img`,
  },
  SOS: {
    list: (page: number, limit: number) =>
      `${api}/sos-history?page=${page}&page-limit=${limit}`,
    read: (id: number | string) => `${api}/sos-history/${id}/read`,
    data: () => `${api}/platform-config/sos`,
    update: () => `${api}/platform-config/sos`,
  },
  errorCarWarm: {
    list: (page: number, limit: number) =>
      `${api}/vehicle-wrong-alert?page=${page}&page-limit=${limit}`,
    read: (id: number | string) => `${api}/vehicle-wrong-alert/${id}/read`,
    export: `${api}/vehicle-wrong-alert/export`,
  },
  insuranceRequest: {
    list: (page: number, limit: number) =>
      `${api}/insurance-request?page=${page}&page-limit=${limit}`,
    handle: (id: number | string, handle: string) => `${api}/insurance-request/${id}/${handle}`,
  },
  system: {
    changePassword: `${api}/account/me/password`,
  },
  upload: {
    single: `${api}/container/default/blob`,
    multi: `${api}/container/default/multi-blob`,
  },
}

export default {}
