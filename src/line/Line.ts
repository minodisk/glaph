import { Container, Point } from 'pixi.js'
import Graphics from '../graphics/Graphics'

export interface LineProps {
  lineWidth?: number
  color?: number
  alpha?: number
  dashStyle?: Array<number>
}

export type LineData = Array<PointData>

export interface PointData {
  x: number
  y: number
}

export default class Line extends Container {
  private readonly graphics: Graphics

  constructor({
    lineWidth = 1,
    color = 0x000000,
    alpha = 1,
    dashStyle = [],
  }: LineProps = {}) {
    super()
    this.graphics = new Graphics()
    this.graphics.lineStyle(lineWidth, color, alpha)
    this.graphics.dashStyle(...dashStyle)
    this.graphics.scale = new Point(1, -1)
    this.addChild(this.graphics)
  }

  public render([first, ...rest]: LineData) {
    this.graphics.moveTo(first.x, first.y)
    rest.forEach(({ x, y }) => {
      this.graphics.lineTo(x, y)
    })
  }
}
