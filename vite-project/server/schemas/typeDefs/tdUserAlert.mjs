const tdUserAlert = `

    type UserAlert {
        createdAt: Date
        updatedAt: Date
        publishAt: Date
        text: String
        type: String
        image: String
        title: String
        colors: [ColorsIndex]
        ownerId: User
    }

    input UserAlertInput {
        createdAt: Date
        updatedAt: Date
        publishAt: Date
        text: String
        type: String
        image: Upload
        title: String
        colors: [ColorsIndexInput]
        ownerId: ID
    }

    type Query {
        getUserAlerts: [UserAlert]
        getUserAlertById(id: ID!): UserAlert
        getUserFilteredAlerts(userId: ID!, before: Date, unseenOnly: Boolean): [UserAlert!]!
    }

    type Mutation {
        createUserAlert(userAlert: UserAlertInput): UserAlert
        createAlertForUser(userId: ID!, userAlert: UserAlertInput): UserAlert
        createAlertForUsers(userIds: [ID]!, userAlert: UserAlertInput): [UserAlert]
        createAlertForType(type: String!, userAlert: UserAlertInput): UserAlert
        updateUserAlert(id: ID!, userAlert: UserAlertInput): UserAlert
        subscribeToAlert(id: ID!, userId: ID): UserAlert
        unSubscribeToAlert(id: ID!, userId: ID): UserAlert
        deleteUserAlert(id: ID!): UserAlert
    }

`;

export default tdUserAlert;

//add keyword product detail possibly for user alerts 