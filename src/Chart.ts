import { Application, Container } from 'pixi.js'
import Tooltip, { TooltipRenderer } from './tooltip/Tooltip'
import { TooltipEvent } from './tooltip/TooltipEvent'

export default class Chart extends Application {
  public element: HTMLDivElement
  public viewport: HTMLDivElement
  public stageWidth: number = 0
  public stageHeight: number = 0
  public tooltip: Tooltip
  public tooltipRenderer?: TooltipRenderer
  public obs: any

  constructor({
    width = '100%',
    height = '100%',
  }: {
    width: number | string
    height: number | string
  }) {
    super({
      antialias: true,
      transparent: true,
      resolution: window.devicePixelRatio,
    })
    this.renderer.autoResize = true
    this.view.style.position = 'absolute'

    this.viewport = document.createElement('div')
    this.viewport.style.width = '100%'
    this.viewport.style.height = '100%'
    this.viewport.style.overflow = 'hidden'
    this.viewport.style.position = 'relative'
    this.viewport.appendChild(this.view)

    this.tooltip = new Tooltip(this.tooltipRenderer)

    this.element = document.createElement('div')
    this.element.style.width = typeof width === 'number' ? `${width}px` : width
    this.element.style.height =
      typeof height === 'number' ? `${height}px` : height
    this.element.style.position = 'relative'
    this.element.appendChild(this.viewport)
    this.element.appendChild(this.tooltip.element)
    this.element.addEventListener('DOMNodeInsertedIntoDocument', this.onAppend)
  }

  public addChart(body: Container) {
    body.on('TOOLTIP_START', this.onTooltipStart)
    body.on('TOOLTIP_MOVE', this.onTooltipMove)
    body.on('TOOLTIP_END', this.onTooltipEnd)
    this.stage.addChild(body)
  }

  public resize(width: number, height: number) {
    this.stageWidth = width
    this.stageHeight = height
    this.renderer.resize(width, height)
    this.stage.children.forEach(child =>
      child.emit('STAGE_RESIZE', { width, height }),
    )
  }

  public onAppend = () => {
    this.element.removeEventListener(
      'DOMNodeInsertedIntoDocument',
      this.onAppend,
    )

    const { width, height } = this.viewport.getBoundingClientRect()
    this.resize(width, height)

    if ((window as any).ResizeObserver) {
      this.obs = new (window as any).ResizeObserver(this.onStageResize)
      this.obs.observe(this.viewport)
    } else {
      window.addEventListener('resize', this.onWindowResize)
    }
  }

  public onStageResize = ([
    {
      contentRect: { width, height },
    },
  ]: any) => {
    this.resize(width, height)
  }

  public onWindowResize = () => {
    const { width, height } = this.viewport.getBoundingClientRect()
    this.resize(width, height)
  }

  public onTooltipStart = (e: TooltipEvent) => {
    this.tooltip.moveTo(e.cursorX, e.cursorY, this.stageWidth, this.stageHeight)
    this.tooltip.show()
  }

  public onTooltipMove = (e: TooltipEvent) => {
    this.tooltip.render(e.data)
    this.tooltip.moveTo(e.cursorX, e.cursorY, this.stageWidth, this.stageHeight)
  }

  public onTooltipEnd = (e: TooltipEvent) => {
    this.tooltip.moveTo(e.cursorX, e.cursorY, this.stageWidth, this.stageHeight)
    this.tooltip.hide()
  }
}
