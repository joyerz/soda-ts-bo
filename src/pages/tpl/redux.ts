import { buildRedux } from 'react-redux-creator'

export const reducerName = buildRedux('reducerName')({
  url: (payload) => 'YOUR API',
  method: 'GET',
  data: (payload, options) => {
  },
  onResult: function* (data, payload, options) {

  },
  onAfter: function* (data, payload, options) {

  },
  onError: function* (err, payload, options) {

  },
})
