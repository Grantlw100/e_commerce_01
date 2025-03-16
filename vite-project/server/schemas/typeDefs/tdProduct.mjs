const tdProduct = `

    type Product {
        id: ID!
        name: String!
        quickDescription: String!
        description: String
        descriptionImages: [String]
        primaryColors: [String]
        secondaryColors: [String]
        category: [Category]
        season: [Season]
        promotions: [Promotion]
        keywords: [Keyword]
        featured: Boolean
        recommendationId: Product
        reviews: [Review]
        rating: Float
        makeYourOwn: Boolean
        price: Float!
        discount: Float
        taxCategory: String
        includes: [Product]
        bundle: Boolean
        bundled: Boolean
        image: String!
        quantity: Int!
        weight: Float!
        dimensions: Dimensions
        userInteraction: UserInteraction
        createdAt: Date
        updatedAt: Date
        version: Int
        ownerId: User
    }

    type Dimensions {
        length: Float
        width: Float
        height: Float
        size: String
    }

    type UserInteraction {
        lovedCount: Int
        cartCount: Int
        wishlistCount: Int
        viewedCount: Int
    }

    input ProductInput {
        name: String!
        quickDescription: String!
        description: String
        descriptionImages: [String]
        primaryColors: [ColorsIndexInput]
        secondaryColors: [ColorsIndexInput]
        category: [ID]
        season: [ID]
        promotions: [ID]
        keywords: [ID]
        featured: Boolean
        recommendationId: ID
        reviews: [ID]
        rating: Number
        makeYourOwn: Boolean
        price: Float!
        discount: Float
        taxCategory: String
        includes: [ID]
        bundle: Boolean
        bundled: Boolean
        image: String!
        quantity: Int!
        weight: Float!
        dimensions: DimensionsInput!
        userInteraction: UserInteractionInput
        createdAt: Date
        updatedAt: Date
        version: Int
        ownerId: ID
    }

    input DimensionsInput {
        length: Float
        width: Float
        height: Float
        size: String
    }

    input UserInteractionInput {
        lovedCount: Int
        cartCount: Int
        wishlistCount: Int
        viewedCount: Int
    }

    type Query {
        getProductBySearch(search: String): [Product]
        getMakeYourOwnProducts: [Product]
        getBundledProducts: [Product]
    }

    type Mutation {
        createMakeYourOwnProduct(product: ProductInput): Product
        updateMakeYourOwnProduct(id: ID!, product: ProductInput): Product
        deleteMakeYourOwnProduct(id: ID!): Product    }

`;

export default tdProduct;