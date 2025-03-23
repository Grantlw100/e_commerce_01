const tdLayout = `
  type Layout {
    id: ID
    createdAt: Date
    updatedAt: Date
    version: Int
    permissions: [String]
    ownership: Ownership
    name: String
    description: String
    type: String
    structure: JSON
    components: [ComponentList]
    elements: [ContentElements]
    colors: [ColorsIndex]
    themes: [Themes]
    logos: [Logos]
    bannerImages: [ImageIndex]
    layouts: [LayoutList]
  }

    type ComponentList {
        type: String
        index: Int
    }

    input LayoutInput {
        createdAt: Date
        updatedAt: Date
        version: Int
        permissions: [String]
        ownership: OwnershipInput
        name: String
        description: String
        type: String
        structure: JSON
        components: [ComponentListInput]
        elements: [ContentElementsInput]
        colors: [ColorsIndexInput]
        themes: [ThemesInput]
        logos: [LogosInput]
        bannerImages: [ImageIndexInput]
        layouts: [LayoutListInput]
    }

    input ComponentListInput {
        type: String
        index: Int
    }

    extend type Query {
        getLayout(id: ID!): Layout
    }

    extend type Mutation {
        createLayout(layout: LayoutInput): Layout
        updateLayout(id: ID!, layout: LayoutInput): Layout
        deleteLayout(id: ID!): Layout
    }

`;

export default tdLayout;