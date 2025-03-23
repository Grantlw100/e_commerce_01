const tdToken = `

    type Token {
        role: String
        pin: [TokenPin]
        token: String!
        type: String
        createdAt: Date
        updatedAt: Date
        expiredAt: Date
        valid: Boolean
        revokedAt: Date
        metadata: TokenMetadata
        location: TokenLocation
        ownership: Ownership
        }   

    type TokenPin {
        count: Number
        pin: String
        updatedAt: Date
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
        role: String
        pin: [TokenPinInput]
        token: String!
        type: String
        createdAt: Date
        updatedAt: Date
        expiredAt: Date
        valid: Boolean
        revokedAt: Date
        metadata: TokenMetadataInput
        location: [TokenLocationInput]
        ownership: OwnershipInput
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

    extend type Query {
        getToken: [Token]
    }

    extend type Mutation {
        createToken(token: TokenInput): Token
        updateToken(id: ID!, token: TokenInput): Token
        deleteToken(id: ID!): Token
    }

`;

export default tdToken;

// getTokenByUserId(userId: ID!): [Token]
//         searchToken(search: String!): [Token]
//         searchTokens(search: String!): [Token]
//         verifyToken(token: String!): Boolean
//         getRefreshTokens: [Token]
//         getRefreshTokenByUserId(userId: ID!): [Token]
//         searchRefreshToken(search: String!): [Token]
//         searchRefreshTokens(search: String!): [Token]
//         verifyRefreshToken(token: String!): Boolean
//         verifyPin(token: String!, pin: String!): Boolean

// createUserToken(token: TokenInput): Token
// createAdminToken(token: TokenInput): Token
// createPin(token: String!, pin: String!): Token
// updatePin(token: String!, pin: String!): Token
// updateUserToken(id: ID!, token: TokenInput): Token
// updateTokenMetadata(id: ID!, metadata: TokenMetadataInput): Token
// updateAdminToken(id: ID!, token: TokenInput): Token
// revokeToken(id: ID!): Token
// revokeAdminToken(id: ID!): Token
// deletePin(token: String!): Token
// deleteToken(id: ID!): Token
// deleteTokens(ids: [ID]!): [Token]