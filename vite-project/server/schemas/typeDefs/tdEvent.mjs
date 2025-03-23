export const tdEvent = `
    type Event {
        id: ID!
        type: String
        createdAt: Date
        updatedAt: Date
        publishedAt: Date
        startDate: Date
        endDate: Date
        languages: [LanguageTranslation]
        ownership: Ownership
        status: String
        actions: [Action]
        ownedMessages: [OwnedMessages]
    }

    type Action {
        action: String
        trigger: String
        responseType: String
        response: String
        index: Int
    }

    type Trigger {
        event: String
        sourceId: String
        sourceType: String
        action: String
    }

    input EventInput {
        type: String!
        createdAt: Date!
        updatedAt: Date
        publishedAt: Date
        startDate: Date
        endDate: Date
        languages: [LanguageTranslationInput]
        ownership: OwnershipInput
        status: String
        actions: [ActionInput]
        ownedMessages: [OwnedMessagesInput]
    }

    input ActionInput {
        action: String
        trigger: String
        responseType: String
        response: String
        index: Int
    }

    input TriggerInput {
        event: String
        sourceId: String
        sourceType: String
        action: String
    }

    extend type Query {
        getEvent(id: ID!): Event
    }

    extend type Mutation {
        createEvent(Event: EventInput): Event
        updateEvent(id: ID!, Event: EventInput): Event
        deleteEvent(id: ID!): Event
    }
    `;

export default tdEvent;