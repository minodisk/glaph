import { Graphics as Original } from 'pixi.js'

const { atan2, cos, sin, sqrt } = Math

export default class Graphics extends Original {
  private dashGap: Array<number> = []
  private currentX: number = 0
  private currentY: number = 0
  private currentIndex: number = 0
  private restLength: number = 0

  public dashStyle(...dashGap: Array<number>) {
    this.dashGap = dashGap
    const length = dashGap.length
    if (length % 2 === 1) {
      this.dashGap[length] = dashGap[length - 1]
    }
  }

  public moveTo(x: number, y: number) {
    if (this.dashGap.length === 0) {
      super.moveTo(x, y)
      return this
    }

    this.currentX = x
    this.currentY = y
    this.currentIndex = 0
    this.restLength = 0
    return this
  }

  public lineTo(x: number, y: number) {
    if (this.dashGap.length === 0) {
      super.lineTo(x, y)
      return this
    }

    let { currentX, currentY } = this
    const dx = x - currentX
    const dy = y - currentY
    const t = atan2(dy, dx)
    const c = cos(t)
    const s = sin(t)
    const d = sqrt(dx * dx + dy * dy)

    super.moveTo(currentX, currentY)

    let len = 0
    while (true) {
      const isDash = this.currentIndex % 2 === 0
      const l =
        this.restLength || this.dashGap[this.currentIndex % this.dashGap.length]
      len += l
      if (len > d) {
        if (isDash) {
          super.lineTo(x, y)
        }
        this.restLength = len - d
        break
      }
      currentX += l * c
      currentY += l * s
      if (isDash) {
        super.lineTo(currentX, currentY)
      } else {
        super.moveTo(currentX, currentY)
      }
      this.currentIndex++
      this.restLength = 0
    }

    this.currentX = x
    this.currentY = y
    return this
  }
}
