import { storiesOf } from '@storybook/html'
import { blue, green, orange, red, yellow } from '../__fixtures__/colors'
import Chart from '../Chart'
import { saturation } from '../utils/color'
import Pie from './Pie'

const data1 = [
  {
    ratio: 0.4,
    color: red,
    payload: {
      ticker: 'AAAA',
      amount: 4000,
    },
  },
  {
    ratio: 0.3,
    color: orange,
    payload: {
      ticker: 'BBBB',
      amount: 3000,
    },
  },
  {
    ratio: 0.2,
    color: yellow,
    payload: {
      ticker: 'CCCC',
      amount: 2000,
    },
  },
  {
    ratio: 0.08,
    color: green,
    payload: {
      ticker: 'DDDD',
      amount: 800,
    },
  },
  {
    ratio: 0.02,
    color: blue,
    payload: {
      ticker: 'EEEE',
      amount: 200,
    },
  },
]
const data2 = [
  {
    ratio: 0.2,
    color: saturation(red, -0.2),
    payload: {
      item: 'A-1',
      amount: 2000,
    },
  },
  {
    ratio: 0.1,
    color: saturation(red, -0.3),
    payload: {
      item: 'A-2',
      amount: 1000,
    },
  },
  {
    ratio: 0.06,
    color: saturation(red, -0.4),
    payload: {
      item: 'A-3',
      amount: 600,
    },
  },
  {
    ratio: 0.04,
    color: saturation(red, -0.5),
    payload: {
      item: 'A-4',
      amount: 400,
    },
  },

  {
    ratio: 0.2,
    color: saturation(orange, -0.2),
    payload: {
      ticker: 'B-1',
      amount: 2000,
    },
  },
  {
    ratio: 0.08,
    color: saturation(orange, -0.3),
    payload: {
      ticker: 'B-2',
      amount: 800,
    },
  },
  {
    ratio: 0.02,
    color: saturation(orange, -0.4),
    payload: {
      ticker: 'B-3',
      amount: 200,
    },
  },

  {
    ratio: 0.14,
    color: saturation(yellow, -0.2),
    payload: {
      ticker: 'C-1',
      amount: 1400,
    },
  },
  {
    ratio: 0.06,
    color: saturation(yellow, -0.3),
    payload: {
      ticker: 'C-2',
      amount: 600,
    },
  },

  {
    ratio: 0.05,
    color: saturation(green, -0.2),
    payload: {
      ticker: 'D-1',
      amount: 500,
    },
  },
  {
    ratio: 0.03,
    color: saturation(green, -0.3),
    payload: {
      ticker: 'D-2',
      amount: 300,
    },
  },

  {
    ratio: 0.02,
    color: saturation(blue, -0.2),
    payload: {
      ticker: 'E-1',
      amount: 200,
    },
  },
]

storiesOf('pie/Pie', module)
  .add('basic', () => {
    const chart = new Chart(600, 400)
    const pie = new Pie()
    pie.render(data1)
    chart.addChart(pie)
    return chart.element
  })
  .add('donuts', () => {
    const chart = new Chart(600, 400)
    const pie = new Pie({
      innerRadiusRatio: 0.6,
      outerRadiusRatio: 1,
    })
    pie.render(data1)
    chart.addChart(pie)
    return chart.element
  })
  .add('double donuts', () => {
    const chart = new Chart(600, 400)
    const pie1 = new Pie({
      innerRadiusRatio: 0,
      outerRadiusRatio: 0.5,
    })
    pie1.render(data1)
    chart.addChart(pie1)
    const pie2 = new Pie({
      innerRadiusRatio: 0.5,
      outerRadiusRatio: 1,
    })
    pie2.render(data2)
    chart.addChart(pie2)
    return chart.element
  })
  .add('half donuts', () => {
    const chart = new Chart(600, 400)
    const pie = new Pie({
      innerRadiusRatio: 0.6,
      outerRadiusRatio: 1,
      startAngle: -Math.PI,
      endAngle: 0,
    })
    pie.render(data1)
    chart.addChart(pie)
    return chart.element
  })
