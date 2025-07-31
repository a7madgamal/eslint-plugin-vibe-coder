import type { Rule } from 'eslint';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Prevent optional properties in types and interfaces to encourage explicit design decisions',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: undefined,
    schema: [],
    messages: {
      noOptionalProperty:
        'Optional properties should be avoided. Use required properties or union types instead. If this property is truly optional, add a comment above: "//optional: reason"',
    },
  },
  create(context: Rule.RuleContext) {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      TSPropertySignature(node: any) {
        // Check if the property is optional (has ?)
        if (node.optional) {
          // Get the previous token to check for comments
          const sourceCode = context.getSourceCode();
          const prevToken = sourceCode.getTokenBefore(node);

          if (prevToken) {
            const comments = sourceCode.getCommentsBefore(prevToken);
            const hasOptionalComment = comments.some(
              (comment) =>
                comment.type === 'Line' &&
                comment.value.trim().startsWith('optional:')
            );

            if (!hasOptionalComment) {
              context.report({
                node,
                messageId: 'noOptionalProperty',
              });
            }
          } else {
            // No previous token, check comments before the node itself
            const comments = sourceCode.getCommentsBefore(node);
            const hasOptionalComment = comments.some(
              (comment) =>
                comment.type === 'Line' &&
                comment.value.trim().startsWith('optional:')
            );

            if (!hasOptionalComment) {
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
};

export default rule;
