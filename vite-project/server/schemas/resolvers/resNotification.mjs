import { getItem, createItem, updateItem } from "./utils.mjs";


const NotificationResolvers = {
    Query: {
        getNotification: async (_, { id }) => {
            return await getItem({modelName: "Notification", id});
        }
    },
    Mutation: {
        createNotification: async (_, { Notification }) => {
            return await createItem({modelName: "Notification", input: Notification});
        },
        updateNotification: async (_, { id, Notification }) => {
            return await updateItem({modelName: "Notification", id, input: Notification});
        },
        deleteNotification: async (_, { id }) => {
            return await deleteItem({modelName: "Notification", id});
        }
    }
};

export default NotificationResolvers;