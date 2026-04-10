import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/out-tsc', '**/vitest.config.*.timestamp*'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: 'type:api',
              onlyDependOnLibsWithTags: ['type:api'],
            },
            {
              sourceTag: 'type:data-access',
              onlyDependOnLibsWithTags: ['type:api'],
            },
            {
              sourceTag: 'type:feature',
              onlyDependOnLibsWithTags: ['type:api', 'type:ui', 'type:data-access', 'type:feature'],
            },
            {
              sourceTag: 'scope:petshop',
              onlyDependOnLibsWithTags: [
                'type:api',
                'type:ui',
                'type:data-access',
                'type:shell',
              ],
            },
            {
              sourceTag: 'scope:*',
              onlyDependOnLibsWithTags: ['scope:*'],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];
