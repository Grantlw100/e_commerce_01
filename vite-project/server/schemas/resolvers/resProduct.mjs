import { getItem, createItem, updateItem } from "./utils.mjs";


const ProductResolvers = {
    Query: {
        getProduct: async (_, { id }) => {
            return await getItem({modelName: "Product", id});
        }
    },
    Mutation: {
        createProduct: async (_, { Product }) => {
            return await createItem({modelName: "Product", input: Product});
        },
        updateProduct: async (_, { id, Product }) => {
            return await updateItem({modelName: "Product", id, input: Product});
        },
        deleteProduct: async (_, { id }) => {
            return await deleteItem({modelName: "Product", id});
        }
    }
};

export default ProductResolvers;