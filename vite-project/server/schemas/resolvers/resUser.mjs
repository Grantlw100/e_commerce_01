import { getItem, createItem, updateItem } from "./utils.mjs";


const UserResolvers = {
    Query: {
        getUser: async (_, { id }) => {
            return await getItem({modelName: "User", id});
            
        }
    },
    Mutation: {
        createUser: async (_, { User }) => {
            return await createItem({modelName: "User", input: User});
        },
        updateUser: async (_, { id, User }) => {
            return await updateItem({modelName: "User", id, input: User});
        },
        deleteUser: async (_, { id }) => {
            return await deleteItem({modelName: "User", id});
        }
    }
};

export default UserResolvers;