const tdRecommendation = `

    type Recommendation {
        id: ID!
        metadata: RecommendationMetadata
        Keywords: [KeywordRecommends]
        Categories: [CategoryRecommends]
        Seasons: [SeasonRecommends]
        Promotions: [PromotionRecommends]
        direct: [DirectRecommends]
        indirect: [IndirectRecommends]
        recommendedProducts: [RecommendedProducts]
    }

    type RecommendationMetadata {
        createdAt: Date
        updatedAt: Date
        version: Int
        recommendationFor: String
        recommendationId: String
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
        direct: [DirectInput]
        indirect: [IndirectInput]
        recommendedProducts: [RecommendedProductsInput]
    }

    input RecommendationMetadataInput {
        createdAt: Date
        updatedAt: Date
        version: Int
        recommendationFor: String
        recommendationId: String
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

    input DirectInput {
        product: ID
        points: Int
    }

    input IndirectInput {
        characteristicName: String
        points: Int
    }

    input RecommendedProductsInput {
        product: ID
        points: Int
    }

    type Query {
        getProductRecommendations(productId: ID!): [Recommendation]
    }

    type Mutation {
        updateproductRecommendation(productId: ID!, recommendation: RecommendationInput): Recommendation
    }

`;

export default tdRecommendation;
