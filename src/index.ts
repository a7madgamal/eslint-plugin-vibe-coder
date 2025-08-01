import {
  RuleModule,
  RuleListener,
} from '@typescript-eslint/utils/dist/ts-eslint';
import { ESLint } from 'eslint';
import { rules } from './rules/index.js';

type RuleKey = keyof typeof rules;

interface Plugin extends Omit<ESLint.Plugin, 'rules'> {
  rules: Record<RuleKey, RuleModule<string, readonly unknown[], RuleListener>>;
}

const plugin: Plugin = {
  meta: {
    name: 'eslint-plugin-vibe-coder',
    version: '0.0.4',
  },
  rules,
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

// Export the plugin directly for ESLint compatibility
export = plugin;
