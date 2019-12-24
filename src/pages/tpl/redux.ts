import { buildRedux } from 'react-redux-creator'
import { LIST_INITALSTATE } from '@src/conf'

export default {}

export const sampleListRedux = buildRedux('sampleList')({
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


export const sampleAddRedux = buildRedux('sampleAdd', LIST_INITALSTATE)({
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

export const sampleEditRedux = buildRedux('sampleEdit', LIST_INITALSTATE)({
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

export const sampleItemRedux = buildRedux('sampleItem', LIST_INITALSTATE)({
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

