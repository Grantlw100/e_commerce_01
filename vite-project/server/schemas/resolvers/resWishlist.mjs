import { getItem, createItem, updateItem } from "./utils.mjs";


const WishlistResolvers = {
    Query: {
        getWishlist: async (_, { id }) => {
            return await getItem({modelName: "Wishlist", id});
        }
    },
    Mutation: {
        createWishlist: async (_, { Wishlist }) => {
            return await createItem({modelName: "Wishlist", input: Wishlist});
        },
        updateWishlist: async (_, { id, Wishlist }) => {
            return await updateItem({modelName: "Wishlist", id, input: Wishlist});
        },
        deleteWishlist: async (_, { id }) => {
            return await deleteItem({modelName: "Wishlist", id});
        }
    }
};

export default WishlistResolvers;