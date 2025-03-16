import { getItem, createItem, updateItem } from "./utils.mjs";


const KeywordResolvers = {
    Query: {
        getKeyword: async (_, { id }) => {
            return await getItem({modelName: "Keyword", id});
        }
    },
    Mutation: {
        createKeyword: async (_, { Keyword }) => {
            return await createItem({modelName: "Keyword", input: Keyword});
        },
        updateKeyword: async (_, { id, Keyword }) => {
            return await updateItem({modelName: "Keyword", id, input: Keyword});
        },
        deleteKeyword: async (_, { id }) => {
            return await deleteItem({modelName: "Keyword", id});
        }
    }
};


const SeasonResolvers = {
    Query: {
        getSeason: async (_, { id }) => {
            return await getItem({modelName: "Season", id});
        }
    },
    Mutation: {
        createSeason: async (_, { Season }) => {
            return await createItem({modelName: "Season", input: Season});
        },
        updateSeason: async (_, { id, Season }) => {
            return await updateItem({modelName: "Season", id, input: Season});
        },
        deleteSeason: async (_, { id }) => {
            return await deleteItem({modelName: "Season", id});
        }
    }
};


const PromotionResolvers = {
    Query: {
        getPromotion: async (_, { id }) => {
            return await getItem({modelName: "Promotion", id});
        }
    },
    Mutation: {
        createPromotion: async (_, { Promotion }) => {
            return await createItem({modelName: "Promotion", input: Promotion});
        },
        updatePromotion: async (_, { id, Promotion }) => {
            return await updateItem({modelName: "Promotion", id, input: Promotion});
        },
        deletePromotion: async (_, { id }) => {
            return await deleteItem({modelName: "Promotion", id});
        }
    }
};


const CategoryResolvers = {
    Query: {
        getCategory: async (_, { id }) => {
            return await getItem({modelName: "Category", id});
        }
    },
    Mutation: {
        createCategory: async (_, { Category }) => {
            return await createItem({modelName: "Category", input: Category});
        },
        updateCategory: async (_, { id, Category }) => {
            return await updateItem({modelName: "Category", id, input: Category});
        },
        deleteCategory: async (_, { id }) => {
            return await deleteItem({modelName: "Category", id});
        }
    }
};


export default { KeywordResolvers, SeasonResolvers, PromotionResolvers, CategoryResolvers
}