import { getItem, createItem, updateItem } from "./utils.mjs";


const OrderResolvers = {
    Query: {
        getOrder: async (_, { id }) => {
            return await getItem({modelName: "Order", id});
        }
    },
    Mutation: {
        createOrder: async (_, { Order }) => {
            return await createItem({modelName: "Order", input: Order});
        },
        updateOrder: async (_, { id, Order }) => {
            return await updateItem({modelName: "Order", id, input: Order});
        },
        deleteOrder: async (_, { id }) => {
            return await deleteItem({modelName: "Order", id});
        }
    }
};

export default OrderResolvers;