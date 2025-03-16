

import { queryEntities } from "./utils.mjs";
import { statusMessages } from "./utils.mjs";
import { validateOwnership } from "./utils.mjs";
import { transformNestedData } from "./utils.mjs";
import { errorMessage } from "./utils.mjs";
import { executeCRUDOperation } from "./utils.mjs";
import { fieldFilter } from "./utils.mjs";
import mongoose from "mongoose";

// add middleware for input validation and field sanitization





const dynamicResolvers = {
    Query: {
// PUBLIC ACCESS QUERIES
    // get a single entity by ii and return only the specified fields
            getPublicEntity: async (_, args, context) => {
                const { entity, id, fields } = args;

                const userRole = context.user?.role || "user";

                const allowedFields = fieldFilter(entity, userRole, fields);

                return queryEntities({
                    entity,
                    id,
                    allowedFields,
                });

            },


// get multiple entities with filtration, sorting, and pagination
        getPublicEntities: async (_, args, context) => {
            const { entity, id, fields, filters, sort, pagination } = args;

            const userRole = context.user?.role || "user";
            
            const allowedFields = fieldFilter(entity, userRole, fields);

            return queryEntities({
                entity,
                id,
                allowedFields,
                filters,
                sort,
                pagination,
            });
        },



// get the latest entities up to a limit
        getEntitiesByLatest: async (_, args, context) => {
            const { entity, fields, sort, pagination } = args;

            const userRole = context.user?.role || "user";

            const allowedFields = fieldFilter(entity, userRole, fields);

            return queryEntities({
                entity,
                allowedFields,
                sort,
                pagination,
            })
        },



// get an entity for admin
        getAdminEntity: async (_, args, context) => {
            const { entity, id, fields } = args;

            return queryEntities({
                entity,
                id,
                fields,
            })
        },



// Private access Queries
// Get entities for admins due to sensitive data 
        getAdminEntities: async (_, args, context) => {
            const { entity, fields, filters, sort, pagination } = args;

            return queryEntities({
                entity,
                fields,
                filters,
                sort,
                pagination,
            })
        },



// get entities for personal information to reduce data leaks for specific infofrmation 
        getPersonalEntities: async (_, args, context) => {
            const { entity, fields, filters, sort, pagination } = args;

            if (context.user?.id === args.entity.ownerId || context.user?.role === args.entity.user) {
                userRole = "personal";
            } else {
                throw new error ("Not authorized to view this information");
            }

            await validateOwnership(entity, id, context.user);

            const allowedFields = fieldFilter(entity, userRole, fields);

            return queryEntities({
                entity,
                allowedFields,
                filters,
                sort,
                pagination,
            })
        },


// get entities by most recent updates
        getEntitiesByUpdates: async (_, args, context) => {
            const { entity, fields, pagination } = args;


            return queryEntities({
                entity,
                fields,
                pagination,
            })
        }
    },



    Mutation: {
// create a single entity
        createEntity: async (_, { entity, data }) => {
            // Load the correct Mongoose model dynamically
            const Model = mongoose.model(entity);
          
            if (!Model) {
              throw new Error(`Entity type '${entity}' is not recognized.`);
            }
          
            try {
              // Transform DataInput into a structured object
              const formattedData =transformNestedData(data);

              const newItem = await executeCRUDOperation(Model, 'create', formattedData);
                
                // create encompasses both new Model and save
                    //  // Create a new entity instance
                    //   const newItem = new Model(formattedData);
                
                    //   // Save to the database
                    //   await newItem.save(); 
          
              return statusMessages.success(entity, "creation", newItem._id, formattedData);
            } catch (error) {
              console.error("Error creating entity:", error);
              return statusMessages.error(entity, "creation");
            }
          },



// create multiple entities
          batchCreateEntities: async (_, { entity, payloads }) => {
            // Load the correct Mongoose model dynamically
            const Model = mongoose.model(entity);
          
            if (!Model) {
              throw new Error(`Entity type '${entity}' is not recognized.`);
            }
          
            try {
              // Transform DataInput into a structured object
              const formattedData = payloads.map(({ data }) => transformNestedData(data));
          
              // Execute CRUD operation
              const newItems = await executeCRUDOperation(Model, 'batchCreate', formattedData);
          
              // Map success messages for each created entity
              const response = newItems.map((item) => 
                statusMessages.success(entity, "creation", item._id, formattedData),
              );
          
              return response;
            } catch (error) {
              console.error("Error creating entities:", error);
          
              // Map error messages for failed operation
              const response = payloads.map(() =>
                errorMessage.statusMessages.error(entity, "creation"),
              );
        
              return response;
            }
          },          



// update a single entity
          updateEntity: async (_, { entity, id, data }, context) => {

            const { user } = context;

            // Load the correct Mongoose model dynamically
            const Model = mongoose.model(entity);
          
            if (!Model) {
              throw new Error(`Entity type '${entity}' is not recognized.`);
            }

            await validateOwnership(entity, id, user);
          
            try {
              // Transform DataInput into a structured object
              const formattedData = transformNestedData(data);
                
            

              // Execute CRUD operation
              const updatedItem = await executeCRUDOperation(Model, 'update', formattedData);
          
              return statusMessages.success(entity, "update", updatedItem._id, {updatedItem, user}
              );
            } catch (error) {
              console.error("Error updating entity:", error);
              return errorMessage;
            }
          },



// update multiple entities
            batchUpdateEntities: async (_, { entity, authorized, update, nestedUpdates }) => {
                // Load the correct Mongoose model dynamically
                const Model = mongoose.model(entity);
            
                if (!Model) {
                throw new Error(`Entity type '${entity}' is not recognized.`);
                }
            
                try {
                // Transform DataInput into a structured object
                const formattedData = update.map(({ id, updates }) => ({
                    id,
                    updates: transformNestedData(updates),
                }));
            
                // Execute CRUD operation
                const newItems = await executeCRUDOperation(Model, 'batchUpdate', formattedData);
            
                // Map success messages for each updated entity
                const response = newItems.map((item) =>
                    statusMessages.success(entity, "update", item._id, { item, user }),
                );
            
                return response;
                } catch (error) {
                console.error("Error updating entities:", error);
            
                // Map error messages for failed operation
                const response = update.map(({ id }) =>
                    statusMessages.error(entity, "update", id),
                );
            
                return response;
                }
            },



// delete a single entity
            deleteEntity: async (_, { entity, id }) => {
                // Load the correct Mongoose model dynamically
                const Model = mongoose.model(entity);
            
                if (!Model) {
                throw new Error(`Entity type '${entity}' is not recognized.`);
                }
            
                try {
                // Execute CRUD operation
                await executeCRUDOperation(Model, 'delete', { id });
            
                return statusMessages.success(entity, "deletion", id);
                } catch (error) {
                console.error("Error deleting entity:", error);
                return statusMessages.error(entity, "deletion", id);
                }
            },



// delete multiple entities
            batchDeleteEntities: async (_, { entity, filters }) => {
                // Load the correct Mongoose model dynamically
                const Model = mongoose.model(entity);
            
                if (!Model) {
                throw new Error(`Entity type '${entity}' is not recognized.`);
                }
            
                try {
                // Execute CRUD operation
                const newItems = await executeCRUDOperation(Model, 'batchDelete', filters);
            
                // Map success messages for each deleted entity
                const response = newItems.map(({ id }) =>
                    statusMessages.success(entity, "deletion", id),
                );
            
                return response;
                } catch (error) {
                console.error("Error deleting entities:", error);
            
                // Map error messages for failed operation
                const response = filters.map(({ id }) =>
                    statusMessages.error(entity, "deletion", id),
                );
            
                return response;
                }
            },
        }

    }

export default dynamicResolvers;