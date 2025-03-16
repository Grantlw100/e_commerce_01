import {contentValidation} from './joiSchemas/joiContent.mjs';
import {tokenValidation} from './joiSchemas/joiToken.mjs';
import {notificationValidation} from './joiSchemas/joiNotification.mjs';
import {orderValidation} from './joiSchemas/joiOrder.mjs';
import {productValidation} from './joiSchemas/joiProduct.mjs';
import {productDetailValidation} from './joiSchemas/joiProductDetail.mjs';
import {recommendationValidation} from './joiSchemas/joiRecommendation.mjs';
import {reviewValidation} from './joiSchemas/joiReviews.mjs';
import {userValidation} from './joiSchemas/joiUser.mjs';
import {userAlertValidation} from './joiSchemas/joiUserAlert.mjs';
import {userCartValidation} from './joiSchemas/joiUserCart.mjs';
import {wishlistValidation} from './joiSchemas/joiWishlist.mjs';

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
