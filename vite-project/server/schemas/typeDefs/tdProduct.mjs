
// UpdateProductRating 
    // update the rating a product has whenever a new review is added fr the prodduct 

// updateInventory (for stores and products)

// updateUserInteractions (for products)

const tdProduct = `

    type Product {
        id: ID!
        name: String!
        quickDescription: String!
        description: String
        descriptionImages: [ImageIndex]
        colors: [ColorsIndex]
        layouts: [LayoutList]
        category: [Category]
        season: [Season]
        promotion: [Promotion]
        keyword: [Keyword]
        featured: Boolean
        recommendationId: Recommendation
        reviews: [Review]
        rating: Float
        makeYourOwn: Boolean
        price: Float!
        discount: Float
        taxCategory: String
        includes: [Product]
        bundle: Boolean
        bundled: Boolean
        image: [String!]
        quantity: Int!
        weight: Float!
        dimensions: Dimensions
        inventory: Inventory
        userInteraction: UserInteraction
        createdAt: Date
        updatedAt: Date
        version: Int
        ownership: Ownership
    }

    type Dimensions {
        length: Float
        width: Float
        height: Float
        size: String
    }

    type Inventory {
        stock: Int
        reserved: Int
        sold: Int
        restockThreshold: Int
        lastRestocked: Date
        restockActive: Boolean
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
        descriptionImages: [ImageIndexInput]
        colors: [ColorsIndexInput]
        layouts: [LayoutListInput]
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
        image: [ImageIndexInput]
        quantity: Int!
        weight: Float!
        dimensions: DimensionsInput!
        userInteraction: UserInteractionInput
        createdAt: Date
        updatedAt: Date
        version: Int
        ownership: OwnershipInput
    }

    input DimensionsInput {
        length: Float
        width: Float
        height: Float
        size: String
    }

    input InventoryInput {
        stock: Int
        reserved: Int
        sold: Int
        restockThreshold: Int
        lastRestocked: Date
        restockActive: Boolean
    }

    input UserInteractionInput {
        lovedCount: Int
        cartCount: Int
        wishlistCount: Int
        viewedCount: Int
    }

    extend type Query {
        getProduct(id: ID!): Product
    }

    extend type Mutation {
        createProduct(product: ProductInput): Product
        updateProduct(id: ID!, product: ProductInput): Product
        deleteProduct(id: ID!): Product
    }

`;

export default tdProduct;

// getProductBySearch(search: String): [Product]
// getMakeYourOwnProducts: [Product]
// getBundledProducts: [Product]
// createMakeYourOwnProduct(product: ProductInput): Product
// updateMakeYourOwnProduct(id: ID!, product: ProductInput): Product
// deleteMakeYourOwnProduct(id: ID!): Product    }