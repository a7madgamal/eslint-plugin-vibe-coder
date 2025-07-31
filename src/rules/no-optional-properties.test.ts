import { RuleTester } from 'eslint';
import rule from './no-optional-properties.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('no-optional-properties', rule, {
  valid: [
    // Valid: Required properties
    `
      interface User {
        name: string;
        email: string;
      }
    `,
    `
      type Config = {
        port: number;
        host: string;
      }
    `,
    // Valid: Optional properties with proper comment
    `
      interface User {
        //optional: This field is only set after email verification
        verifiedAt?: Date;
        name: string;
        email: string;
      }
    `,
    `
      type Config = {
        //optional: Only needed for development
        debug?: boolean;
        port: number;
        host: string;
      }
    `,
  ],
  invalid: [
    // Invalid: Optional property without comment
    {
      code: `
        interface User {
          name?: string;
          email: string;
        }
      `,
      errors: [{ messageId: 'noOptionalProperty' }],
    },
    {
      code: `
        type Config = {
          port?: number;
          host: string;
        }
      `,
      errors: [{ messageId: 'noOptionalProperty' }],
    },

    // Invalid: Wrong comment format
    {
      code: `
        interface User {
          // This is optional
          name?: string;
          email: string;
        }
      `,
      errors: [{ messageId: 'noOptionalProperty' }],
    },
    {
      code: `
        interface User {
          /* optional: This should work */
          name?: string;
          email: string;
        }
      `,
      errors: [{ messageId: 'noOptionalProperty' }],
    },
  ],
});
