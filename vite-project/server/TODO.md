## Important Notes
Declaring a function must be done before the function can be exported. This is due to the way that the code is compiled. The function needs to exist so other modules can use it. Exporting the function at the same time as creating the function does nothing but cause issues. 

## Models 

Finish updating the implementing the events model with the remaining pre-existing models.

Create background job processors (cron jobs, queue system) to process pendinging events at the proper time.

implement middleware to auto trigger responses when conditions are met. 


## Resolvers

### Saving a new item 
```javascript
// resolvers.js

// better for performance optimizatoin 
const doc = await Mode.create({ name: 'doc' });

// creates and saves document in one step
// returns a fully populated document 
// performs validation automatically 

// best for 
    // need to insert a nenw doc qickly 
    // dont need to modify fields before saving

// not best for
    // need to modify fields before saving
    // need to insert multiple docs at once
    // need to know if the doc was saved successfully

// better for validation and structure
new Model(values).save();

// creates a mongoose document instance first before saving 
// allows modification before saving 
// trigger mongoose middleware 
// perform validation automatically before inserting the docuemtn 
// more control over the document 

// best for 
    // need to modify the document before saving 
    // need to run the instance methods or mongoose hooks
    // need more flexibillty in how the document is processed before insertion
```

### S3 and Express 

Maintain s3 routes using express to reduce graphql server activity and to ensure that the server is not bogged down by file uploads.

Also better for security as the s3 bucket can be locked down to only allow uploads from the server.




## Need to finish serverside middleware to ensure everything functions as it is intended to.

## Security Measures 
1. Opaque tokens
    - integrated but still needs to be defined properly with middleware for handling expired tokens and creating new ones.
2. Rate limiting
    - options include:
        - express rate limiting middleware
        - **Example** 
            ```javascript
            import rateLimit from 'express-rate-limit';

            const limiter = rateLimit({
            windowMs: 10 * 1000, // 10 seconds
            max: 5, // Max 5 requests per 10 seconds
            message: 'Too many requests, slow down!',
            });

            app.use('/graphql', limiter);
            ```
        - graphql rate limiting plugin with envelop 
3. Query complexity
    - using the graphql query complexity plugin with envelop to ensure that queries are not too complex and can be handled by the server.
4. JWT Refresh Tokens
    - JWT Blacklisting needs to be configured to ensure that tokens are not being used after they have been revoked.
5. Query depth limiting 
    - using the graphql query depth plugin with envelop to ensure that queries are not too deep and can be handled by the server.
    - **Example**
        ```javascript
        import { useDepthLimit } from '@envelop/query-depth';

        const depthLimitPlugin = useDepthLimit({
            maxDepth: 3,
            ignore: [ 'Query.*' ],
            onMaxDepth: (depth, info) => {
                throw new Error(`Query is too deep: ${depth}`);
            },
        });
        ```
6. Auth-Based limits 
    - auth based limits are *kind of* already implemented or at least tentatively implemented.

## Graphql Shield


Ensure graphql shield is set up to ensure that the orders, token, user, and other sensitive data is not being accessed by unauthorized users.


## Graphql query complexity plug in


### Usage of graphql-complexity-rule
```javascript
import { createComplexityRule } from 'graphql-query-complexity'

const complexityRule = createComplexityRule({
  // The maximum allowed query complexity, queries above this threshold will be rejected
  maximumComplexity: 1000,

  // The query variables. This is needed because the variables are not available when the rule is created
  variables: {
// the variables are passed in automatically when the rule is executed

  },
  
    // The context object, this will be passed to the estimators
  context: {}
  // specify the operation name to apply the complexity rule to a specific operation
  
  // The default query complexity, if not provided the query complexity will be 1
  defaultComplexity: 1,

  // Optional callback function to retrieve the determined query complexity
    // will be invoked whether the query is rejected or not 
    // This can be used for logging or to implement rate limiting
    onComplete: (complexity: number) => {
        console.log(`Query complexity: ${complexity}`)
    }

    // Optional callback function to create a custom error when the query complexity is too high
    createError: (max: number, actual: number) => {
        return new Error(`Query is too complex: ${actual}. Maximum allowed complexity: ${max}`)
    }

  // The estimators to use for calculating the query complexity
  estimators: [
    // This is the default estimator, it assigns a complexity of 1 to every field
    simpleEstimator({ defaultComplexity: 1 })
  ]
})
```

