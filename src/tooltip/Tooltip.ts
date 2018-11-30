import { utils } from 'pixi.js'
import { translatePer, translatePx } from '../utils/style'

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
    this.element.style.transitionDuration = '0.15s'
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
   *
   * Orthant:
   *
   *       |
   *    3  |  4
   *       |
   *  -----+----->x
   *       |
   *    2  |  1
   *       |
   *       v
   *       y
   */
  public moveTo(
    cursorX: number,
    cursorY: number,
    stageWidth: number,
    stageHeight: number,
  ) {
    const orthantX = cursorX - stageWidth / 2
    const orthantY = cursorY - stageHeight / 2
    if (orthantY > 0) {
      if (orthantX > 0) {
        // Orthant 1
        this.element.style.transform =
          translatePer(-100, -100) +
          translatePx((cursorX - 20) >> 0, (cursorY - 20) >> 0)
      } else {
        // Orthant 2
        this.element.style.transform =
          translatePer(0, -100) +
          translatePx((cursorX + 20) >> 0, (cursorY - 20) >> 0)
      }
    } else {
      if (orthantX < 0) {
        // Orthant 3
        this.element.style.transform =
          translatePer(0, 0) +
          translatePx((cursorX + 20) >> 0, (cursorY + 20) >> 0)
      } else {
        // Orthant 4
        this.element.style.transform =
          translatePer(-100, 0) +
          translatePx((cursorX - 20) >> 0, (cursorY + 20) >> 0)
      }
    }
  }
}
