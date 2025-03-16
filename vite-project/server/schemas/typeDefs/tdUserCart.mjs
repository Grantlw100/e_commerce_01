const tdUserCart = `

    type UserCart {
        createdAt: Date
        updatedAt: Date
        orderedAt: Date
        abandoned: Boolean
        userId: User
        products: [Product]
        total: Float
    }

    input UserCartInput {
        createdAt: Date
        updatedAt: Date
        orderedAt: Date
        abandoned: Boolean
        userId: ID
        products: [ID]
        total: Float
    }

    type Query {
        getUserCarts: [UserCart]
        getUserCartById(id: ID!): UserCart
        getUserCartByUserId(userId: ID!): UserCart
        getUserCartsByProductId(productId: ID!): [UserCart]
        
    }

    type Mutation {
        createUserCart(userCart: UserCartInput): UserCart
        UserCartupdateUserCart(id: ID!, userCart: UserCartInput): UserCart
        updateUserCartByUserId(userId: ID!, userCart: UserCartInput): UserCart
        updateUserCartByProductId(productId: ID!, userCart: UserCartInput): UserCart
        deleteUserCart(id: ID!): UserCart
    }

`;

export default tdUserCart;

