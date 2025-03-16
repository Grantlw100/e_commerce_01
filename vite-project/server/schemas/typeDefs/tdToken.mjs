const tdToken = `

    type Token {
        userId: ID!
        role: String
        pin: [TokenPin]
        token: String!
        tokenType: String
        createdAt: Date
        updatedAt: Date
        expiresAt: Date
        valid: Boolean
        revokedAt: Date
        metadata: TokenMetadata
        location: TokenLocation
        }   

    type TokenPin {
        count: Number
        pin: String
        }

    type TokenMetadata {
        ip: String
        userAgent: String
        deviceType: String
        deviceId: String
        }

    type TokenLocation {
        lat: Float
        long: Float
        city: String
        country: String
        }

    input TokenInput {
        userId: ID!
        role: String
        pin: [TokenPinInput]
        token: String!
        tokenType: String
        createdAt: Date
        updatedAt: Date
        expiresAt: Date
        valid: Boolean
        revokedAt: Date
        metadata: TokenMetadataInput
        location: [TokenLocationInput]
        }

    input TokenMetadataInput {
        ip: String
        userAgent: String
        deviceType: String
        deviceId: String
        }

    input TokenLocationInput {
        lat: Float
        long: Float
        city: String
        country: String
        }

    input TokenPinInput {
        count: Number
        pin: String
        date: Date
        }

    type Query {
        getTokens: [Token]
        getTokenByUserId(userId: ID!): [Token]
        searchToken(search: String!): [Token]
        searchTokens(search: String!): [Token]
        verifyToken(token: String!): Boolean
        getRefreshTokens: [Token]
        getRefreshTokenByUserId(userId: ID!): [Token]
        searchRefreshToken(search: String!): [Token]
        searchRefreshTokens(search: String!): [Token]
        verifyRefreshToken(token: String!): Boolean
        verifyPin(token: String!, pin: String!): Boolean
    }

    type Mutation {
        createUserToken(token: TokenInput): Token
        createAdminToken(token: TokenInput): Token
        createPin(token: String!, pin: String!): Token
        updatePin(token: String!, pin: String!): Token
        updateUserToken(id: ID!, token: TokenInput): Token
        updateTokenMetadata(id: ID!, metadata: TokenMetadataInput): Token
        updateAdminToken(id: ID!, token: TokenInput): Token
        revokeToken(id: ID!): Token
        revokeAdminToken(id: ID!): Token
        deletePin(token: String!): Token
        deleteToken(id: ID!): Token
        deleteTokens(ids: [ID]!): [Token]

    }

`;

export default tdToken;