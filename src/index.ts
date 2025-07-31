import { noOptionalProperties } from './rules/index';

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
};

export default plugin;
