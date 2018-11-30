import { utils } from 'pixi.js'

export function bubble(
  eventName: string | symbol,
  from: utils.EventEmitter,
  to: utils.EventEmitter,
) {
  from.on(eventName, (e: any) => {
    to.emit(eventName, e)
  })
}
