import { getItem, createItem, updateItem } from "./utils.mjs";


const TokenResolvers = {
    Query: {
        getToken: async (_, { id }) => {
            return await getItem({modelName: "Token", id});
        }
    },
    Mutation: {
        createToken: async (_, { Token }) => {
            return await createItem({modelName: "Token", input: Token});
        },
        updateToken: async (_, { id, Token }) => {
            return await updateItem({modelName: "Token", id, input: Token});
        },
        deleteToken: async (_, { id }) => {
            return await deleteItem({modelName: "Token", id});
        }
    }
};

export default TokenResolvers;