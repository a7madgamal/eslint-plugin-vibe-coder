import type { ESLint } from 'eslint';

const plugin: ESLint.Plugin = {
  rules: {
    // Rules will be added here
  },
  configs: {
    recommended: {
      plugins: ['vibecoding'],
      rules: {
        // Recommended rules will be added here
      },
    },
  },
};

export default plugin; 