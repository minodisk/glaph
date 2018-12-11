import { Point, Text } from 'pixi.js'
import BaseChart from '../common/Chart'
import Graphics from '../graphics/Graphics'
import { bubble } from '../utils/event'
import { steps } from '../utils/number'
import Line, { LineProps } from './Line'
import Container = PIXI.Container

const { max } = Math

const Margin = 3

export type ChartData = Array<{
  props: LineProps
  data: Array<{
    x: any
    y: number
  }>
}>

export interface Stringer {
  toString(): string
}

export default class Chart extends BaseChart<ChartData> {
  public xLabelRenderer(x: Stringer): string {
    return x.toString()
  }

  protected rerender() {
    if (this.data == undefined) {
      return
    }

    this.removeChildren()

    const bg = new Graphics()
    bg.beginFill(0x000000, 0.05)
    bg.drawRect(0, 0, this.stageWidth, this.stageHeight)
    this.addChild(bg)

    const origXs: Array<Stringer> = []
    const ys: Array<number> = []
    this.data.forEach(({ data }) =>
      data.forEach(({ x, y }) => {
        origXs.push(x)
        ys.push(y)
      }),
    )
    const xs = Array.from(new Set(origXs))

    const xLabels = xs.map(v => new Text(v.toString(), { fontSize: 10 }))
    const paddingRight = xLabels[xLabels.length - 1].width / 2

    const maxY = max(...ys)
    const ySteps = steps(maxY)
    const upperY = ySteps[ySteps.length - 1]

    const yLabels = ySteps.map(v => new Text(v.toString(), { fontSize: 12 }))
    const yLabelWidth = yLabels.reduce(
      (w, label) => Math.max(w, label.width),
      0,
    )
    const paddingLeft = yLabelWidth + Margin
    const paddingTop = yLabels[yLabels.length - 1].height / 2

    const width = this.stageWidth - paddingLeft - paddingRight
    const stepX = width / (xs.length - 1)

    const xLabel = new Container()
    xs.forEach((x, i) => {
      const label = xLabels[i]
      const container = new Container()
      label.x = -label.width
      container.addChild(label)
      container.x = stepX * i
      container.rotation = -Math.PI * 0.25
      xLabel.addChild(container)
    })

    const paddingBottom = max(yLabels[0].height / 2, xLabel.height)

    xLabel.x = paddingLeft
    xLabel.y = this.stageHeight - paddingBottom
    this.addChild(xLabel)

    const height = this.stageHeight - paddingTop - paddingBottom
    const scaleY = height / upperY

    const axis = new Graphics()
    axis.lineStyle(2, 0xcccccc)
    axis.moveTo(0, height)
    axis.lineTo(0, 0)
    axis.lineTo(width, 0)
    axis.x = paddingLeft
    axis.y = this.stageHeight - paddingBottom
    axis.scale = new Point(1, -1)

    axis.lineStyle(1, 0xcccccc)

    const yLabel = new Container()
    ySteps.forEach((value, i) => {
      const y = value * scaleY
      axis.moveTo(0, y)
      axis.lineTo(width, y)

      const label = yLabels[i]
      label.x = yLabelWidth - label.width
      label.y = y + label.height / 2
      label.scale = new Point(1, -1)
      yLabel.addChild(label)
    })
    yLabel.y = this.stageHeight - paddingBottom
    yLabel.scale = new Point(1, -1)
    this.addChild(yLabel)

    this.addChild(axis)

    this.data.forEach(({ props, data }, i) => {
      const line = new Line(props)
      bubble('tooltipdata', line, this)
      line.render(
        data.map(({ y }, j) => ({
          x: stepX * j,
          y: y * scaleY,
        })),
      )
      line.x = paddingLeft
      line.y = height
      this.addChild(line)
    })
  }
}
