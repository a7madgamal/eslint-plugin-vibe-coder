import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://github.com/your-repo/rule/${name}`
);

export const rule = createRule({
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
      },
    };
  },
  name: 'no-optional-properties',
  meta: {
    docs: {
      description:
        'Disallow optional properties in TypeScript interfaces and types',
    },
    messages: {
      noOptionalProperty:
        'Optional properties should be avoided. Use required properties instead.',
    },
    type: 'suggestion',
    schema: [],
  },
  defaultOptions: [],
});

export default rule;
