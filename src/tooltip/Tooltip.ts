import { utils } from 'pixi.js'
import { translatePer, translatePx } from '../utils/style'

const { sin, cos, atan2, PI } = Math

export interface TooltipProps {
  color: number
  payload: { [key: string]: any }
}

export type TooltipRenderer = (props: TooltipProps) => HTMLElement

export default class Tooltip {
  public element: HTMLDivElement

  constructor(renderer?: TooltipRenderer) {
    if (renderer) {
      this.renderer = renderer
    }

    this.element = document.createElement('div')
    this.element.style.userSelect = 'none'
    this.element.style.pointerEvents = 'none'
    this.element.style.position = 'absolute'
    this.element.style.top = '0'
    this.element.style.left = '0'
    this.element.style.transitionDuration = '0.1s'
    this.element.style.transitionProperty = 'transform'
    this.element.style.transitionTimingFunction = 'ease-out'

    this.hide()
  }

  public show() {
    this.element.style.display = 'block'
  }

  public hide() {
    this.element.style.display = 'none'
  }

  public render(props: TooltipProps) {
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild)
    }
    this.element.appendChild(this.renderer(props))
  }

  public renderer({ color, payload }: TooltipProps): HTMLElement {
    const box = document.createElement('div')
    box.style.backgroundColor = 'white'
    box.style.border = `1px solid ${utils.hex2string(color)}`
    box.style.borderRadius = '2px'
    box.style.padding = '16px'
    box.style.fontSize = '13px'
    const list = document.createElement('ul')
    list.style.margin = '0px'
    list.style.paddingLeft = '28px'
    Object.keys(payload)
      .sort()
      .forEach(key => {
        const value = payload[key]
        const item = document.createElement('li')
        item.textContent = `${key}: ${value}`
        list.appendChild(item)
      })
    box.appendChild(list)
    return box
  }

  /**
   * Move tooltip to cursor position.
   * Place the tooltip in a position that does not get under the cursor. To do this, place the tooltip in the direction of the opposite direction of the orthant where the cursor is located.
   */
  public moveTo(
    cursorX: number,
    cursorY: number,
    stageWidth: number,
    stageHeight: number,
  ) {
    const x = cursorX - stageWidth / 2
    const y = cursorY - stageHeight / 2
    const t = atan2(y, x)
    const px = translatePx(
      (cursorX - 20 * cos(t)) >> 0,
      (cursorY - 20 * sin(t)) >> 0,
    )
    if (t >= PI * 0.25 && t < PI * 0.75) {
      this.element.style.transform =
        translatePer(-50 - 50 * cos(t * 2 - PI * 0.5), -100) + px
    } else if (t >= PI * 0.75 || t < -PI * 0.75) {
      this.element.style.transform =
        translatePer(0, -50 - 50 * sin(t * 2 - PI)) + px
    } else if (t >= -PI * 0.75 && t < -PI * 0.25) {
      this.element.style.transform =
        translatePer(-50 - 50 * cos(t * 2 - PI * 1.5), 0) + px
    } else {
      this.element.style.transform =
        translatePer(-100, -50 - 50 * sin(t * 2 - PI * 2)) + px
    }
  }
}
