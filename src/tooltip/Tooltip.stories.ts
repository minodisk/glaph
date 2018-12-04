import { storiesOf } from '@storybook/html'
import { utils } from 'pixi.js'
import { red } from '../__fixtures__/colors'
import Application from '../Application'
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
  .add('moveTo', () => {
    const tooltip = new Tooltip()
    tooltip.render({
      color: red,
      payload: {
        foo: 'bar',
      },
    })
    tooltip.show()
    tooltip.moveTo(300, 300, 400, 400)

    const app = new Application({
      width: 400,
      height: 400,
    })
    app.setTooltip(tooltip)
    return app.element
  })
