# eslint-plugin-vibe-coder

ESLint plugin with custom rules to prevent common bad practices made by robots (and humans who code like robots).

## Installation

```bash
npm install --save-dev eslint-plugin-vibe-coder
```

## Usage

Add the plugin to your ESLint configuration:

```javascript
// eslint.config.js
import vibeCoder from 'eslint-plugin-vibe-coder';

export default [
  {
    plugins: {
      'vibe-coder': vibeCoder,
    },
    rules: {
      'vibe-coder/no-optional-properties': 'error',
    },
  },
];
```

Or use the recommended configuration:

```javascript
// eslint.config.js
import vibeCoder from 'eslint-plugin-vibe-coder';

export default [
  {
    ...vibeCoder.configs.recommended,
  },
];
```

## Rules

### no-optional-properties

Disallows optional properties in TypeScript interfaces and types. This rule encourages more explicit and predictable code by requiring all properties to be defined.

**❌ Invalid:**

```typescript
interface User {
  name?: string;
  email: string | undefined;
  avatar: string | null;
}

type Config = {
  port?: number;
  host: string | undefined;
};
```

**✅ Valid:**

```typescript
interface User {
  name: string;
  email: string;
  avatar: string;
}

type Config = {
  port: number;
  host: string;
};
```

## Configurations

This plugin provides the following configurations:

- `recommended`: Enables the `no-optional-properties` rule as an error
- `strict`: Same as recommended (currently identical)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new rules
5. Run `npm test` to ensure all tests pass
6. Submit a pull request

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint

# Build the project
npm run build
```

## License

MIT
