import {modelMap} from "./modelMap.mjs";
import { useJoiInputValidation } from "../../plug-ins/joiPlugIn/index.mjs";


// #region Data transforming and validation logic ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Data transformer
// transform data from client to properly send to database
// destructure keyValue pairs and pull nested data from [ data ] array
// nested data is stored via nestName.key, nestName.value
    export const transformNestedData = (data) => {
        return data.reduce((acc, { key, value }) => {
            const keys = key.split("."); // Split key by dot notation
            keys.reduce((nested, k, index) => {
                if (index === keys.length - 1) {
                    nested[k] = value; // Assign value at the last key
                } else {
                    nested[k] = nested[k] || {}; // Initialize nested object if it doesn't exist
                }
                return nested[k];
            }, acc);
            return acc;
        }, {});
    };


// Validate Ownership 
    export const validateOwnership = async (Model, id, user) => {
        const item = await Model.findById(id).select("userId");
        if (item && item.userId.toString() !== user.id && !isAdmin(user)) {
        throw new Error("You are not authorized to update this entity.");
        }
    };


// check user owner ship needs to be seperated from check store ownership
    // check store owner ship is a necessity to ensure the stores admins
    // align with the what user is trying to update data 

// which fields are allowed to be queried by the user based on their role
    export const fieldFilter = (entity, fields, userRole) => {
        const entityFieldRules = {
            content: {
                public: ["title", "status", "publlishAt", "createdAt", "elements", "images", "colors"],
                admin: "all",
                personal: "all",
            },
            notifications: {
                public: ["title", "text", "colors"],
                admin: "all",
                personal: "all",
            },
            order: {
                public: "none",
                personal: ["user", "products", "orderDate", "orderStatus", "total", "subTotal", "tax.amount", "trackingNumber", "shippingDetails", "discounts"],
                admin: "all",
                personal: "all",
            },
            product: {
                puublic: ["name", "quickDescription", "description", "primaryColors", "secondaryColors", "category", "season", "promotions", "keywords", "featured", "rating", "dimensions", "weight", "includes", "price", "reviews", "bundle", "bundled", "image", "descriptionImages"],
                admin: ["all"],
                superadmin: ["all"],
            },
            recommendation: {
                public: "RecommendedProducts",
                admin: "all",
                personal: "all",
            },
            review: {
                public: ["author", "product", "rating", "text", "images"],
                admin: "all",
                personal: "all",
            },
            token: {
                public: "token",
                admin: "all",
                personal: "all",
            },
            user: {
                public: ["firstName", "lastName", "role", "profilePicture", "colors", "subscriptions", "subscribers", "wishlists", "contents"],
                admin: "all",
                personal: "all",
            },
            userAlerts: {
                public: ["title", "text", "type", "image", "colors"],
                admin: "all",
                personal: "all",
            },
            userCart: {
                public: ["user", "products", "total", "orderedAt"],
                admin: "all",
                personal: "all",
            },
            wishlist: {
                public: ["owner", "name", "image", "products", "colors"],
                admin: "all",
                personal: "all",
            },
        };

        const allowedFields = entityFieldRules[entity]?.[userRole] || {};
        
        return fields.filter((field) => allowedFields === "all" || allowedFields.includes(field));
    
    };

        // #endregion Data transforming and validation logic ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// #region Dynamic Resolver logic ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Query entities
