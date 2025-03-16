const notificationTypeDefs = `

    type Notification {
        id: ID! 
        type: String!
        createdAt: Date!
        updatedAt: Date
        title: String!
        text: String!
        colors: [ColorsIndex]
        ownerId: ID
    }

    input NotificationInput {
        type: String!
        createdAt: Date!
        updatedAt: Date
        title: String!
        text: String!
        colors: [ColorsIndexInput]
        ownerId: ID
    }

    type Query {
        getNotification(ownerId: ID!): [Notification]
       }

    type Mutation {
        sendNotificationToUser(ownerId: ID!, notification: NotificationInput): Notification
        sendNotificationToUsers(ownerIds: [ID]!, notification: NotificationInput): [Notification]
    }
`;

export default notificationTypeDefs;
