import { getItem, createItem, updateItem } from "./utils.mjs";


const ContentResolvers = {
    Query: {
        getContent: async (_, { id }) => {
            return await getItem({modelName: "Content", id});
        }
    },
    Mutation: {
        createContent: async (_, { content }) => {
            return await createItem({modelName: "Content", input: content});
        },
        updateContent: async (_, { id, content }) => {
            return await updateItem({modelName: "Content", id, input: content});
        },
        deleteContent: async (_, { id }) => {
            return await deleteItem({modelName: "Content", id});
        }
    }
};

export default ContentResolvers;