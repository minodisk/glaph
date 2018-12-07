import { storiesOf } from '@storybook/html'
import Application from '../Application'
import Graphics from './ExtGraphics'

const draw = (graphics: Graphics) => {
  graphics.moveTo(50, 50)
  graphics.lineTo(750, 50)
  graphics.lineTo(750, 550)
  graphics.lineTo(50, 550)
  graphics.lineTo(50, 100)

  graphics.moveTo(100, 500)
  graphics.lineTo(150, 200)
  graphics.lineTo(400, 300)
  graphics.lineTo(700, 100)

  graphics.moveTo(200, 500)
  graphics.lineTo(300, 300)
  graphics.lineTo(400, 400)
  graphics.lineTo(500, 450)
  graphics.lineTo(600, 250)
  graphics.lineTo(700, 200)
}

storiesOf('graphics/ExtGraphics', module)
  .add('dashStyle(1)', () => {
    const app = new Application({ width: 800, height: 600 })
    const graphics = new Graphics()
    graphics.lineStyle(1)
    graphics.dashStyle(1)
    draw(graphics)
    app.addChild(graphics)
    return app.element
  })
  .add('dashStyle(2, 1)', () => {
    const app = new Application({ width: 800, height: 600 })
    const graphics = new Graphics()
    graphics.lineStyle(1)
    graphics.dashStyle(2, 1)
    draw(graphics)
    app.addChild(graphics)
    return app.element
  })
  .add('dashStyle(3, 1)', () => {
    const app = new Application({ width: 800, height: 600 })
    const graphics = new Graphics()
    graphics.lineStyle(1)
    graphics.dashStyle(3, 1)
    draw(graphics)
    app.addChild(graphics)
    return app.element
  })
  .add('dashStyle(10, 5)', () => {
    const app = new Application({ width: 800, height: 600 })
    const graphics = new Graphics()
    graphics.lineStyle(1)
    graphics.dashStyle(10, 5)
    draw(graphics)
    app.addChild(graphics)
    return app.element
  })
  .add('dashStyle(20, 5)', () => {
    const app = new Application({ width: 800, height: 600 })
    const graphics = new Graphics()
    graphics.lineStyle(1)
    graphics.dashStyle(20, 5)
    draw(graphics)
    app.addChild(graphics)
    return app.element
  })
  .add('dashStyle(10)', () => {
    const app = new Application({ width: 800, height: 600 })
    const graphics = new Graphics()
    graphics.lineStyle(1)
    graphics.dashStyle(10)
    draw(graphics)
    app.addChild(graphics)
    return app.element
  })
  .add('dashStyle(10, 2, 1, 2)', () => {
    const app = new Application({ width: 800, height: 600 })
    const graphics = new Graphics()
    graphics.lineStyle(1)
    graphics.dashStyle(10, 2, 1, 2)
    draw(graphics)
    app.addChild(graphics)
    return app.element
  })
  .add('dashStyle(10, 2, 2, 2, 2, 2)', () => {
    const app = new Application({ width: 800, height: 600 })
    const graphics = new Graphics()
    graphics.lineStyle(1)
    graphics.dashStyle(10, 2, 2, 2, 2, 2)
    draw(graphics)
    app.addChild(graphics)
    return app.element
  })
  .add('dashStyle(10, 2, 5, 2, 2, 2, 5, 2)', () => {
    const app = new Application({ width: 800, height: 600 })
    const graphics = new Graphics()
    graphics.lineStyle(1)
    graphics.dashStyle(10, 2, 5, 2, 2, 2, 5, 2)
    draw(graphics)
    app.addChild(graphics)
    return app.element
  })
