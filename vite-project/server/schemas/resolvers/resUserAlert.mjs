import { getItem, createItem, updateItem } from "./utils.mjs";


const UserAlertResolvers = {
    Query: {
        getUserAlert: async (_, { id }) => {
            return await getItem({modelName: "UserAlert", id});
        }
    },
    Mutation: {
        createUserAlert: async (_, { UserAlert }) => {
            return await createItem({modelName: "UserAlert", input: UserAlert});
        },
        updateUserAlert: async (_, { id, UserAlert }) => {
            return await updateItem({modelName: "UserAlert", id, input: UserAlert});
        },
        deleteUserAlert: async (_, { id }) => {
            return await deleteItem({modelName: "UserAlert", id});
        }
    }
};

export default UserAlertResolvers;