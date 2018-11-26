import { configure } from '@storybook/html'

const req = (require as any).context('../src', true, /\.stories\.ts$/)

configure(() => {
  req.keys().forEach(req)
}, module)
