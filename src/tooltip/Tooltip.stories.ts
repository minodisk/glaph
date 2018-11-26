import { storiesOf } from '@storybook/html'
import Tooltip from './Tooltip'

storiesOf('Tooltip', module).add('basic', () => {
  const tooltip = new Tooltip()
  tooltip.render({
    color: 0xff0000,
    payload: {
      foo: 'bar'
    }
  })
  tooltip.show()
  return tooltip.element
})
