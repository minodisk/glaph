console.log('=====================================================')
const registerRequireContextHook = require('babel-plugin-require-context-hook/register');
console.log(registerRequireContextHook)
registerRequireContextHook();
console.log('registerRequireContextHook: -------->',require.context)
