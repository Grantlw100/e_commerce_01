const tdReviews = `

    type Review {
        createdAt: Date
        updatedAt: Date
        deletedAt: Date
        text: String
        author: User
        product: Product
        rating: Int
        images: [String]
    }

    input ReviewInput {
        createdAt: Date
        updatedAt: Date
        deletedAt: Date
        text: String
        author: ID
        product: ID
        rating: Int
        images: [Upload]
    }

    type Query {
        getProductReviews(productId: ID!): [Review]
    }

    type Mutation {
        editReview(id: ID!, review: ReviewInput): Review
    }
        
`;

export default tdReviews;

// maybe add details to the review section as well. 
    // product details i mean 