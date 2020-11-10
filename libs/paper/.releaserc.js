const { createReleaseConfigWithScopeFilter } = require('../../tools/release');

const releaserc = createReleaseConfigWithScopeFilter({
  projectScope: 'paper',
  projectRoot: 'libs/paper',
  buildOutput: 'dist/libs/paper',
});
console.log(JSON.stringify(releaserc));
module.exports = releaserc;
