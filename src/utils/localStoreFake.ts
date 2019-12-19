export default function fakeLocalStorageSaver() {
  let fakeLocalStorage: any = {}
  let storage: any

  if ((<any>window).Storage && window.localStorage) {
    storage = (<any>window).Storage.prototype
  } else {
    // We don't bother implementing a fake Storage object
    (<any>window).localStorage = {}
    storage = (<any>window).localStorage
  }

  // For older IE
  if (!window.location.origin) {
    let port = ''
    if (window.location.port) {
      port = `:${window.location.port}`
    }
    (<any>window).location.origin = `${window.location.protocol}//${window.location.hostname}${port}`
  }

  const dispatchStorageEvent = function (key: string, newValue: any) {
    const oldValue = (key == null) ? null : storage.getItem(key)
    const url = (<any>window).location.href.substr((<any>window).location.origin.length)
    const storageEvent: any = document.createEvent('StorageEvent') // For IE, http://stackoverflow.com/a/25514935/1214183

    storageEvent.initStorageEvent('storage', false, false, key, oldValue, newValue, url, null)
    window.dispatchEvent(storageEvent)
  }

  storage.key = function (i: any) {
    const key = Object.keys(fakeLocalStorage)[i]
    return typeof key === 'string' ? key : null
  }

  storage.getItem = function (key: any) {
    return typeof fakeLocalStorage[key] === 'string' ? fakeLocalStorage[key] : null
  }

  storage.setItem = function (key: string, value: any) {
    dispatchStorageEvent(key, value)
    fakeLocalStorage[key] = String(value)
  }

  storage.removeItem = function (key: string) {
    dispatchStorageEvent(key, null)
    delete fakeLocalStorage[key]
  }

  storage.clear = function () {
    dispatchStorageEvent(null, null)
    fakeLocalStorage = {}
  }
}
