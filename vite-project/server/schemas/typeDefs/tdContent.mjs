const contentTypeDefs = `
    

    type Content {
        id: ID!
        title: String!
        type: String!
        content: String
        createdAt: Date
        updatedAt: Date
        expirationAt: Date
        version: Int
        status: Boolean
        publishAt: Date
        images: [ContentImages] 
        elements: [ContentElements]
        colors: [ColorsIndex]
        ownerId: ID
    }

    type ContentElements {
        position: String
        index: Int
        text: String
    }

    type ContentImages {
        image: String 
        index: Int
    }

    input ContentInput {
        title: String!
        type: String!
        createdAt: Date!
        updatedAt: Date
        expirationAt: Date
        version: Int
        status: Boolean
        publishAt: Boolean!
        elements: [ContentElementsInput]
        images: [ContentImagesInput]
        colors: [ColorsIndexInput]
        ownerId: ID
    }

    input ContentElementsInput {
        position: String
        index: Int
        text: String
    }

    input ContentImagesInput {
        image: String
        index: Int
    }

    type Query {
        getContent(contentId: ID!): Content
    }

    type Mutation {
        createContent(content: ContentInput): Status
        updateContent(id: ID!, content: ContentInput): Status
    }
`;

export default contentTypeDefs;

// add keyword to content 