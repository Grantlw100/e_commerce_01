// envelopConfig.js
import { envelop } from '@envelop/core';
import validationSchemas from './joiPlugIn/joiSchemas/index.mjs';
import { useJoiValidation } from './joiPlugIn/index.mjs';
import { useGraphQLQueryComplexity } from './complexityPlugin/complexity.mjs';
import depthLimit from './depthLimit/depthLimit.mjs';
import extendContextPlugin from './extendedContextPlugin/extendedContext.mjs';
import { makeExecutableSchema } from '@graphql-tools/schema';
import {typeDefs, resolvers} from '../schemas/index.mjs';
import { printSchema } from "graphql";
import { gql } from 'apollo-server-express';

import { logInput, logResult } from '../schemas/resolvers/utils.mjs';
import permissions from '../auth/shield.mjs';
import { applyMiddleware } from '../node_modules/graphql-middleware/dist/index.mjs';
import fulltypedefs from '../schemas/typeDefs/typedefs.mjs';

// import testSchema from '../throwOut.mjs';


// const baseSchema = makeExecutableSchema({ typeDefs: gql`
//     ${fulltypedefs}
//   `, resolvers });

// /**
//  * (Optional) Wrap the schema with graphql-shield permissions, logInput, etc.
//  * If you are actively using those, otherwise omit.
//  */
// const schemaWithMiddleware = applyMiddleware(
//   baseSchema,
//   permissions,
//   logInput,
//   logResult
// );

  

/**
 * Create the Envelop instance with your plugins.
 */
// export function createEnvelopInstance() {
//   // If you want to transform the schema with each plugin’s onSchema hook, pass
//   // the final schema in the "plugins" options, not here. But to keep it simple:
//   return envelop({
//     plugins: [
//     //   // For example, validate incoming arguments with Joi
//     //   useJoiValidation(validationSchemas),
//     //   // Query complexity plugin
//     //   useGraphQLQueryComplexity({
//     //     schema: schemaWithMiddleware, // or just baseSchema if no shield
//     //     maximumComplexity: 1000,
//     //     onComplete: (complexity) => {
//     //       console.log(`Query complexity: ${complexity}`);
//     //     },
//     //   }),
//     //   // Depth limit
//     //   depthLimit(10),
//     //   // Extended context plugin
//     //   extendContextPlugin,
//     ],
//   })(testSchema);
// }
export function createEnvelopInstance() {
    console.log("✅ Creating Base Schema...");
    const baseSchema = makeExecutableSchema({ typeDefs: fulltypedefs, resolvers });

    console.log("✅ Base Schema Created:", baseSchema ? "Exists" : "Missing");
    console.log("✅ Query Type Exists:", baseSchema.getTypeMap()["Query"] ? "Yes" : "No");

    // Ensure plugins array is defined
    const plugins = [
        useJoiValidation(validationSchemas),
        useGraphQLQueryComplexity({
            schema: baseSchema, // Make sure this is the schema, not middleware-wrapped
            maximumComplexity: 1000,
            onComplete: (complexity) => {
                console.log(`Query complexity: ${complexity}`);
            },
        }),
        depthLimit(10),
        extendContextPlugin,
    ].filter(Boolean); // Remove any undefined plugins

    console.log("✅ Plugins Loaded:", plugins.length);

    const envelopInstance = envelop({ plugins });

    console.log("✅ Envelop Instance Created:", typeof envelopInstance === "function" ? "Yes" : "No");

    return envelopInstance;
}