### Variables and Context
**Variables** refers to the variables that are passed from the client to the server. These variables are not available when the complexity rule is created, so they need to be passed to the rule when it is executed.  
Variables include the data that was requested, arguments for the complexity rule to be applied to, and any other data that may be needed to determine the complexity of the query.  
Access to the variables is needed to determine the complexity of the query.
**Example**
```javascript
const complexityRule = createComplexityRule({
  variables: (requestContext) => requestContext.variables,
});
```

**Context** refers to the context of the application and any data it may carry that will be used for the sake of calculating complexity and limits. 
- the context object is used so different complexity rules can be used for different parts of the application.
use cases include:  
- prevent unauthenticated users from sending expensive queries 
- limit the complexity of queries based on the user's role or permissions
- allow admins to bypass complexity limits 
- limit the complexity of queries based on the user's subscription plan

**Example**
```javascript
const complexityRule = createComplexityRule({
  maximumComplexity: 100, // Default for regular users
  context: (requestContext) => {
    if (requestContext.context.user?.role === 'admin') {
      return 1000; // Admins get a higher limit
    }
    return 100; // Regular users
  },
});
```
**Example**
```javascript
const complexityRule = createComplexityRule({
  estimators: [
    directiveEstimator({
      name: 'complexity',
      getComplexity: ({ args, directiveArgs, variables, context }) => {
        // Calculate the complexity based on the directive arguments and using the variables pulled from the query
        let complexity = variables.limit * directiveArgs.value;

        // Give admins a lower complexity cost (more freedom)
        if (context.user?.role === 'admin') {
          complexity = complexity / 2;
        }

        return complexity;
      },
    }),
    simpleEstimator({ defaultComplexity: 1 }),
  ],
  maximumComplexity: 100,
  variables: (requestContext) => requestContext.variables,
  context: (requestContext) => requestContext.context,
});
```

### Complexity Estimators 
Used to customize the complexity calculation of a graphql query.
- the first estimator that returns a value determines the complexity of that field. 
- many different estimators can be used to calculate the complexity of a query.

At least ONE estimator has to return a value, otherwise an exception is raised. 
- the simple estimator is a default last resort estimator that can follow all other estimators. 

### **simpleEstimator**  
- retunrs a fixed complexity for each files. can be used as last estimator in the chain for a default value.
- may be best for simple queries like tokens, user data, etc.
- for larger items like products, content, or really anything with images, it may be best to actively avoid this estimator just becuase it would be redundant to have a fixed complexity for each field that pulls large amounts of data. 
```javascript
const rule = createComplexityRule({
  estimators: [
    directiveEstimator({
      // Optionally change the name of the directive here... Default value is `complexity`
      name: 'complexity',
    }),
    simpleEstimator({
      // Add a default complexity of 1 for each queried field
      defaultComplexity: 1,
    }),
  ],
  // ... other config
});
```

### **fieldExtensionsEstimator** 
- attaching static values to fields within the graphql SDL *(schema definition language)*
    - **field node** is the node of the query that represents a field in the schema.
    - **extensions field** is an object that can be used to store additional information about the field.

> create a custom complexity as a numeric value in the field config extensions of a graphql schema. 
```javascript
const Post = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    title: { type: GraphQLString },
    text: {
      type: GraphQLString,
      extensions: {
        complexity: 5,
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      post: {
        type: Post,
        resolve: () => ({}),
      },
    },
  }),
});

// Example Query 
query {
    post(count: 10) {
        title
        text
    }
}
```

A field config can also be passed to determine a custom complexity. This function will provide the complexity of the child nodes as well as the field input arguments. 

The function signature is the same as for the main estimator function. 
```javascript
type ComplexityEstimatorArgs = {
  type: GraphQLCompositeType;
  field: GraphQLField<any, any>;
  node: FieldNode;
  args: { [key: string]: any };
  childComplexity: number;
};

type ComplexityEstimator = (options: ComplexityEstimatorArgs) => number | void;

// allows the dev to make amore realistic estimation of individual fields

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    posts: {
      type: new GraphQLList(Post),
      args: {
        count: {
          type: GraphQLInt,
          defaultValue: 10,
        },
      },
      extensions: {
        complexity: ({ args, childComplexity }) => childComplexity * args.count,
      },
    },
  }),
});
// results in a complexity of 60

```


