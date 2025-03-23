// create recurring notifications

// createNotificationForAction

// PushNotificationForAction

// NotifyUsersOfAction

const notificationTypeDefs = `

    type Notification {
        id: ID! 
        type: String!
        createdAt: Date!
        updatedAt: Date
        languages: [LanguageTranslation]
        title: String!
        text: String!
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

    input NotificationInput {
        type: String!
        createdAt: Date!
        updatedAt: Date
        languages: [LanguageTranslationInput]
        title: String!
        text: String!
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
        getNotification(ownerId: ID!): [Notification]
       }

    extend type Mutation {
        createNotification(notification: NotificationInput): Notification
        updateNotification(id: ID!, notification: NotificationInput): Notification
        deleteNotification(id: ID!): Notification
    }
`;

export default notificationTypeDefs;
