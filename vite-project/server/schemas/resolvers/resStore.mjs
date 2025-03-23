import { getItem, createItem, updateItem } from "./utils.mjs";


const StoreResolvers = {
    Query: {
        getStore: async (_, { id }) => {
            return await getItem({modelName: "Store", id});
        }
    },
    Mutation: {
        createStore: async (_, { Store }) => {
            return await createItem({modelName: "Store", input: Store});
        },
        updateStore: async (_, { id, Store }) => {
            return await updateItem({modelName: "Store", id, input: Store});
        },
        deleteStore: async (_, { id }) => {
            return await deleteItem({modelName: "Store", id});
        }
    }
};

export default StoreResolvers;