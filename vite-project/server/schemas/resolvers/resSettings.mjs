import { getItem, createItem, updateItem } from "./utils.mjs";


const SettingsResolvers = {
    Query: {
        getSettings: async (_, { id }) => {
            return await getItem({modelName: "Settings", id});
        }
    },
    Mutation: {
        createSettings: async (_, { Settings }) => {
            return await createItem({modelName: "Settings", input: Settings});
        },
        updateSettings: async (_, { id, Settings }) => {
            return await updateItem({modelName: "Settings", id, input: Settings});
        },
        deleteSettings: async (_, { id }) => {
            return await deleteItem({modelName: "Settings", id});
        }
    }
};

export default SettingsResolvers;