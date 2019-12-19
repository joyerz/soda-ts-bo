import { isReady } from '@utils/common'

class AmapGEO {
  geocoder: any = null

  constructor() {
    this.init()
  }

  async init() {
    await isReady(() => (<any>window).AMap)
    let AMap =  (<any>window).AMap
    AMap.plugin('AMap.Geocoder', () => {
      this.geocoder = new AMap.Geocoder()
    })
  }

  async getAddressByLocation(longitude: number, latitude: number) {
    await isReady(() => this.geocoder)

    return new Promise((resolve) => {
      try {
        this.geocoder.getAddress([ longitude, latitude ], (status: string, result: {info: string, regeocode: { formattedAddress: string }}) => {
          if (status === 'complete') {
            if (result.info === 'OK') {
              // result中对应详细地理坐标信息
              const address = result.regeocode.formattedAddress
              resolve(address)
            } else {
              resolve('')
            }
          }
        })
      } catch (err) {
        console.log(err)
        resolve('')
      }
    })
  }
}

const instant = () => {
  let i: any = null
  return () => {
    if (!i) {
      i = new AmapGEO()
    }
    return i
  }
}

export default instant()()
