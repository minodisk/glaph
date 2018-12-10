import BaseChart from '../common/Chart'
import Graphics from '../graphics/Graphics'
import { bubble } from '../utils/event'
import { roundUp, step } from '../utils/number'
import Line, { LineProps } from './Line'

const { max } = Math

export type ChartData = Array<{
  props: LineProps
  data: Array<{
    x: any
    y: number
  }>
}>

export default class Chart extends BaseChart<ChartData> {
  protected rerender() {
    if (this.data == undefined) {
      return
    }

    this.removeChildren()

    const w = this.stageWidth - 20
    const h = this.stageHeight - 20

    const axis = new Graphics()
    axis.lineStyle(2, 0xcccccc)
    axis.moveTo(20, h)
    axis.lineTo(this.stageWidth, h)
    axis.moveTo(20, h)
    axis.lineTo(20, 0)
    this.addChild(axis)

    const xs: Array<any> = []
    const ys: Array<number> = []
    this.data.forEach(({ data }) =>
      data.forEach(({ x, y }) => {
        xs.push(x)
        ys.push(y)
      }),
    )
    const eachW = w / (Array.from(new Set(xs)).length - 1)
    const maxY = max(...ys)
    const magY = h / maxY

    const upper = roundUp(maxY)
    const st = step(upper)

    this.data.forEach(({ props, data }, i) => {
      const line = new Line(props)
      bubble('tooltipdata', line, this)
      line.render(
        data.map(({ x, y }, j) => ({
          x: eachW * j,
          y: y * magY,
        })),
      )
      line.x = 20
      line.y = h
      this.addChild(line)
    })
  }
}