### **directiveEstimator** 
- lets the dev define a numeric value or a custom estimator in the field config extensions of a graphql schema. 
- For each field, the directive estimator will look for a directive with the name complexity and use the value of the directive as the complexity of the field.
```javascript
directive @complexity(value: Int) on FIELD_DEFINITION

extend type Query {
  users(limit: Int): [User] @complexity(value: 10)
}

type User {
  id: ID!
  name: String
}
```

The directive Estimator allows the developer to create and customize the logic that will be used to determine the complexity of a field. Multipliers can be added onto a field to increase the complexity of a field based on the inputs of the fields argument.  
```javascript
```graphql

# a complexity directive is degined that will multiply the complexity of the field by the value of the multiplicator argument

directive @complexity(multiplicator: Int) on FIELD_DEFINITION

# the users field will receive input from the user, the input will define how many users have been requested. for each of those users, the complexity value will be multiplied by the multipllicator.

# if 5 users are requested the complexity will be 5(users * 2(directive)

extend type Query {
  users(limit: Int): [User] @complexity(multiplicator: 2)
}
```
In graphql schema definition language, the developer can define a directive that will be used to determine the complexity of a field. 
```javascript
```graphql
directive @complexity(
    value: Int!               # Base complexity cost on every field
    multipliers: [String!]    # Optional: Multiply complexity based on arguments
) on FIELD_DEFINITION


type Filter {
    limit: Int
}

type ChildType {
    a: String @complexity(value: 1)
}

extend type Query {
    someField: String @complexity(value: 5)
    listScalar(limit: Int): String @complexity(value: 2, multipliers: ["limit"])
    multiLevelMultiplier(filter: Filter): String @complexity(value: 1, multipliers: ["filter.limit"])
    arrayLength(ids: [Int]): String @complexity(value: 1, multipliers: ["ids"])
    compositeTypes(ids: [Int]): ChildType @complexity(value: 2, multipliers: ["ids"])
}

schema {
    query: Query
}
```
1. someField has a complexity of 5. this is a simple field with a fixed complexity of 5.
2. listScalar has a complexity of 2. the complexity of the field is multiplied by the value of the limit argument. The more items are requested, the higher the complexity.
3. multiLevelMultiplier has a complexity of 1. the complexity of the field is multiplied by the value of the limit argument of the filter argument.
4. arrayLength has a complexity of 1. the complexity of the field is multiplied by the length of the ids argument. If multiple items are requested, multiple ids are returned, the complexity will increase.
5. compositeTypes has a complexity of 2. the complexity of the field is multiplied by the length of the ids argument. The complexity of the child field a is 1, so the total complexity of the field is 2 * 1 = 2.

### Creating Custom Estimators
- create a custom estimator that will be used to determine the complexity of a field using the following function signature. 
```javascript
type ComplexityEstimatorArgs = {
  // The composite type (interface, object, union) that the evaluated field belongs to
  type: GraphQLCompositeType;
  // The GraphQLField that is being evaluated
  field: GraphQLField<any, any>;
  // The GraphQL node that is being evaluated
  node: FieldNode;
  // The input arguments of the field
  args: { [key: string]: any };
  // The complexity of all child selections for that field
  childComplexity: number;
  // The context object for the request if it was provided
  context?: Record<string, any>;
};

type ComplexityEstimator = (options: ComplexityEstimatorArgs) => number | void;

```

#### Do I need to include in each and every resolver? May just need to place within main server file but may need to define sepearate rules for batch functions with large payloads like batch update for discount changes on products

Define multiple complexity rules once and use a dynamic means of applying complexity rules between CRUD operations and batch operations.

Create over rides to ensure functions that will need to blow through these rules can.

**Can use useGraphQLQueryComplexity**  
**Example Usage**
```javascript
import { useGraphQLQueryComplexity } from '@envelop/query-complexity';
import { getComplexity, simpleEstimator } from 'graphql-query-complexity';

const queryComplexityPlugin = useGraphQLQueryComplexity({
  schema,
  estimators: [
    simpleEstimator({ defaultComplexity: 1 }) // Each field has a base cost of 1
  ],
  maximumComplexity: 100, // Set a reasonable complexity limit
  onComplete: (complexity) => {
    console.log(`Query complexity: ${complexity}`);
  },
});
```

### GraphQL Complexity Rules Implementation Overview

### 1. Simple Estimator 

