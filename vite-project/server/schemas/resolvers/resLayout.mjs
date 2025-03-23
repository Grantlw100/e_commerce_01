import { getItem, createItem, updateItem } from "./utils.mjs";


const LayoutResolvers = {
    Query: {
        getLayout: async (_, { id }) => {
            return await getItem({modelName: "Layout", id});
        }
    },
    Mutation: {
        createLayout: async (_, { Layout }) => {
            return await createItem({modelName: "Layout", input: Layout});
        },
        updateLayout: async (_, { id, Layout }) => {
            return await updateItem({modelName: "Layout", id, input: Layout});
        },
        deleteLayout: async (_, { id }) => {
            return await deleteItem({modelName: "Layout", id});
        }
    }
};

export default LayoutResolvers;