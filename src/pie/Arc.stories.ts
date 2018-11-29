import { storiesOf } from '@storybook/html'
import { red } from '../__fixtures__/colors'
import Application from '../Application'
import Arc from './Arc'

const book = storiesOf('pie/Arc', module)
;[
  {
    name: '0~0',
    startAngle: 0,
    endAngle: 0,
  },
  {
    name: '0~120',
    startAngle: 0,
    endAngle: (Math.PI * 2) / 3,
  },
  {
    name: '0~240',
    startAngle: 0,
    endAngle: (Math.PI * 4) / 3,
  },
  {
    name: '0~360',
    startAngle: 0,
    endAngle: Math.PI * 2,
  },
  {
    name: '0~-120',
    startAngle: 0,
    endAngle: -(Math.PI * 2) / 3,
  },
  {
    name: '0~-240',
    startAngle: 0,
    endAngle: -(Math.PI * 4) / 3,
  },
  {
    name: '0~-360',
    startAngle: 0,
    endAngle: -Math.PI * 2,
  },
  {
    name: '-90~30',
    startAngle: -Math.PI / 2,
    endAngle: Math.PI / 6,
  },
  {
    name: '-90~-210',
    startAngle: -Math.PI / 2,
    endAngle: -(Math.PI * 7) / 6,
  },
].forEach(({ name, startAngle, endAngle }) => {
  book.add(name, () => {
    const arc = new Arc()
    arc.x = 300
    arc.y = 200
    arc.render(
      {
        innerRadius: 100,
        outerRadius: 200,
        startAngle,
        endAngle,
      },
      {
        ratio: 0.5,
        color: red,
        payload: null,
      },
    )
    const chart = new Application({
      width: 600,
      height: 400,
    })
    chart.addChart(arc)
    return chart.element
  })
})
