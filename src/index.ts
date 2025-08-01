import noOptionalProperties from './rules/index';

const plugin = {
  rules: {
    'no-optional-properties': noOptionalProperties,
  },
  configs: {
    recommended: {
      plugins: ['vibe-coder'],
      rules: {
        'vibe-coder/no-optional-properties': 'error',
      },
    },
    strict: {
      plugins: ['vibe-coder'],
      rules: {
        'vibe-coder/no-optional-properties': 'error',
      },
    },
  },
};

export default plugin;
