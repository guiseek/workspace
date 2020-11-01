const { createReleaseConfigWithScopeFilter } = require('../../tools/release')

const releaserc = createReleaseConfigWithScopeFilter({
  projectScope: 'card',
  projectRoot: 'libs/card',
  buildOutput: 'dist/libs/card',
})
console.log(JSON.stringify(releaserc))
module.exports = releaserc
