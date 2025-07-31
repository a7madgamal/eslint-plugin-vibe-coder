import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://github.com/your-repo/rule/${name}`
);

const rule = createRule({
  create(context) {
    return {
      TSPropertySignature(node: TSESTree.TSPropertySignature) {
        // Check if the property is optional (has ?)
        if (node.optional === true) {
          context.report({
            node,
            messageId: 'noOptionalProperty',
          });
          return;
        }

        // Check if the type is a union with undefined or null
        const typeAnnotation = node.typeAnnotation?.typeAnnotation;

        if (typeAnnotation?.type === 'TSUnionType') {
          const { types } = typeAnnotation;
          const hasOptionalType = types.some((type) => {
            // Check for undefined and null keywords
            if (
              type.type === 'TSUndefinedKeyword' ||
              type.type === 'TSNullKeyword'
            ) {
              return true;
            }
            return false;
          });

          if (hasOptionalType) {
            context.report({
              node,
              messageId: 'noOptionalProperty',
            });
          }
        }

        // Check if the type is an array with union elements containing undefined/null
        if (typeAnnotation?.type === 'TSArrayType') {
          const elementType = typeAnnotation.elementType;
          if (elementType.type === 'TSUnionType') {
            const { types } = elementType;
            const hasOptionalType = types.some((type) => {
              if (
                type.type === 'TSUndefinedKeyword' ||
                type.type === 'TSNullKeyword'
              ) {
                return true;
              }
              return false;
            });

            if (hasOptionalType) {
              context.report({
                node,
                messageId: 'noOptionalProperty',
              });
            }
          }
        }
      },
      PropertyDefinition(node: TSESTree.PropertyDefinition) {
        // Check if the property is optional (has ?)
        if (node.optional === true) {
          context.report({
            node,
            messageId: 'noOptionalProperty',
          });
          return;
        }

        // Check if the type is a union with undefined or null
        const typeAnnotation = node.typeAnnotation?.typeAnnotation;

        if (typeAnnotation?.type === 'TSUnionType') {
          const { types } = typeAnnotation;
          const hasOptionalType = types.some((type) => {
            // Check for undefined and null keywords
            if (
              type.type === 'TSUndefinedKeyword' ||
              type.type === 'TSNullKeyword'
            ) {
              return true;
            }
            return false;
          });

          if (hasOptionalType) {
            context.report({
              node,
              messageId: 'noOptionalProperty',
            });
          }
        }

        // Check if the type is an array with union elements containing undefined/null
        if (typeAnnotation?.type === 'TSArrayType') {
          const elementType = typeAnnotation.elementType;
          if (elementType.type === 'TSUnionType') {
            const { types } = elementType;
            const hasOptionalType = types.some((type) => {
              if (
                type.type === 'TSUndefinedKeyword' ||
                type.type === 'TSNullKeyword'
              ) {
                return true;
              }
              return false;
            });

            if (hasOptionalType) {
              context.report({
                node,
                messageId: 'noOptionalProperty',
              });
            }
          }
        }
      },
    };
  },
  name: 'no-optional-properties',
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Disallow optional properties in TypeScript interfaces and types',
    },
    schema: [],
    messages: {
      noOptionalProperty:
        'Optional properties should be avoided. Use required properties instead.',
    },
  },
  defaultOptions: [],
});

// Export the rule object directly for compatibility with standard ESLint RuleTester
module.exports = rule;

// Also export for ES modules compatibility
export { rule };
