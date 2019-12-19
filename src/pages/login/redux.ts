import { buildRedux } from 'react-redux-creator'
import { API } from '@conf/api'

export default {}

export const sendCodeRedux = buildRedux('sendCode')({
  url: API.login.sendCode,
  method: 'POST',
  data: ({ params }) => ({
    target: params.mobile,
    channel: 'mobile',
    method: 'sms',
    existed: true,
    type: 'ADMINISTRATOR',
  }),
  onResult: () => console.log('result'),
})
