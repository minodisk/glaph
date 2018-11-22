import { storiesOf } from '@storybook/html'
import { Chart, Pie } from '../src/index'

const data1 = [
  {
    ratio: 0.4,
    color: 0xf7473b,
    payload: {
      ticker: 'AAAA',
      amount: 4000
    }
  },
  {
    ratio: 0.3,
    color: 0xf78154,
    payload: {
      ticker: 'BBBB',
      amount: 3000
    }
  },
  {
    ratio: 0.2,
    color: 0xf2c14e,
    payload: {
      ticker: 'CCCC',
      amount: 2000
    }
  },
  {
    ratio: 0.08,
    color: 0x3b8b88,
    payload: {
      ticker: 'DDDD',
      amount: 800
    }
  },
  {
    ratio: 0.02,
    color: 0x2176ae,
    payload: {
      ticker: 'EEEE',
      amount: 200
    }
  }
]
const data2 = [
  {
    ratio: 0.2,
    color: 0xf75e54,
    payload: {
      item: 'A-1',
      amount: 2000
    }
  },
  {
    ratio: 0.1,
    color: 0xf7766d,
    payload: {
      item: 'A-2',
      amount: 1000
    }
  },
  {
    ratio: 0.06,
    color: 0xf78d85,
    payload: {
      item: 'A-3',
      amount: 600
    }
  },
  {
    ratio: 0.04,
    color: 0xf7a49e,
    payload: {
      item: 'A-4',
      amount: 400
    }
  },

  {
    ratio: 0.2,
    color: 0xf7936d,
    payload: {
      ticker: 'B-1',
      amount: 2000
    }
  },
  {
    ratio: 0.08,
    color: 0xf7a585,
    payload: {
      ticker: 'B-2',
      amount: 800
    }
  },
  {
    ratio: 0.02,
    color: 0xf7b79e,
    payload: {
      ticker: 'B-3',
      amount: 200
    }
  },

  {
    ratio: 0.14,
    color: 0xf2c866,
    payload: {
      ticker: 'C-1',
      amount: 1400
    }
  },
  {
    ratio: 0.06,
    color: 0xf2cf7e,
    payload: {
      ticker: 'C-2',
      amount: 600
    }
  },

  {
    ratio: 0.05,
    color: 0x488b88,
    payload: {
      ticker: 'D-1',
      amount: 500
    }
  },
  {
    ratio: 0.03,
    color: 0x568b89,
    payload: {
      ticker: 'D-2',
      amount: 300
    }
  },

  {
    ratio: 0.02,
    color: 0x327dae,
    payload: {
      ticker: 'E-1',
      amount: 200
    }
  }
]

storiesOf('PieChart', module)
  .add('basic', () => {
    const chart = new Chart(600, 400)
    const pie = new Pie()
    pie.render(data1)
    chart.addChart(pie)
    return chart.element
  })
  .add('dounuts', () => {
    const chart = new Chart(600, 400)
    const pie = new Pie({
      radiusRatioFrom: 0.6,
      radiusRatioTo: 1
    })
    pie.render(data1)
    chart.addChart(pie)
    return chart.element
  })
  .add('double dounuts', () => {
    const chart = new Chart(600, 400)
    const pie1 = new Pie({
      radiusRatioFrom: 0,
      radiusRatioTo: 0.5
    })
    pie1.render(data1)
    chart.addChart(pie1)
    const pie2 = new Pie({
      radiusRatioFrom: 0.5,
      radiusRatioTo: 1
    })
    pie2.render(data2)
    chart.addChart(pie2)
    return chart.element
  })
