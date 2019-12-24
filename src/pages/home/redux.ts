import { buildRedux } from 'react-redux-creator'
import { LIST_INITALSTATE } from '@conf/index'

export default {}

export const accountListRedux = buildRedux('accountList', LIST_INITALSTATE)({
  url: function* (payload, options) {
    yield console.log(payload, options)
  },
  method: 'GET',
  // onResult: function* (data, payload, options) {
  //   yield console.log(data, payload, options)
  // },
  // onAfter: function* (data, payload, options) {
  //   yield console.log(data, payload, options)
  // },
  // onError: function* (err, payload, options) {
  //   yield console.log(err, payload, options)
  // },
})

export const accountAddRedux = buildRedux('accountAdd', LIST_INITALSTATE)({
  url: function* (payload, options) {
    yield console.log(payload, options)
  },
  method: 'GET',
  // onResult: function* (data, payload, options) {
  //   yield console.log(data, payload, options)
  // },
  // onAfter: function* (data, payload, options) {
  //   yield console.log(data, payload, options)
  // },
  // onError: function* (err, payload, options) {
  //   yield console.log(err, payload, options)
  // },
})

export const accountEditRedux = buildRedux('accountEdit', LIST_INITALSTATE)({
  url: function* (payload, options) {
    yield console.log(payload, options)
  },
  method: 'GET',
  // onResult: function* (data, payload, options) {
  //   yield console.log(data, payload, options)
  // },
  // onAfter: function* (data, payload, options) {
  //   yield console.log(data, payload, options)
  // },
  // onError: function* (err, payload, options) {
  //   yield console.log(err, payload, options)
  // },
})

export const accountItemRedux = buildRedux('accountItem', LIST_INITALSTATE)({
  url: function* (payload, options) {
    yield console.log(payload, options)
  },
  method: 'GET',
  // onResult: function* (data, payload, options) {
  //   yield console.log(data, payload, options)
  // },
  // onAfter: function* (data, payload, options) {
  //   yield console.log(data, payload, options)
  // },
  // onError: function* (err, payload, options) {
  //   yield console.log(err, payload, options)
  // },
})