will be used for the following models:
- User (subject to change as some users may want to view a list of users)
- Token
- Order - Users should only be able to view their own orders
- Notification - Users should only be able to view their own notifications
- Cart - Users should only be able to view their own cart

Reasoning for the use of the simple estimator in regard to the above models is that the data is:
- models deal with user specific data making queries straightforward
- rate limiting would be more beneficial for these models 
- auth would need to be set before these calls can be made

**Example**
```javascript
```graphql
type User {
  id: ID! @complexity(value: 1)
  email: String @complexity(value: 1)
  profile: UserProfile @complexity(value: 1)
}
```

### 2. Field Estimator 

an and may be used for the any photo fields:
Reasoning for the use of te field estimator on s3 calls:
- Fetching images from S3 can be more expensive, especially if a user requests multiple images or large files.
- Field-level extensions let you assign a higher complexity to fields that fetch large assets. This discourages malicious users from over-fetching.

**Example**
```javascript
```graphql
type S3Image {
  url: String 
  size: Int @complexity(value: 5) # For example, fetching image size is costlier
}
```

### 3. Directive Estimator

 will be used for the following models:
- Product
- Product Details 
    - Category
    - Keywords
    - promotion
    - season
- content
- wishlist 
- review
- recommendation

Reasoning for the use of the directive estimator on the above models:
- These models are publicly accessible, including for guest accounts.
- They may allow batch get requests (e.g., listing products or fetching multiple reviews).
- Directive-based estimators let you scale complexity based on query arguments (e.g., limit, array lengths, nested filters)

**Example**
```javascript
```graphql
directive @complexity(
  value: Int!
  multipliers: [String!]
) on FIELD_DEFINITION

extend type Query {
  products(limit: Int): [Product] 
    @complexity(value: 2, multipliers: ["limit"])
}
```
4. Future updates to make to data fetching operations: 
- automatically reduce response size based on the complexity of the query

- proactively inform clients there request is too complex and to reduce the complexity of the query

- Double check that graphql shield aligns with these implementation practices

- Dynamically change the maximum complexity based on the user's role

#### Need to test the complexity rule to ensure it is functioning as intended.

### Create fallbacks for complexity rules. In case they cannot be found or are not defined a simple rule or a field esitmator can be used as a fallback.




## GraphQL Extended Context 

Context only exists in memory and is not held for long periods of time. context is created when it is used and destroyed when it is no longer needed.

all resolvers that need context can read from it

each resolver is given a reference to the same context object for that request


## Joi Validator

Joi is a powerful schema description language and data validator for JavaScript. Joi allows you to create blueprints or schemas for JavaScript objects to ensure validation of key information.

### Usage
```javascript
const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeat_password: Joi.ref('password'),

    access_token: [
        Joi.string(),
        Joi.number()
    ],

    birth_year: Joi.number()
        .integer()
        .min(1900)
        .max(2013),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})
    .with('username', 'birth_year')
    .xor('password', 'access_token')
    .with('password', 'repeat_password');

// Return result.
const result = schema.validate({ username: 'abc', birth_year: 1994 });
// result.error === null -> valid

// You can also pass a callback which will be called synchronously with the validation result.
schema.validate({ username: 'abc', birth_year: 1994 }, function (err, value) { });

