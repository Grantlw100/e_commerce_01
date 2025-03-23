import { getItem, createItem, updateItem } from "./utils.mjs";


const MessageResolvers = {
    Query: {
        getMessage: async (_, { id }) => {
            return await getItem({modelName: "Message", id});
        }
    },
    Mutation: {
        createMessage: async (_, { Message }) => {
            return await createItem({modelName: "Message", input: Message});
        },
        updateMessage: async (_, { id, Message }) => {
            return await updateItem({modelName: "Message", id, input: Message});
        },
        deleteMessage: async (_, { id }) => {
            return await deleteItem({modelName: "Message", id});
        }
    }
};

export default MessageResolvers;