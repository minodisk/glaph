import { Container, interaction } from 'pixi.js'

export default class Chart<D> extends Container {
  protected stageWidth: number = 0
  protected stageHeight: number = 0
  protected data?: D

  constructor() {
    super()
    this.interactive = true
    this.on('added', this.onAdded)
  }

  public render(data: D) {
    this.data = data
    this.rerender()
  }

  protected rerender() {
    return
  }

  protected onAdded = () => {
    this.on('stageresize', this.onStageResize)
    this.on('mouseover', this.onMouseOver)
  }

  protected onStageResize = ({
    width,
    height,
  }: {
    width: number
    height: number
  }) => {
    this.stageWidth = width
    this.stageHeight = height
    this.rerender()
  }

  protected onMouseOver = (e: interaction.InteractionEvent) => {
    this.emit('tooltipstart', {
      cursorX: e.data.global.x,
      cursorY: e.data.global.y,
    })
    this.on('mousemove', this.onMouseMove)
    this.on('mouseout', this.onMouseOut)
  }

  protected onMouseMove = (e: interaction.InteractionEvent) => {
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