// Or use async/await.
try {
    const value = await schema.validateAsync({ username: 'abc', birth_year: 1994 });
}
catch (err) { }
```

### API
- **Joi.any()** - matches any type
- **Joi.array()** - matches an array type
- **Joi.boolean()** - matches a boolean type
- **Joi.binary()** - matches a binary type
- **Joi.date()** - matches a date type
- **Joi.function()** - matches a function type
- **Joi.number()** - matches a number type
- **Joi.object()** - matches an object type
- **Joi.string()** - matches a string type
- **Joi.alternatives()** - matches one of the provided alternatives
- **Joi.array()** - matches an array type
- **Joi.binary()** - matches a binary type
- **Joi.boolean()** - matches a boolean type
- **Joi.date()** - matches a date type
- **Joi.function()** - matches a function type
- **Joi.number()** - matches a number type

### Rules
- **Joi.allow(value)** - allows a value
- **Joi.alphanum()** - requires the string to only contain a-z, A-Z, and 0-9
- **Joi.email()** - requires the string to be an email
- **Joi.equal(value)** - requires the value to be equal to the provided value
- **Joi.invalid(value)** - requires the value to not be equal to the provided value
- **Joi.max(limit)** - requires the value to be less than or equal to the provided limit
- **Joi.min(limit)** - requires the value to be greater than or equal to the provided limit
- **Joi.required()** - requires the key to be present
- **Joi.valid(value)** - requires the value to be one of the provided values
- **Joi.regex(RegExp)** - requires the value to match the provided regular expression
- **Joi.uri()** - requires the value to be a valid URI
- **Joi.uuid()** - requires the value to be a valid UUID

### Modifiers
- **Joi.default(value)** - sets a default value
- **Joi.forbidden()** - marks the key as forbidden
- **Joi.optional()** - marks the key as optional
- **Joi.strip()** - removes the key from the object
- **Joi.when(condition, options)** - creates a conditional schema

### Validation
- **Joi.validate(value, schema, [options], [callback])** - validates a value against a schema
- **Joi.validateAsync(value, schema, [options])** - validates a value against a schema asynchronously
- **Joi.compile(schema)** - compiles a schema
- **Joi.describe(schema)** - describes a schema

### Errors
- **Joi.ValidationError** - the error thrown when a validation fails
- **Joi.isError(err)** - checks if an error is a Joi error
- **Joi.assert(value, schema, [message])** - asserts that a value matches a schema
- **Joi.attempt(value, schema, [message])** - validates a value against a schema and throws if the value is invalid

### Extensions
- **Joi.extend(extension)** - extends Joi with custom rules

### Current Tasks

Right now i need to create a subInputs joi file which will house all of my shared inputs that can and will be used across files. 

I can simultaneously reduce the amount of sub inputs i will need and make sure that the inputs are being used correctly and without the same input being used but with a different name

### useJoiValidation    

The function is designed specifically for the sake of validating inputs directly from the GraphQL AST.

This is why it is written in the wackiest way possible. 

```json
// How data looks per request 
{
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { value: "createStore" },
      variableDefinitions: [
        {
          variable: { name: { value: "store" } },
          type: { kind: "NamedType", name: { value: "StoreInput" } }
        }
      ]
    }
  ]
}
```

```javascript
// How the function is used


export const useJoiValidation = (validationSchemas) => {
  return {
    onPluginInit({ addSchema }) {
            // The lifecycle method is triggered during the servers initialization 
                // dynamically iterates over all validation schemas 
                // adds each schema to the graphql schema using addSchema 
      // Dynamically add all provided schemas
      Object.values(validationSchemas).forEach((schema) => {
        if (schema) {
          addSchema(schema);
        }
      });
    },
    onExecute({ args }) {
        // The lifecycle method is triggered during the execution of a query or mutation
            // document: contains the parsed query or mutation from graphql
            // variableValues: contains the variables passed to the query or mutation
      const { document, variableValues } = args;

        // Iterate through all operations in the document
        // loops through the operations in the document 
        // extracts the operation name (operationName
      for (const definition of document.definitions) {
        if (definition.kind === 'OperationDefinition') {
          const operationName = definition.name?.value;

          // Iterate through the operation's variable definitions
            // loops through the variables defined in the operation 
            // extracts the variable name (varName) and type (varType)
          for (const variable of definition.variableDefinitions || []) {
            const varName = variable.variable.name.value; // The name of the variable
            const varType = variable.type.name?.value; // The GraphQL type of the variable

            // Validate the variable against the corresponding Joi schema
            // Checks if a joi schema exists for the variable type ( varType )
                // Validates the variable's value (variableValues[varName]) against the schema
                // if validation fails, it throws an error with detailed messages 
            if (validationSchemas[varType] && variableValues?.[varName]) {
              const { error } = validationSchemas[varType].validate(
                variableValues[varName],
                { abortEarly: false }
              );

              if (error) {
                throw new Error(
                  `Validation failed for ${operationName}: ${error.details
                    .map((detail) => detail.message)
                    .join(', ')}`
                );
              }
            }
          }
        }
      }
    },
  };
};



```

# GRANT
## YOU LEFT OFF HERE

I am in the process of updating the joi validators to match the models and typedef schema. 

I just noticed that i could possibly use the ImageIndexInput type to validate the images that are being uploaded in every other model. I need to refactor the Product so the Add on Images and the product images use an index to go with the photos so stores can curate the order at which images appear. 

