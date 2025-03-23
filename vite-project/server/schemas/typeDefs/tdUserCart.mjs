const tdUserCart = `

    type UserCart {
        createdAt: Date
        updatedAt: Date
        orderedAt: Date
        abandoned: Boolean
        abandonedAt: Date
        ownership: Ownership
        products: [ProductList]
        total: Float
    }

    input UserCartInput {
        createdAt: Date
        updatedAt: Date
        orderedAt: Date
        abandoned: Boolean
        ownership: OwnershipInput
        products: [ProductListInput]
        total: Float
    }

    extend type Query {
        getUserCart(id: ID!): UserCart
    }

    extend type Mutation {
        createUserCart(userCart: UserCartInput): UserCart
        updateUserCart(id: ID!, userCart: UserCartInput): UserCart
        deleteUserCart(id: ID!): UserCart
    }

`;

export default tdUserCart;

// getUserCarts: [UserCart]UserCart
        // getUserCartByUserId(userId: ID!): UserCart
        // getUserCartsByProductId(productId: ID!): [UserCart]
        // UserCartupdateUserCart(id: ID!, userCart: UserCartInput): UserCart
        // updateUserCartByUserId(userId: ID!, userCart: UserCartInput): UserCart
        // updateUserCartByProductId(productId: ID!, userCart: UserCartInput): UserCart
        // deleteUserCart(id: ID!): UserCart