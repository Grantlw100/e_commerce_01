const tdReviews = `

    type Review {
        createdAt: Date
        updatedAt: Date
        deletedAt: Date
        text: String
        author: User
        product: [ProductList]
        store: Store
        rating: Int
        images: [ImageIndex]
    }

    input ReviewInput {
        createdAt: Date
        updatedAt: Date
        deletedAt: Date
        text: String
        author: ID
        product: [ProductListInput]
        store: ID
        rating: Int
        images: [ImageIndexInput]
    }

    extend type Query {
        getReview(id: ID!): Review
    }

    extend type Mutation {
        createReview(review: ReviewInput): Review
        updateReview(id: ID!, review: ReviewInput): Review
        deleteReview(id: ID!): Review
    }
        
`;

export default tdReviews;

// maybe add details to the review section as well. 
    // product details i mean 