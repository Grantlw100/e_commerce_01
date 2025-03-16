const tdProductDetail = `

    type Keyword {
        id: ID!
        name: String!
        image: String
        description: String
        createdAt: Date
        updatedAt: Date
        colors: [ColorsIndex]
    }

    input KeywordInput {
        name: String!
        image: Upload
        description: String
        createdAt: Date
        updatedAt: Date
        colors: [ColorsIndexInput]
    }

    type Season {
        id: ID!
        name: String!
        startDate: Date
        endDate: Date
        image: String
        description: String
        createdAt: Date
        updatedAt: Date
        colors: [ColorsIndex]
    }

    input SeasonInput {
        name: String!
        startDate: Date
        endDate: Date
        image: Upload
        description: String
        createdAt: Date
        updatedAt: Date
        colors: [ColorsIndexInput]
    }

    type Promotion {
        id: ID!
        name: String!
        discount: Float!
        startDate: Date
        endDate: Date
        image: String
        description: String
        createdAt: Date
        updatedAt: Date
        colors: [ColorsIndex]
    }

    input PromotionInput {
        name: String!
        discount: Number!
        startDate: Date
        endDate: Date
        image: Upload
        description: String
        createdAt: Date
        updatedAt: Date
        colors: [ColorsIndexInput]
    }

    type Category {
        id: ID!
        name: String!
        image: String
        description: String
        createdAt: Date
        updatedAt: Date
        colors: [ColorsIndex]
    }

    input CategoryInput {
        name: String!
        image: Upload
        description: String
        createdAt: Date
        updatedAt: Date
        colors: [ColorsIndexInput]
    }

    type Query {
        getKeywords: [Keyword]
        getKeywordById(id: ID!): Keyword
        getFilteredKeywords(name: String, before: Date, after: Date): [Keyword!]!
        getSeasons: [Season]
        getSeasonById(id: ID!): Season
        getFilteredSeasons(name: String, before: Date, after: Date): [Season!]!
        getPromotions: [Promotion]
        getPromotionById(id: ID!): Promotion
        getFilteredPromotions(name: String, discount: Number, before: Date, after: Date): [Promotion!]!
        getCategories: [Category]
        getCategoryById(id: ID!): Category
        getFilteredCategories(name: String, before: Date, after: Date): [Category!]!
    }

    type Mutation {
        createKeyword(keyword: KeywordInput): Keyword
        updateKeyword(id: ID!, keyword: KeywordInput): Keyword
        deleteKeyword(id: ID!): Keyword
        createSeason(season: SeasonInput): Season
        updateSeason(id: ID!, season: SeasonInput): Season
        deleteSeason(id: ID!): Season
        createPromotion(promotion: PromotionInput): Promotion
        updatePromotion(id: ID!, promotion: PromotionInput): Promotion
        deletePromotion(id: ID!): Promotion
        createCategory(category: CategoryInput): Category
        updateCategory(id: ID!, category: CategoryInput): Category
        deleteCategory(id: ID!): Category
    }
`;

export default tdProductDetail;