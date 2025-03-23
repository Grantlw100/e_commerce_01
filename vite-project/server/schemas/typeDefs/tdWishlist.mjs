const tdWishlist = `

    type Wishlist {
        createdAt: Date
        updatedAt: Date
        deletedAt: Date
        version: Number
        status: String
        languages: [LanguageTranslation]
        name: String
        photoAlbums: [PhotoAlbum]
        ownership: Ownership
        keyword: [Keyword]
        season: [Season]
        promotion: [Promotion]
        category: [Category]
        products: [ProductList]
        stores: [StoreList]
        privacy: String
        subscribers: [SubscriptionList]
        colors: [ColorsIndex]
        layouts: [Layout]
        subscriptions: [SubscriptionList]
        subscriptionProgram: [SubscriptionProgram]
        loyaltyProgram: [LoyaltyProgram]
        promoCodes: [PromoCode]
    }

    input WishlistInput {
        createdAt: Date
        updatedAt: Date
        deletedAt: Date
        version: Number
        status: String
        languages: [LanguageTranslationInput]
        name: String
        photoAlbums: [PhotoAlbumInput]
        owneship: OwnershipInput
        keyword: [ID]
        season: [ID]
        promotion: [ID]
        category: [ID]
        products: [ProductListInput]
        stores: [StoreListInput]
        private: Boolean
        subscribers: [SubscriptionListInput]
        colors: [ColorsIndexInput]
        layouts: [LayoutListInput]
        subscriptions: [SubscriptionListInput]
        subscriptionProgram: [SubscriptionProgramInput]
        loyaltyProgram: [LoyaltyProgramInput]
        promoCodes: [PromoCodeInput]
    }

    extend type Query {
        getWishlist: [Wishlist]
    }

    extend type Mutation {
        createWishlist(wishlist: WishlistInput): Wishlist
        updateWishlist(id: ID!, wishlist: WishlistInput): Wishlist
        deleteWishlist(id: ID!): Wishlist
    }

`;

export default tdWishlist;

// Need to add keyword to the model so public wishlists can be searched for and used for comparison. 
    // add all product detail to user cart

    // getWishlists: [Wishlist]
    //     getWishlistById(id: ID!): Wishlist
    //     getWishlistByOwnerId(userId: ID!): Wishlist
    //     updateWishlist(id: ID!, wishlist: WishlistInput): Wishlist
    //     subscribeToWishlist(id: ID!, userId: ID): Wishlist
    //     unSubscribeToWishlist(id: ID!, userId: ID): Wishlist
    //     deleteWishlist(id: ID!): Wishlist