// used for almost all query resolvers and may even be used for specific specialized resolver
    export const queryEntities = async ({
        entity,
        id = null,
        fields = [],
        filters = [],
        sort = null,
        pagination = { limit: 10, currentPage: 1 },
    }) => {
        // Load the correct Mongoose model dynamically
        const Model = mongoose.model(entity);

        if (!Model) {
            throw new Error(`Entity type '${entity}' is not recognized.`);
        }

        // Build query object
        const query = id ? { _id: id } : {};
        if (filters) {
            filters.forEach(({ field, operator, value }) => {
                switch (operator) {
                    case "eq":
                        query[field] = value;
                        break;
                    case "ne":
                        query[field] = { $ne: value };
                        break;
                    case "gte":
                        query[field] = { $gte: value };
                        break;
                    case "lte":
                        query[field] = { $lte: value };
                        break;
                    case "gt":
                        query[field] = { $gt: value };
                        break;
                    case "lt":
                        query[field] = { $lt: value };
                        break;
                    case "in":
                        query[field] = { $in: value };
                        break;
                    default:
                        throw new Error(`Unsupported operator: ${operator}`);
                }
            });
        }

        // Define projection to include specific fields
        const projection = fields.length
            ? fields.reduce((acc, field) => ({ ...acc, [field]: 1 }), {})
            : null;

        // Define sorting
        const sortOptions = sort ? { [sort.field]: sort.order } : {};

        // Handle pagination
        const limit = pagination.limit || 10;
        const skip =
            pagination.currentPage && pagination.currentPage > 1
                ? (pagination.currentPage - 1) * limit
                : 0;

        try {
            // Execute query
            const result = await Model.find(query)
                .select(projection)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit);

            return result;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw new Error("Failed to fetch data from MongoDB.");
        }
    };

// Execute CRUD operation
    export const executeCRUDOperation = async (Model, operation, data) => {
        try {
            switch (operation) {
                case "batchCreate":
                    return await Model.insertMany(data);
                case "batchUpdate":
                    return await Promise.all(
                        data.map(({ id, updates }) =>
                            Model.findByIdAndUpdate(id, updates, { new: true })
                        )
                    );
                case "batchDelete":
                    return await Promise.all(
                        data.map(({ id }) => Model.findByIdAndDelete(id))
                    );
                case "create":
                    return await Model.create(data);
                case "update":
                    return await Model.findByIdAndUpdate(data.id, data.updates, {
                        new: true,
                    });
                case "delete":
                    return await Model.findByIdAndDelete(data.id);
                default:
                    throw new Error(`Unsupported operation: ${operation}`);
            }
        } catch (error) {
            console.error(`Error during ${operation} operation:`, error);
            throw error;
        }
    };

// Get Item 
// used for all get resolvers for model specific interactions
    // pulls all the data from the resolver so if specific data is needed hard code that resolver
    export async function getItem({ modelName, id }) {
        const { mongooseModel } = modelMap[modelName];

        try {
            const doc = await mongooseModel.findById(id);

            if (!doc) {
                throw new Error(`No ${modelName} found with ID: ${id}`);
            }

            return doc;
        } catch (error) {
            console.error("Error fetching item:", error);
            throw new Error(`Failed to fetch ${modelName} with ID: ${id}`);
        }
    }



// Create Item 
// used for all create resolvers for model specific interactions 
    export async function createItem({ modelName, input}) {
        const { mongooseModel, joiValidation } = modelMap[modelName];

        try {
            // Validate input
            const { error, value } = joiValidation.validate(input);
            if (error) {
                throw new Error(`Validation error: ${error.message}`);
            }

            const doc = new mongooseModel(value);
            await doc.save();
            return statusMessages.success(modelName, "create", doc._id);
        } catch (error) {
            console.error("Error creating item:", error);
            return statusMessages.error(modelName, "create");
        }
    }


// Update Item
// used for all update resolvers for model specific interactions
    export async function updateItem({ modelName, id, updates }) {
        const { mongooseModel, joiValidation } = modelMap[modelName];

        try {
            // Validate updates
            const { error, value } = joiValidation.validate(updates);

            if (error) {
                throw new Error(`Validation error: ${error.message}`);
            }

            const doc = await mongooseModel.findByIdAndUpdate(id, value, {
                new: true,
            });

            if (!doc) {
                throw new Error(`No ${modelName} found with ID: ${id}`);
            }

            return statusMessages.success(modelName, "update", id);
        } catch (error) {
            console.error("Error updating item:", error);
            return statusMessages.error(modelName, "update", id);
        }
    }


