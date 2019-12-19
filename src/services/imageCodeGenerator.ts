import { API } from '@conf/api'
import doFetch from '@utils/fetch'
import UUID = require('uuid-js')

export default async function getImageCode() {
  const uuid = UUID.create().toString()
  const data = await doFetch({
    url: `${API.login.pic}?uuid=${uuid}`,
    method: 'GET',
  })

  return {
    src: data.value,
    uuid: uuid,
  }
}
