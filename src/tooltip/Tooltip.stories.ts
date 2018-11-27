import { storiesOf } from '@storybook/html'
<<<<<<< HEAD
import { Application, Graphics, utils } from 'pixi.js'
import { blue, red } from '../__fixtures__/colors'
import Tooltip from './Tooltip'

storiesOf('tooltip/Tooltip', module)
  .add('default', () => {
    const tooltip = new Tooltip()
    tooltip.render({
      color: red,
      payload: {
        foo: 'bar',
      },
    })
    return tooltip.element
  })
  .add('show', () => {
    const tooltip = new Tooltip()
    tooltip.render({
      color: red,
      payload: {
        foo: 'bar',
      },
    })
    tooltip.show()
    return tooltip.element
  })
  .add('custom renderer', () => {
    const tooltip = new Tooltip(({ color, payload }) => {
      const ol = document.createElement('ol')
      ol.style.margin = '0'
      ol.style.padding = '10px 10px 10px 30px'
      ol.style.borderRadius = '5px'
      ol.style.backgroundColor = utils.hex2string(color)
      ol.style.color = 'white'
      Object.keys(payload).forEach((key: string) => {
        const li = document.createElement('li')
        li.innerText = `${key}: ${payload[key]}`
        ol.appendChild(li)
      })
      return ol
    })
    tooltip.render({
      color: red,
      payload: {
        foo: 'bar',
      },
    })
    tooltip.show()
    return tooltip.element
  })
  .add('moveTo orthant 1', () => {
    const tooltip = new Tooltip()
    tooltip.render({
      color: red,
      payload: {
        foo: 'bar',
      },
    })
    tooltip.show()
    tooltip.moveTo(300, 300, 400, 400)

    const frame = createFrame(300, 300, 400, 400)
    frame.appendChild(tooltip.element)

    return frame
  })
  .add('moveTo orthant 2', () => {
    const tooltip = new Tooltip()
    tooltip.render({
      color: red,
      payload: {
        foo: 'bar',
      },
    })
    tooltip.show()
    tooltip.moveTo(100, 300, 400, 400)

    const frame = createFrame(100, 300, 400, 400)
    frame.appendChild(tooltip.element)

    return frame
  })
  .add('moveTo orthant 3', () => {
    const tooltip = new Tooltip()
    tooltip.render({
      color: red,
      payload: {
        foo: 'bar',
      },
    })
    tooltip.show()
    tooltip.moveTo(100, 100, 400, 400)

    const frame = createFrame(100, 100, 400, 400)
    frame.appendChild(tooltip.element)

    return frame
  })
  .add('moveTo orthant 4', () => {
    const tooltip = new Tooltip()
    tooltip.render({
      color: red,
      payload: {
        foo: 'bar',
      },
    })
    tooltip.show()
    tooltip.moveTo(300, 100, 400, 400)

    const frame = createFrame(300, 100, 400, 400)
    frame.appendChild(tooltip.element)

    return frame
  })

const createFrame = (
  cursorX: number,
  cursorY: number,
  stageWidth: number,
  stageHeight: number,
) => {
  const app = new Application({
    width: 400,
    height: 400,
    antialias: true,
    transparent: true,
    resolution: window.devicePixelRatio,
  })
  app.view.style.width = '400px'
  app.view.style.height = '400px'

  const orthants = new Graphics()
  orthants.lineStyle(1, blue)
  orthants.drawRect(0, 0, stageWidth, stageHeight)
  orthants.moveTo(stageWidth / 2, 0)
  orthants.lineTo(stageWidth / 2, stageHeight)
  orthants.moveTo(0, stageHeight / 2)
  orthants.lineTo(stageWidth, stageHeight / 2)
  app.stage.addChild(orthants)

  const pointer = new Graphics()
  pointer.lineStyle(2, 0xffffff)
  pointer.beginFill(0x000000)
  pointer.moveTo(0, 0)
  pointer.lineTo(-6.5, 15)
  pointer.lineTo(-2, 13)
  pointer.lineTo(-2, 19)
  pointer.lineTo(2, 19)
  pointer.lineTo(2, 13)
  pointer.lineTo(6.5, 15)
  pointer.lineTo(0, 0)
  pointer.rotation = -Math.PI / 8
  pointer.x = cursorX
  pointer.y = cursorY
  app.stage.addChild(pointer)

  const div = document.createElement('div')
  div.style.position = 'relative'
  div.appendChild(app.view)

  return div
}
