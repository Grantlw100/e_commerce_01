const tdSettings = `
  type Settings {
    id: ID!
    createdAt: Date
    updatedAt: Date
    darkMode: Boolean
    notifications: JSON
    langauge: String
    currency: String
    preferences: JSON
    ownership: Ownership
  }

    input SettingsInput {
        createdAt: Date
        updatedAt: Date
        darkMode: Boolean
        notifications: JSON
        langauge: String
        currency: String
        preferences: JSON
        ownership: OwnershipInput
    }

    extend type Query {
        getSettings(ownerId: ID!): [Settings]
    }

    extend type Mutation {
        createSettings(ownerId: ID!, settings: SettingsInput): Settings
        updateSettings(ownerId: ID!, settings: SettingsInput): Settings
        deleteSettings(ownerId: ID!, settingsId: ID!): Settings
    }

`;

export default tdSettings;