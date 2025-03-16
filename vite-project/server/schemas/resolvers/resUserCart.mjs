import { getItem, createItem, updateItem } from "./utils.mjs";


const UserCartResolvers = {
    Query: {
        getUserCart: async (_, { id }) => {
            return await getItem({modelName: "UserCart", id});
        }
    },
    Mutation: {
        createUserCart: async (_, { UserCart }) => {
            return await createItem({modelName: "UserCart", input: UserCart});
        },
        updateUserCart: async (_, { id, UserCart }) => {
            return await updateItem({modelName: "UserCart", id, input: UserCart});
        },
        deleteUserCart: async (_, { id }) => {
            return await deleteItem({modelName: "UserCart", id});
        }
    }
};

export default UserCartResolvers;