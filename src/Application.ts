import { Application as PIXIApplication } from 'pixi.js'
import PieChart from './pie/Chart'
import Tooltip from './tooltip/Tooltip'
import { TooltipEvent } from './tooltip/TooltipEvent'

export default class Application extends PIXIApplication {
  public element: HTMLDivElement
  public viewport: HTMLDivElement
  public stageWidth: number = 0
  public stageHeight: number = 0
  public obs: any
  private chart?: PieChart
  private tooltip?: Tooltip

  constructor({
    width = '100%',
    height = '100%',
  }: {
    width?: number | string
    height?: number | string
  } = {}) {
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

    this.element = document.createElement('div')
    this.element.style.width = typeof width === 'number' ? `${width}px` : width
    this.element.style.height =
      typeof height === 'number' ? `${height}px` : height
    this.element.style.position = 'relative'
    this.element.appendChild(this.viewport)
    this.element.addEventListener('DOMNodeInsertedIntoDocument', this.onAppend)
  }

  public setChart(chart: PieChart) {
    if (this.chart != undefined) {
      this.chart.removeAllListeners()
      this.stage.removeChild(this.chart)
    }
    this.chart = chart
    this.listenTooltipEvents()
    this.stage.addChild(chart)
  }

  public setTooltip(tooltip: Tooltip) {
    if (this.tooltip != undefined) {
      this.element.removeChild(this.tooltip.element)
    }
    this.tooltip = tooltip
    this.listenTooltipEvents()
    this.element.appendChild(this.tooltip.element)
  }

  public resize(width: number, height: number) {
    this.stageWidth = width
    this.stageHeight = height
    this.renderer.resize(width, height)
    this.stage.children.forEach(child =>
      child.emit('stageresize', { width, height }),
    )
  }

  private listenTooltipEvents() {
    if (this.chart == undefined || this.tooltip == undefined) {
      return
    }
    this.chart.on('tooltipstart', this.onTooltipStart)
    this.chart.on('tooltipmove', this.onTooltipMove)
    this.chart.on('tooltipend', this.onTooltipEnd)
    this.chart.on('tooltipdata', this.onTooltipData)
  }

  private onAppend = () => {
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

  private onStageResize = ([
    {
      contentRect: { width, height },
    },
  ]: any) => {
    this.resize(width, height)
  }

  private onWindowResize = () => {
    const { width, height } = this.viewport.getBoundingClientRect()
    this.resize(width, height)
  }

  private onTooltipStart = (e: TooltipEvent) => {
    if (this.tooltip == undefined) {
      return
    }
    this.tooltip.moveTo(e.cursorX, e.cursorY, this.stageWidth, this.stageHeight)
    this.tooltip.show()
  }

  private onTooltipMove = (e: TooltipEvent) => {
    if (this.tooltip == undefined) {
      return
    }
    this.tooltip.moveTo(e.cursorX, e.cursorY, this.stageWidth, this.stageHeight)
  }

  private onTooltipEnd = (e: TooltipEvent) => {
    if (this.tooltip == undefined) {
      return
    }
    this.tooltip.moveTo(e.cursorX, e.cursorY, this.stageWidth, this.stageHeight)
    this.tooltip.hide()
  }

  private onTooltipData = (e: TooltipEvent) => {
    if (this.tooltip == undefined) {
      return
    }
    this.tooltip.render(e.data)
  }
}
