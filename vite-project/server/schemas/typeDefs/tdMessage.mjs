const tdMessage = `

    type Message {
        ownership: Ownership
        receivership: Ownership
        languages: [LanguageTranslation]
        text: String!
        images: [ImageIndex]
        type: String
        createdAt: Date
        updatedAt: Date
        publishedAt: Date
        deletedAt: Date
        trigger: [Trigger]
    }

    type Conversations {
        owership: Ownership
        messages: [MessageList]
    }

    type MessageList {
        message: Message
        read: Boolean
        publishedAt: Date
    }

    input MessageInput {
        ownership: OwnershipInput
        receiverOwnership: OwnershipInput
        languages: [LanguageTranslationInput]
        text: String!
        images: [ImageIndexInput]
        type: String
        createdAt: Date
        updatedAt: Date
        publishedAt: Date
        deletedAt: Date
        trigger: [TriggerInput]
    }

    input ConversationsInput {
        ownership: OwnershipInput
        messages: [MessageListInput]
    }

    input MessageListInput {
        message: MessageInput
        read: Boolean
        publishedAt: Date
    }

    extend type Query {
        getMessage(id: ID!): Message
    }

    extend type Mutation {
        createMessage(message: MessageInput): Message
        updateMessage(id: ID!, message: MessageInput): Message
        deleteMessage(id: ID!): Message
    }


`;

export default tdMessage;