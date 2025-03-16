// envelopConfig.js
import { envelop } from '@envelop/core';
import { useJoiValidation } from './joiPlugIn/index.mjs';
import { useGraphQLQueryComplexity } from './complexityPlugin/complexity.mjs';
import depthLimit from './depthLimit/depthLimit.mjs';
import extendContextPlugin from './extendedContextPlugin/extendedContext.mjs';
import { makeExecutableSchema } from '@graphql-tools/schema';
import {typeDefs, resolvers} from '../schemas/index.mjs';

import { logInput, logResult } from '../schemas/resolvers/utils.mjs';
import permissions from '../auth/shield.mjs';
import { applyMiddleware } from '../node_modules/graphql-middleware/dist/index.mjs';

/**
 * Build the base schema
 */
const baseSchema = makeExecutableSchema({ typeDefs, resolvers });

/**
 * (Optional) Wrap the schema with graphql-shield permissions, logInput, etc.
 * If you are actively using those, otherwise omit.
 */
const schemaWithMiddleware = applyMiddleware(
  baseSchema,
  permissions,
  logInput,
  logResult
);

/**
 * Create the Envelop instance with your plugins.
 */
export function createEnvelopInstance() {
  // If you want to transform the schema with each plugin’s onSchema hook, pass
  // the final schema in the "plugins" options, not here. But to keep it simple:
  return envelop({
    plugins: [
      // For example, validate incoming arguments with Joi
      useJoiValidation(),
      // Query complexity plugin
      useGraphQLQueryComplexity({
        schema: schemaWithMiddleware, // or just baseSchema if no shield
        maximumComplexity: 1000,
        onComplete: (complexity) => {
          console.log(`Query complexity: ${complexity}`);
        },
      }),
      // Depth limit
      depthLimit(10),
      // Extended context plugin
      extendContextPlugin,
    ],
  });
}
