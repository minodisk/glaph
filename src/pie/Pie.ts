import { Container } from 'pixi.js'
import { bubble } from '../utils/event'
import Arc, { ArcData } from './Arc'

export interface PieProps {
  startAngle: number
  endAngle: number
  innerRadius: number
  outerRadius: number
}
export type PieData = Array<ArcData>

export default class Pie extends Container {
  public data: PieData = []

  constructor(public props: PieProps) {
    super()
  }

  public render(data?: PieData) {
    if (data) {
      this.data = data
    }
    if (!this.data) {
      return
    }

    const { startAngle, endAngle, innerRadius, outerRadius } = this.props
    const angleVolume = endAngle - startAngle

    this.removeChildren()
    this.data.reduce((angleRatioFrom: number, d: ArcData) => {
      const angleRatioTo = angleRatioFrom + d.ratio
      const arc = new Arc()
      arc.render(
        {
          startAngle: startAngle + angleVolume * angleRatioFrom,
          endAngle: startAngle + angleVolume * angleRatioTo,
          innerRadius,
          outerRadius,
        },
        d,
      )

      // bubble up tooltip event
      bubble('tooltipdata', arc, this)

      this.addChildAt(arc, 0)
      return angleRatioTo
    }, 0)
  }
}
