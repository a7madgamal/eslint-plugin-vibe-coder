import type { Linter } from '@typescript-eslint/utils/ts-eslint';
import { noOptionalProperties } from './rules/index.js';

const plugin = {
  rules: {
    'no-optional-properties': noOptionalProperties,
  },
  configs: {
    recommended: {
      plugins: ['vibecoding'],
      rules: {
        'vibecoding/no-optional-properties': 'error',
      },
    },
    strict: {
      plugins: ['vibecoding'],
      rules: {
        'vibecoding/no-optional-properties': 'error',
      },
    },
  },
} satisfies Linter.Plugin;

export default plugin;