// Update up to 3 Nested Items
    export async function updateNestedItems({ id, inputTypes, inputData }) {
        try {
            // Validate updates
            const { error, value } = useJoiInputValidation(inputTypes, inputData);

            if (error) {
                throw new Error(`Validation error: ${error.message}`);
            }

            const doc = await mongooseModel.findByIdAndUpdate(id, value, {
                new: true,
            });

            if (!doc) {
                throw new Error(`No ${modelName} found with ID: ${id}`);
            }

            return statusMessages.success(modelName, "update", id);
        } catch (error) {
            console.error("Error updating item:", error);
            return statusMessages.error(modelName, "update", id);
        }
    }


// Delete Item
// used for all delete resolvers for model specific interactions
    export async function deleteItem({ modelName, id }) {
        const { mongooseModel } = modelMap[modelName];

        try {
            const doc = await mongooseModel.findByIdAndDelete(id);

            if (!doc) {
                throw new Error(`No ${modelName} found with ID: ${id}`);
            }

            return statusMessages.success(modelName, "delete", id);
        } catch (error) {
            console.error("Error deleting item:", error);
            return statusMessages.error(modelName, "delete", id);
        }
    }

            // #endregion Dynamic Resolver logic ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// #region Dynamic Status messaging logic ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// dynamically create status messsages to be returned following crud operations 
    export const createStatusMessage = (success, message, code, additionalInfo = {}) => ({
        success,
        message,
        code,
        additionalInfo,
    });
    

// status messages for resolvers
    export const statusMessages = {
        success: (entity, operation, id, additionalInfo = {}) =>
        createStatusMessage(
            true,
            `Successfully performed ${operation} on ${entity}${id ? ` with ID: ${id}` : ""}.`,
            200,
            additionalInfo
        ),
        successBatch: (entity, operation, count, additionalInfo = {}) =>
        createStatusMessage(
            true,
            `Successfully performed ${operation} on ${count} ${entity} entities.`,
            200,
            additionalInfo
        ),
        error: (entity, operation, id) =>
        createStatusMessage(
            false,
            `Failed to perform ${operation} on ${entity}${id ? ` with ID: ${id}` : ""}.`,
            500
        ),
    };
  

// status message for resolvers (BACK UPS)
// optionally make resolvers capable of handling entities from the resolver itself for dynamic status messages
    export const successMessage = {
        success: true,
        message: "Success",
        code: 200,
    };

// status error message for resolvers
export const errorMessage = {
        success: false,
        message: "Failed",
        code: 500,
    };

// logs for server side functions 
    export const logInput = async (resolve, root, args, context, info) => {
        console.log(`1. logInput: ${JSON.stringify(args)}`)
        const result = await resolve(root, args, context, info)
        console.log(`5. logInput`)
        return result
    }

    export const logResult = async (resolve, root, args, context, info) => {
        console.log(`2. logResult`)
        const result = await resolve(root, args, context, info)
        console.log(`4. logResult: ${JSON.stringify(result)}`)
        return result
    }

        // #endregion Dynamic Status messaging logic ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



export default {
    successMessage,
    transformNestedData,
    queryEntities,
    // executeCRUDOperation,
    createStatusMessage,
    statusMessages,
    fieldFilter,
    validateOwnership
};

// create new validate ownership function that will be used for all resolvers that require ownership validation
// this function will be used for all resolvers that require ownership validation

// get owned items  
    // pull the items from a specific model that is owned by a user, store, etc...

// Get Nested Model Data 

// Update Nested Model Data
    
// Check Model token validity

// Chnage nested index order

// Event, Store, User specific helpers

    // Trigger nested actions

    // Get nested actions

// update version, status, and data

// Pull necessary data to apply across multiple models
    // pulling keywords, categories, etc in their smallest amounts like ID's and the names 
    // associated with the ID's  so when certain data is fetched these IDs can be used to
    // associate the data with the name so the client can see the name of the data without having to query 
    // the name of a keyword everytime they view anything**\
    

// ensure resolvers pass in the input types and the input data 

// transform nested data will only be used for resolvers that do not use or benefit from 
// specific input types

// create status message will be used for all resolvers that do not have specific status messages
// to be returned