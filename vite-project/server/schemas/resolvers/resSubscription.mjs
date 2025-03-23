import { getItem, createItem, updateItem } from "./utils.mjs";


const SubscriptionResolvers = {
    Query: {
        getSubscription: async (_, { id }) => {
            return await getItem({modelName: "Subscription", id});
        }
    },
    Mutation: {
        createSubscription: async (_, { Subscription }) => {
            return await createItem({modelName: "Subscription", input: Subscription});
        },
        updateSubscription: async (_, { id, Subscription }) => {
            return await updateItem({modelName: "Subscription", id, input: Subscription});
        },
        deleteSubscription: async (_, { id }) => {
            return await deleteItem({modelName: "Subscription", id});
        }
    }
};

export default SubscriptionResolvers;