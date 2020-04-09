import { API } from './api'

export default {}

export const NO_REPEAT_POST_API = [
  API.vehicle.add,
  API.device.add,
  API.login.authByCode,
  API.login.sendCode,
]
