import { storiesOf } from '@storybook/html'
import * as aapl from '../__fixtures__/aapl.json'
import * as amzn from '../__fixtures__/amzn.json'
import { blue, green, orange, red, yellow } from '../__fixtures__/colors'
import * as fb from '../__fixtures__/fb.json'
import * as goog from '../__fixtures__/goog.json'
import * as nflx from '../__fixtures__/nflx.json'
import * as nvda from '../__fixtures__/nvda.json'
import Application from '../Application'
import Chart from './Chart'

storiesOf('line/Chart', module).add('1', () => {
  const app = new Application({ width: 800, height: 600 })
  const chart = new Chart()
  chart.render([
    {
      props: {
        lineWidth: 3,
        color: red,
        dashStyle: [10, 3],
      },
      data: aapl.map(({ date, close }) => ({ x: date, y: close })),
    },
    {
      props: {
        lineWidth: 3,
        color: orange,
      },
      data: amzn.map(({ date, close }) => ({ x: date, y: close })),
    },
    {
      props: {
        lineWidth: 3,
        color: blue,
      },
      data: fb.map(({ date, close }) => ({ x: date, y: close })),
    },
    {
      props: {
        lineWidth: 3,
        color: yellow,
      },
      data: goog.map(({ date, close }) => ({ x: date, y: close })),
    },
    {
      props: {
        lineWidth: 3,
        color: red,
      },
      data: nflx.map(({ date, close }) => ({ x: date, y: close })),
    },
    {
      props: {
        lineWidth: 3,
        color: green,
      },
      data: nvda.map(({ date, close }) => ({ x: date, y: close })),
    },
  ])
  app.setChart(chart)
  return app.element
})
