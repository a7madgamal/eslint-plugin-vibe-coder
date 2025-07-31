import { describe, it } from 'vitest';
import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from './no-optional-properties.js';
import parser from '@typescript-eslint/parser';

const ruleTester = new RuleTester({
  languageOptions: {
    parser,
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
  },
});

describe('no-optional-properties', () => {
  it('should pass for valid cases', () => {
    const validCases = [
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
      // Valid: Union types without undefined/null
      `
        interface User {
          role: 'admin' | 'user' | 'guest';
          status: 'active' | 'inactive';
        }
      `,
    ];

    ruleTester.run('no-optional-properties', rule, {
      valid: validCases,
      invalid: [],
    });
  });

  it('should fail for invalid cases', () => {
    const invalidCases = [
      // Invalid: Optional property
      {
        code: `
          interface User {
            name?: string;
            email: string;
          }
        `,
        errors: [{ messageId: 'noOptionalProperty' as const }],
      },
      {
        code: `
          type Config = {
            port?: number;
            host: string;
          }
        `,
        errors: [{ messageId: 'noOptionalProperty' as const }],
      },
      // Invalid: Union with undefined
      {
        code: `
          interface User {
            name: string | undefined;
            email: string;
          }
        `,
        errors: [{ messageId: 'noOptionalProperty' as const }],
      },
      // Invalid: Union with null
      {
        code: `
          interface User {
            avatar: string | null;
            email: string;
          }
        `,
        errors: [{ messageId: 'noOptionalProperty' as const }],
      },
      // Invalid: Optional property with comment (should still fail)
      {
        code: `
          interface User {
            //optional: This field is only set after email verification
            verifiedAt?: Date;
            name: string;
            email: string;
          }
        `,
        errors: [{ messageId: 'noOptionalProperty' as const }],
      },
    ];

    ruleTester.run('no-optional-properties', rule, {
      valid: [],
      invalid: invalidCases,
    });
  });
});
