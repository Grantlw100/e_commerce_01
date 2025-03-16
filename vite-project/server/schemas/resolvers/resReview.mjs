import { getItem, createItem, updateItem } from "./utils.mjs";


const ReviewResolvers = {
    Query: {
        getReview: async (_, { id }) => {
            return await getItem({modelName: "Review", id});
        }
    },
    Mutation: {
        createReview: async (_, { Review }) => {
            return await createItem({modelName: "Review", input: Review});
        },
        updateReview: async (_, { id, Review }) => {
            return await updateItem({modelName: "Review", id, input: Review});
        },
        deleteReview: async (_, { id }) => {
            return await deleteItem({modelName: "Review", id});
        }
    }
};

export default ReviewResolvers;