module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        // Minor
        'feat',
        // Patch
        'build',
        'docs',
        'fix',
        'perf',
        'refactor',
        // None
        'cleanup',
        'chore',
        'ci',
        'revert',
        'test',
        'wip'
      ],
    ],
    'scope-empty': [0],
    'scope-enum': [
      2,
      'always',
      // prettier-ignore
      [
        'card'
      ],
    ],
  },
  ignores: [message => message.toLowerCase().startsWith('wip')],
};
