const tdContent = `
    

    type Content {
        id: ID!
        createdAt: Date
        updatedAt: Date
        expiredAt: Date        
        publishedAt: Date
        version: Int
        status: String
        ownership: Ownership
        languages: [LanguageTranslation]
        privacy: String
        title: String!
        type: String!        
        elements: [ContentElements]
        images: [ImageIndex] 
        colors: [ColorsIndex]
        layouts: [LayoutList]
        keyword: [Keyword]
        category: [Category]
        season: [Season]
        promotion: [Promotion]
        products: [ProductList]
        stores: [StoreList]
        trigger: [Trigger]
    }

    type ContentElements {
        type: String
        position: String
        index: Int
        text: String
    }

    type ImageIndex {
        image: String 
        index: Int
    }

    type StoreList {
        store: Store
        index: Int
    }

    type LanguageTranslation {  
        originalLangauge: String
        translatedLanguage: String
    }

    type LayoutList {
        layout: Layout
        index: Int
    }

    input ContentInput {
        createdAt: Date
        updatedAt: Date
        expiredAt: Date
        publishedAt: Date
        version: Int
        status: Boolean
        ownership: OwnershipInput
        languages: [LanguageTranslationInput]
        privacy: String
        title: String
        type: String
        elements: [ContentElementsInput]
        images: [ImageIndexInput]
        colors: [ColorsIndexInput]
        layouts: [LayoutListInput]
        keyword: [ID]
        category: [ID]
        season: [ID]
        promotion: [ID]
        products: [ProductListInput]
        stores: [StoreListInput]
        trigger: [TriggerInput]
    }

    input ContentElementsInput {
        type: String
        position: String
        index: Int
        text: String
    }

    input ImageIndexInput {
        image: String
        index: Int
    }

    input StoreListInput {
        store: ID
        index: Int
    }

    input LanguageTranslationInput {
        originalLanguage: String
        translatedLanguage: String
    }

    input LayoutListInput {
        layout: ID
        index: Int
    }

    extend type Query {
        getContent(contentId: ID!): Content
    }

    extend type Mutation {
        createContent(content: ContentInput): Status
        updateContent(id: ID!, content: ContentInput): Status
        deleteContent(id: ID!): Status
    }
`;

export default tdContent;

// add keyword to content 