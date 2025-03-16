// useGraphQLQueryComplexity.js
import { getComplexity, simpleEstimator } from 'graphql-query-complexity';

/*--------------------------------------------------------------------------------------------------------------------
            
        // COMPLEXITY RULES
    // This plugin is used to calculate the complexity of incoming GraphQL queries.
    // It dynamically applies limits based on the user's role and rate limit in the context.
    // Prevents abuse by limiting complex or deeply nested queries.

---------------------------------------------------------------------------------------------------------------------*/

/**
 * Custom Envelop plugin for GraphQL query complexity control.
 */
export function useGraphQLQueryComplexity(options) {
  const { schema, onComplete = (complexity) => {} } = options;

  return {
    onExecute({ args, setResultAndStopExecution }) {
      const { document, variables, contextValue } = args;

      // Retrieve user-specific rate limit, with default values:
      const defaultComplexity = 100; // Safe limit for guests
      const maximumComplexity = contextValue?.user?.rateLimit || defaultComplexity;

      return {
        onExecuteDone: async ({ result }) => {
          try {
            // 1. Calculate complexity
            const complexity = getComplexity({
              schema,
              query: document,
              variables: variables || {},
              estimators: [
                simpleEstimator({ defaultComplexity: 1 }),
              ],
            });

            // 2. Enforce maximum complexity
            if (complexity > maximumComplexity) {
              throw new Error(
                `Query is too complex: ${complexity}. Maximum allowed complexity: ${maximumComplexity}.`
              );
            }

            // 3. Call onComplete callback (logging, monitoring, etc.)
            onComplete(complexity, contextValue, result);
          } catch (error) {
            console.error("GraphQL Complexity Error:", error);
            setResultAndStopExecution({
              errors: [
                {
                  message: error.message || "Query complexity limit exceeded.",
                  extensions: { code: "QUERY_COMPLEXITY_LIMIT" },
                },
              ],
            });
          }
        },
      };
    },
  };
}
