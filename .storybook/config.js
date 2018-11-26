const { configure } = require( "@storybook/html");

console.log(require)
const req = require.context('../stories', true, /\.stories\.ts$/)

configure(() => {
  req.keys().forEach(filename => req(filename))
}, module);
