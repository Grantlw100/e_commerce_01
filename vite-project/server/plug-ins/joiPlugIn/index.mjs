
export const useJoiValidation = (validationSchemas) => {
    return {
      onExecute({ args }) {
        const { document, variableValues } = args;
  
        // Iterate through all operations in the document
        for (const definition of document.definitions) {
          if (definition.kind === "OperationDefinition") {
            const operationName = definition.name?.value;
  
            // Iterate through the operation's variable definitions
            for (const variable of definition.variableDefinitions || []) {
              const varName = variable.variable.name.value;
              const varType = variable.type.kind === "NamedType" ? variable.type.name.value : null;
  
              // Validate the variable against the corresponding Joi schema
              if (varType && validationSchemas[varType] && variableValues?.[varName]) {
                const { error } = validationSchemas[varType].validate(variableValues[varName], {
                  abortEarly: false,
                });
  
                if (error) {
                  throw new Error(
                    `Validation failed for ${operationName}: ${error.details
                      .map((detail) => detail.message)
                      .join(", ")}`
                  );
                }
              }
            }
          }
        }
      },
    };
  };
  


export const useJoiInputValidation = (inputType, inputData) => {
    // ✅ Check if the input type exists in modelMap
    if (modelMap[inputType]) {
        const schema = modelMap[inputType].joiValidation;
        if (schema) {
            return schema.validate(inputData, { abortEarly: false });
        }
    }

    // ✅ Dynamically handle nested fields (Only when needed)
    if (typeof inputData === 'object' && inputData !== null) {
        for (const key in inputData) {
            if (modelMap[key]) {
                const schema = modelMap[key].joiValidation;
                if (schema) {
                    const validationResult = schema.validate(inputData[key], { abortEarly: false });
                    if (validationResult.error) {
                        return validationResult;
                    }
                }
            }
        }
    }

    return { valid: true, data: inputData };
};
