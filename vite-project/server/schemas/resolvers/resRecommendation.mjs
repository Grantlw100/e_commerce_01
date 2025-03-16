import { getItem, createItem, updateItem } from "./utils.mjs";


const RecommendationResolvers = {
    Query: {
        getRecommendation: async (_, { id }) => {
            return await getItem({modelName: "Recommendation", id});
        }
    },
    Mutation: {
        createRecommendation: async (_, { Recommendation }) => {
            return await createItem({modelName: "Recommendation", input: Recommendation});
        },
        updateRecommendation: async (_, { id, Recommendation }) => {
            return await updateItem({modelName: "Recommendation", id, input: Recommendation});
        },
        deleteRecommendation: async (_, { id }) => {
            return await deleteItem({modelName: "Recommendation", id});
        }
    }
};

export default RecommendationResolvers;