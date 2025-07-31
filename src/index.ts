import type { ESLint } from 'eslint';
import { noOptionalProperties } from './rules/index.js';

const plugin: ESLint.Plugin = {
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
  },
};

export default plugin;
