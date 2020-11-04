const { createReleaseConfigWithScopeFilter } = require('../../../tools/release')

const releaserc = createReleaseConfigWithScopeFilter({
  projectScope: 'hacktoberfest-br',
  projectRoot: 'libs/hacktoberfest/br',
  buildOutput: 'dist/libs/hacktoberfest/br',
})
console.log(JSON.parse(JSON.stringify(releaserc)))
module.exports = releaserc
