const tdUserAlert = `

    type UserAlert {
        createdAt: Date
        updatedAt: Date
        publishedAt: Date
        expiredAt: Date
        version: Int
        status: String
        languages: [LanguageTranslation]
        privacy: String
        title: String
        text: String
        type: String
        images: ImageIndex
        colors: [ColorsIndex]
        layouts: [LayoutList]
        ownership: Ownership
        keyword: [Keyword]
        season: [Season]
        promotion: [Promotion]
        category: [Category]
        products: [ProductList]
        stores: [StoreList]
        trigger: [Trigger]
    }

    input UserAlertInput {
        createdAt: Date
        updatedAt: Date
        publishedAt: Date
        expiredAt: Date
        version: Int
        status: String
        languages: [LanguageTranslationInput]
        text: String
        type: String
        images: ImageIndexInput
        title: String
        colors: [ColorsIndexInput]
        layouts: [LayoutListInput]
        ownership: OwnershipInput
        keyword: [ID]
        season: [ID]
        promotion: [ID]
        category: [ID]
        products: [ProductListInput]
        stores: [StoreListInput]
        trigger: [TriggerInput]
    }

    extend type Query {
        getUserAlert(id: ID!): UserAlert
        }

    extend type Mutation {
        createUserAlert(userAlert: UserAlertInput): UserAlert
        
        updateUserAlert(id: ID!, userAlert: UserAlertInput): UserAlert
        subscribeToAlert(id: ID!, userId: ID): UserAlert
        deleteUserAlert(id: ID!): UserAlert
    }

`;

export default tdUserAlert;

//add keyword product detail possibly for user alerts 

// getUserAlerts: [UserAlert]
// getUserFilteredAlerts(userId: ID!, before: Date, unseenOnly: Boolean): [UserAlert!]!
// createAlertForUser(userId: ID!, userAlert: UserAlertInput): UserAlert
// createAlertForUsers(userIds: [ID]!, userAlert: UserAlertInput): [UserAlert]
// createAlertForType(type: String!, userAlert: UserAlertInput): UserAlert
// unSubscribeToAlert(id: ID!, userId: ID): UserAlert