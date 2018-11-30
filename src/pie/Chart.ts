import { Container, interaction } from 'pixi.js'
import { bubble } from '../utils/event'
import Pie, { PieData } from './Pie'

const { PI } = Math

export interface ChartProps {
  startAngle: number
  endAngle: number
  radiusRatios: Array<RadiusRatio>
}

interface RadiusRatio {
  inner: number
  outer: number
}

export type ChartData = Array<PieData>

export default class Chart extends Container {
  private readonly props: ChartProps
  private data?: ChartData
  private radius?: number

  constructor({
    startAngle = -PI * 0.5,
    endAngle = PI * 1.5,
    radiusRatios = [{ inner: 0, outer: 1 }],
  }: {
    startAngle?: number
    endAngle?: number
    radiusRatios?: Array<RadiusRatio>
  } = {}) {
    super()
    this.props = {
      startAngle,
      endAngle,
      radiusRatios,
    }
    this.interactive = true
    this.on('added', this.onAdded)
  }

  public render(data: ChartData) {
    this.data = data
    this.rerender()
  }

  private rerender() {
    if (this.data == undefined || this.radius == undefined) {
      return
    }

    const radius = this.radius
    const { startAngle, endAngle, radiusRatios } = this.props

    this.removeChildren()
    this.data.forEach((d, i) => {
      const { inner, outer } = radiusRatios[i]
      const pie = new Pie({
        startAngle,
        endAngle,
        innerRadius: radius * inner,
        outerRadius: radius * outer,
      })
      bubble('tooltipdata', pie, this)
      pie.render(d)
      this.addChild(pie)
    })
  }

  private onAdded = () => {
    this.on('stageresize', this.onStageResize)
    this.on('mouseover', this.onMouseOver)
  }

  private onStageResize = ({
    width,
    height,
  }: {
    width: number
    height: number
  }) => {
    this.x = width / 2
    this.y = height / 2
    this.radius = Math.min(width, height) / 2
    this.rerender()
  }

  private onMouseOver = (e: interaction.InteractionEvent) => {
    this.emit('tooltipstart', {
      cursorX: e.data.global.x,
      cursorY: e.data.global.y,
    })
    this.on('mousemove', this.onMouseMove)
    this.on('mouseout', this.onMouseOut)
  }

  private onMouseMove = (e: interaction.InteractionEvent) => {
    this.emit('tooltipmove', {
      cursorX: e.data.global.x,
      cursorY: e.data.global.y,
    })
  }

  private onMouseOut = (e: interaction.InteractionEvent) => {
    this.emit('tooltipend', {
      cursorX: e.data.global.x,
      cursorY: e.data.global.y,
    })
    this.off('mousemove', this.onMouseMove)
    this.off('mouseout', this.onMouseOut)
  }
}
