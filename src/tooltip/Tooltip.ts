import { utils } from 'pixi.js'
import { translatePer, translatePx } from '../utils/style'

const { sin, cos, atan2, PI } = Math
const D45 = PI * 0.25
const D90 = PI * 0.5
const D135 = PI * 0.75
const D270 = PI * 1.5
const D360 = PI * 2

export interface TooltipData {
  color: number
  payload: { [key: string]: any }
}

export interface TooltipProps {
  margin: number
}

export type TooltipRenderer = (data: TooltipData) => HTMLElement

export default class Tooltip {
  public element: HTMLDivElement
  private readonly props: TooltipProps

  constructor({
    renderer,
    margin = 20,
  }: {
    renderer?: TooltipRenderer
    margin?: number
  } = {}) {
    this.props = { margin }
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

  public render(data: TooltipData) {
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild)
    }
    this.element.appendChild(this.renderer(data))
  }

  public renderer({ color, payload }: TooltipData): HTMLElement {
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
    const { margin } = this.props
    const x = cursorX - stageWidth / 2
    const y = cursorY - stageHeight / 2
    const t = atan2(y, x)
    const px = translatePx(
      (cursorX - margin * cos(t)) >> 0,
      (cursorY - margin * sin(t)) >> 0,
    )
    if (t >= D45 && t < D135) {
      this.element.style.transform =
        translatePer(-50 - 50 * cos(t * 2 - D90), -100) + px
    } else if (t >= D135 || t < -D135) {
      this.element.style.transform =
        translatePer(0, -50 - 50 * sin(t * 2 - PI)) + px
    } else if (t >= -D135 && t < -D45) {
      this.element.style.transform =
        translatePer(-50 - 50 * cos(t * 2 - D270), 0) + px
    } else {
      this.element.style.transform =
        translatePer(-100, -50 - 50 * sin(t * 2 - D360)) + px
    }
  }
}
