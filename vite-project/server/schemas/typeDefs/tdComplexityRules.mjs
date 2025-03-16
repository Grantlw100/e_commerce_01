export const ComplexityRules = `

    # Define the values of a complexity rule
type ComplexityRules {
        name: String
        value: Int
        multipliers: [String]
        description: String
        appliesTo: [String]
        role: [String]
    }

    # This directive will be used to set the complexity of a field
directive @complexity(
    value: Int!
    multipliers: [String!]
    ) on FIELD_DEFINITION

    # This directive will bypass the complexity check
directive @bypassComplexity on FIELD_DEFINITION

    # This directive will set the complexity of a field to 0
directive @noComplexity on FIELD_DEFINITION

    # This directive will be used for Rate Limiting
directive @rateLimit(
    max: Int!
    window: String!
    current: String
    message: String
    ) on FIELD_DEFINITION

directive @auth(
    requires: Role = USER
    ) on FIELD_DEFINITION | OBJECT

    enum Role {
    ADMIN
    USER
    GUEST
    }
`;