import { Container, interaction } from 'pixi.js'
import Arc, { ArcData } from './Arc'

const { PI } = Math

export interface PieProps {
  innerRadiusRatio: number
  outerRadiusRatio: number
  startAngle: number
  endAngle: number
}
export type PieData = Array<ArcData>

export default class Pie extends Container {
  public radius: number = 0
  public props: PieProps
  public data: PieData = []

  constructor({
    innerRadiusRatio = 0,
    outerRadiusRatio = 1,
    startAngle = -PI * 0.5,
    endAngle = PI * 1.5,
  }: {
    innerRadiusRatio?: number
    outerRadiusRatio?: number
    startAngle?: number
    endAngle?: number
  } = {}) {
    super()
    this.props = {
      innerRadiusRatio,
      outerRadiusRatio,
      startAngle,
      endAngle: endAngle - startAngle,
    }
    this.interactive = true
    this.on('added', this.onAdded)
    this.on('mouseover', this.onMouseOver)
    this.on('mouseout', this.onMouseOut)
  }

  public render(data?: PieData) {
    if (data) {
      this.data = data
    }
    if (!this.data) {
      return
    }
    if (!this.radius) {
      return
    }

    const {
      innerRadiusRatio,
      outerRadiusRatio,
      startAngle,
      endAngle,
    } = this.props

    this.removeChildren()
    this.data.reduce((angleRatioFrom: number, d: ArcData) => {
      const angleRatioTo = angleRatioFrom + d.ratio
      const arc = new Arc()
      arc.render(
        {
          innerRadius: this.radius * innerRadiusRatio,
          outerRadius: this.radius * outerRadiusRatio,
          startAngle: startAngle + endAngle * angleRatioFrom,
          endAngle: startAngle + endAngle * angleRatioTo,
        },
        d,
      )
      arc.on('TOOLTIP_START', this.onTooltipStart)
      arc.on('TOOLTIP_MOVE', this.onTooltipMove)
      arc.on('TOOLTIP_END', this.onTooltipEnd)
      this.addChildAt(arc, 0)
      return angleRatioTo
    }, 0)
  }

  public onAdded = () => {
    this.on('STAGE_RESIZE', this.onStageResize)
  }

  public onStageResize = ({
    width,
    height,
  }: {
    width: number
    height: number
  }) => {
    this.radius = Math.min(width, height) / 2
    this.x = width / 2
    this.y = height / 2
    this.render(this.data)
  }

  public onMouseOver = (e: interaction.InteractionEvent) => {
    this.emit('TOOLTIP_START', {
      cursorX: e.data.global.x,
      cursorY: e.data.global.y,
      data: this.data,
    })
  }

  public onMouseOut = (e: interaction.InteractionEvent) => {
    this.emit('TOOLTIP_END', {
      cursorX: e.data.global.x,
      cursorY: e.data.global.y,
      data: this.data,
    })
  }

  public onTooltipStart = (e: ArcData) => {
    this.emit('TOOLTIP_MOVE', e)
  }

  public onTooltipMove = (e: ArcData) => {
    this.emit('TOOLTIP_MOVE', e)
  }

  public onTooltipEnd = (e: ArcData) => {
    this.emit('TOOLTIP_MOVE', e)
  }
}
