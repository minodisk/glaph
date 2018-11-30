import * as assert from 'assert'
import Application from './Application'
import * as objects from './index'
import Arc from './pie/Arc'
import Pie from './pie/Pie'
import Tooltip from './tooltip/Tooltip'
import * as color from './utils/color'

describe('index', () => {
  it(`should export valid modules`, () => {
    assert.deepEqual(objects, {
      Application,
      Arc,
      Pie,
      Tooltip,
      utils: {
        color,
      },
    })
  })
})
