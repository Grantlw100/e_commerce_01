const tdRecommendation = `

    type Recommendation {
        id: ID!
        metadata: RecommendationMetadata
        Keywords: [KeywordRecommends]
        Categories: [CategoryRecommends]
        Seasons: [SeasonRecommends]
        Promotions: [PromotionRecommends]
        Stores: [StoreRecommends]
        direct: [DirectRecommends]
        indirect: [IndirectRecommends]
        recommendedProducts: [RecommendedProducts]
    }

    type RecommendationMetadata {
        createdAt: Date
        updatedAt: Date
        version: Int
        ownership: Ownership
    }

    type KeywordRecommends {
        keyword: Keyword
        points: Int
    }

    type CategoryRecommends {
        category: Category
        points: Int
    }

    type SeasonRecommends {
        season: Season
        points: Int
    }

    type PromotionRecommends {
        promotion: Promotion
        points: Int
    }

    type StoreRecommends {
        store: Store
        points: Int
    }

    type DirectRecommends {
        product: Product
        points: Int
    }

    type IndirectRecommends {
        characteristicName: String
        points: Int
    }

    type RecommendedProducts {
        product: Product
        points: Int
    }

    input RecommendationInput {
        metadata: RecommendationMetadataInput
        Keywords: [KeywordRecommendsInput]
        Categories: [CategoryRecommendsInput]
        Seasons: [SeasonRecommendsInput]
        Promotions: [PromotionRecommendsInput]
        Stores: [StoreRecommendsInput]
        direct: [DirectInput]
        indirect: [IndirectInput]
        recommendedProducts: [ProductRecommendsInput]
    }

    input RecommendationMetadataInput {
        createdAt: Date
        updatedAt: Date
        version: Int
        ownership: OwnershipInput
    }

    input KeywordRecommendsInput {
        keyword: ID
        points: Int
    }

    input CategoryRecommendsInput {
        category: ID
        points: Int
    }

    input SeasonRecommendsInput {
        season: ID
        points: Int
    }

    input PromotionRecommendsInput {
        promotion: ID
        points: Int
    }

    input StoreRecommendsInput {
        store: ID
        points: Int
    }

    input DirectInput {
        product: ID
        points: Int
    }

    input IndirectInput {
        characteristicName: String
        points: Int
    }

    input ProductRecommendsInput {
        product: ID
        points: Int
    }

    extend type Query {
        getRecommendation(id: ID!): Recommendation
    }

    extend type Mutation {
        createRecommendation(recommendation: RecommendationInput): Recommendation
        updateRecommendation(productId: ID!, recommendation: RecommendationInput): Recommendation
        deleteRecommendation(id: ID!): Recommendation
        }

`;

export default tdRecommendation;
