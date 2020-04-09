export const addListener = (dom: HTMLElement, eventName: string, cb: () => void) => {
  if (!dom) return
  dom.addEventListener(eventName, cb)
}


export const removeListener = (dom: HTMLElement, eventName: string, cb: () => void) => {
  if (!dom) return
  dom.removeEventListener(eventName, cb)
}
