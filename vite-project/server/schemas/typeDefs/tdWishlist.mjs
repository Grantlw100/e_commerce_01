const tdWishlist = `

    type Wishlist {
        createdAt: Date
        updatedAt: Date
        deletedAt: Date
        version: Number
        name: String
        image: String
        ownerId: User
        products: [Product]
        private: Boolean
        subscribers: [User]
        colors: [ColorsIndex]
    }

    input WishlistInput {
        createdAt: Date
        updatedAt: Date
        deletedAt: Date
        version: Number
        name: String
        image: Upload
        ownerId: ID
        products: [ID]
        private: Boolean
        subscribers: [ID]
        colors: [ColorsIndexInput]
    }

    type Query {
        getWishlists: [Wishlist]
        getWishlistById(id: ID!): Wishlist
        getWishlistByOwnerId(userId: ID!): Wishlist
    }

    type Mutation {
        createWishlist(wishlist: WishlistInput): Wishlist
        updateWishlist(id: ID!, wishlist: WishlistInput): Wishlist
        subscribeToWishlist(id: ID!, userId: ID): Wishlist
        unSubscribeToWishlist(id: ID!, userId: ID): Wishlist
        deleteWishlist(id: ID!): Wishlist
    }

`;

export default tdWishlist;

// Need to add keyword to the model so public wishlists can be searched for and used for comparison. 
    // add all product detail to user cart