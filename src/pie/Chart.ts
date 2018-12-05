import BaseChart from '../common/Chart'
import { bubble } from '../utils/event'
import Pie, { PieData } from './Pie'

const { PI, min } = Math

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

export default class Chart extends BaseChart<ChartData> {
  private readonly props: ChartProps

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
  }

  protected rerender() {
    if (this.data == undefined) {
      return
    }

    this.x = this.stageWidth / 2
    this.y = this.stageHeight / 2

    const radius = min(this.stageWidth, this.stageHeight) / 2
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
}
