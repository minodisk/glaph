import { Graphics, interaction } from 'pixi.js'

const { sin, cos } = Math

export interface ArcProps {
  innerRadius: number
  outerRadius: number
  startAngle: number
  endAngle: number
}

export interface ArcData {
  ratio: number
  color: number
  payload: any
}

export default class Arc extends Graphics {
  public data: ArcData

  constructor() {
    super()
    this.interactive = true
    this.on('mouseover', this.onMouseOver)
  }

  public render(
    { innerRadius, outerRadius, startAngle, endAngle }: ArcProps,
    data: ArcData
  ) {
    this.data = data
    this.beginFill(data.color)
    if (innerRadius === 0) {
      this.moveTo(0, 0)
      this.arc(outerRadius, startAngle, endAngle)
    } else {
      const fromX = outerRadius * cos(startAngle)
      const fromY = outerRadius * sin(startAngle)
      this.moveTo(fromX, fromY)
      this.arc(outerRadius, startAngle, endAngle)
      this.lineTo(innerRadius * cos(endAngle), innerRadius * sin(endAngle))
      this.arc(innerRadius, endAngle, startAngle)
      this.lineTo(fromX, fromY)
    }
    this.endFill()
  }

  public arc(radius: number, startAngle: number, endAngle: number): Arc {
    super.arc(0, 0, radius, startAngle, endAngle, startAngle > endAngle)
    return this
  }

  public onMouseOver = (e: interaction.InteractionEvent) => {
    this.emit('TOOLTIP_START', {
      cursorX: e.data.global.x,
      cursorY: e.data.global.y,
      data: this.data
    })
    this.off('mouseover', this.onMouseOver)
    this.on('mousemove', this.onMouseMove)
    this.on('mouseout', this.onMouseOut)
  }

  public onMouseMove = (e: interaction.InteractionEvent) => {
    this.emit('TOOLTIP_MOVE', {
      cursorX: e.data.global.x,
      cursorY: e.data.global.y,
      data: this.data
    })
  }

  public onMouseOut = (e: interaction.InteractionEvent) => {
    this.emit('TOOLTIP_END', {
      cursorX: e.data.global.x,
      cursorY: e.data.global.y,
      data: this.data
    })
    this.on('mouseover', this.onMouseOver)
    this.off('mousemove', this.onMouseMove)
    this.off('mouseout', this.onMouseOut)
  }
}
