// @ts-expect-error No types published for @typescript-eslint/rule-tester
import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from './no-optional-properties.js';
import type {
  RuleModule,
  RuleListener,
} from '@typescript-eslint/utils/dist/ts-eslint';

// Provide afterAll for RuleTester compatibility with Mocha
(globalThis as unknown as { afterAll: typeof after }).afterAll = after;

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
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
      // Valid: Complex types without optional
      `
        interface Product {
          id: string;
          name: string;
          price: number;
          category: 'electronics' | 'clothing' | 'books';
          tags: string[];
          metadata: Record<string, unknown>;
        }
      `,
      // Valid: Nested interfaces
      `
        interface Address {
          street: string;
          city: string;
          country: string;
        }
        
        interface Customer {
          id: string;
          name: string;
          address: Address;
          preferences: {
            theme: 'light' | 'dark';
            language: 'en' | 'es' | 'fr';
          };
        }
      `,
      // Valid: Generic types
      `
        interface ApiResponse<T> {
          data: T;
          status: number;
          message: string;
        }
      `,
      // Valid: Function types
      `
        interface EventHandler {
          onSuccess: (data: unknown) => void;
          onError: (error: Error) => void;
          onComplete: () => void;
        }
      `,
      // Valid: Array types
      `
        interface Collection {
          items: string[];
          count: number;
          isEmpty: boolean;
        }
      `,
    ];

    ruleTester.run(
      'no-optional-properties',
      rule as unknown as RuleModule<'noOptionalProperty', [], RuleListener>,
      {
        valid: validCases,
        invalid: [],
      }
    );
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
      // Invalid: Multiple optional properties
      {
        code: `
          interface FormData {
            firstName?: string;
            lastName?: string;
            email?: string;
            phone?: string;
          }
        `,
        errors: [
          { messageId: 'noOptionalProperty' as const },
          { messageId: 'noOptionalProperty' as const },
          { messageId: 'noOptionalProperty' as const },
          { messageId: 'noOptionalProperty' as const },
        ],
      },
      // Invalid: Complex union with undefined
      {
        code: `
          interface ApiResponse {
            data: User[] | undefined;
            error: string | undefined;
            timestamp: number;
          }
        `,
        errors: [
          { messageId: 'noOptionalProperty' as const },
          { messageId: 'noOptionalProperty' as const },
        ],
      },
      // Invalid: Nested optional properties
      {
        code: `
          interface Settings {
            theme: {
              primary?: string;
              secondary?: string;
            };
            notifications: {
              email?: boolean;
              push?: boolean;
            };
          }
        `,
        errors: [
          { messageId: 'noOptionalProperty' as const },
          { messageId: 'noOptionalProperty' as const },
          { messageId: 'noOptionalProperty' as const },
          { messageId: 'noOptionalProperty' as const },
        ],
      },
      // Invalid: Generic with optional
      {
        code: `
          interface CacheEntry<T> {
            key: string;
            value?: T;
            expiresAt: number;
          }
        `,
        errors: [{ messageId: 'noOptionalProperty' as const }],
      },
      // Invalid: Function with optional parameters
      {
        code: `
          interface Callback {
            onSuccess?: (data: unknown) => void;
            onError?: (error: Error) => void;
            onComplete?: () => void;
          }
        `,
        errors: [
          { messageId: 'noOptionalProperty' as const },
          { messageId: 'noOptionalProperty' as const },
          { messageId: 'noOptionalProperty' as const },
        ],
      },
      // Invalid: Array with optional elements
      {
        code: `
          interface TodoList {
            items: (string | undefined)[];
            completed: (boolean | null)[];
            priority: number;
          }
        `,
        errors: [
          { messageId: 'noOptionalProperty' as const },
          { messageId: 'noOptionalProperty' as const },
        ],
      },
      // Invalid: Mixed valid and invalid
      {
        code: `
          interface Mixed {
            required: string;
            optional?: number;
            alsoRequired: boolean;
            nullable: string | null;
            validUnion: 'a' | 'b' | 'c';
          }
        `,
        errors: [
          { messageId: 'noOptionalProperty' as const },
          { messageId: 'noOptionalProperty' as const },
        ],
      },
    ];

    ruleTester.run(
      'no-optional-properties',
      rule as unknown as RuleModule<'noOptionalProperty', [], RuleListener>,
      {
        valid: [],
        invalid: invalidCases,
      }
    );
  });
});
