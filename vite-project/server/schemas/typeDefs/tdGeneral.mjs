// admin && superAdmin batch operations for creatinf, updating, deleting, and pulling data 

// create resolvers for product filtration using the search box 
// creating resolver for token retrieval and validation 
// create reolver for subscripiton data retrieval
// create resolvers for users to subscribet to content
// create resolver for purchases, exchanges, and refunds

// user function for updating user data
    //getContent
    //getContentById
    //getLatestContent
    //getFilteredContent

// getItems 

// getItemsByDateLatestSeen

// createItem

// createItems

// updateItem

// updateItems

// deleteItem

// deleteItems

// adminGetItems

// need filters, date sorting, feature sorting, pagination, 

// add directives and tags for scalability and organization

const genericTypeDefs = `
# authorization
    input AuthorizationInput {
        token: String!
        role: String
        isAuthenticated: Boolean
    }


# query input types
    input FilterInput {
        field: String!
        operator: String! # comparison operator : 'eq = equals', 'ne = not equals', 'gt = greater than', 'lt = less than', 'gte = greater than or equal to', 'lte = less than or equal to', 'in = in array', 'nin = not in array', 'regex = regular expression'
        value: String
    }

    input PaginationInput {
        page: Int!
         limit: Int!
    }
    
    input SortInput {
        field: String!
        order: Int!
    }


# mutation input types
    input UpdateInput {
        field: String!
        value: String
    }

    input batchUpdateInput {
        id: ID
        updates: [UpdateInput]
    }

    input NestedUpdateInput {
        field: String!
        value: String
        subFields: [NestedUpdateInput]
    }

    input dataInput {
        key: String!
        value: String
    }

    input payloadsInput {
        entity: String!
        data: [ dataInput ]
        id: ID
    }

    input queryInput {
        field: String!
    }


# model and nested model data unions and types

    union ModelEntity = Content | Notification | Order | Product | Category | Keyword | Season | Promotion | Recommendation | Review | Token | User | UserAlert | UserCart | Wishlist

    union supportEntity = ColorsIndex | ContentElements | ContentImages | OrderTax | ShippingDetails | Discount | Dimensions | UserInteraction | RecommendationMetadata | KeywordRecommends | CategoryRecommends | SeasonRecommends | PromotionRecommends | DirectRecommends | IndirectRecommends | RecommendedProducts | TokenPin | TokenMetadata | TokenLocation | UserProviders | Session | State | Device | Address | Demographics | Subscription

    union inputModelEntity = ContentInput | NotificationInput | OrderInput | ProductInput | CategoryInput | KeywordInput | SeasonInput | PromotionInput | RecommendationInput | ReviewInput | TokenInput | UserInput | UserAlertInput | UserCartInput | WishlistInput

    union inputSupportEntity = ColorsIndexInput | ContentElementsInput | ContentImagesInput | TaxInput | ShippingDetailsInput | DiscountInput | DimensionsInput | UserInteractionInput | RecommendationMetadataInput | KeywordRecommendsInput | CategoryRecommendsInput | SeasonRecommendsInput | PromotionRecommendsInput | DirectInput | IndirectInput | RecommendedProductsInput | TokenPinInput | TokenMetadataInput | TokenLocationInput | UserProvidersInput | SessionInput | StateInput | DeviceInput | AddressInput | DemographicsInput | SubscriptionInput


# meta data types
    type Status {
        success: Boolean
        message: String
        code: Int
        entity: String
    }

    input validationInut {
    isValid: Boolean
    message: String
    }

    input SearchInput {
        field: String
        value: String
    }


# query and mutation types
    type Query {
        getPublicEntity( entity: String!, id: ID!, fields: [queryInput]): ModelEntity
        getPublicEntities( entity: String!, id: ID, fields:[queryInput], filters: [FilterInput], sort: SortInput, pagination: PaginationInput): [ModelEntity]
        getEntitiesByLatest( entity: String!, fields: [queryInput], sort: [SortInput], pagination: PaginationInput): [ModelEntity]
        getAdminEntity( entity: String!, id: ID!, fields: [queryInput]): ModelEntity
        getAdminEntities( entity: String!, id: ID, fields:[queryInput], filters: [FilterInput], sort: SortInput, pagination: PaginationInput): [ModelEntity]
        getEntitiesByUpdates( entity: String!, fields: [queryInput], limit: Int): [ModelEntity]
        getPersonalEntities( entity: String!, id: ID!, fields: [queryInput], filters: [FilterInput], sort: SortInput, pagination: PaginationInput): [ModelEntity]
    }

    type Mutation {
        createEntity( entity: String!, data: [dataInput!]! ): [Status!]!
        bacthCreateEntities( entity: String!, payloads: [payloadsInput] ): [Status]
        updateEntity( entity: String!, id: ID!, data: payloadsInput ): Status
        batchUpdateEntities( entity: String!, update: [payloadsInput]): [Status] 
        deleteEntity( entity: String!, id: ID!): Status
        batchDeleteEntities( entity: String!, filters: [FilterInput]): [Status]
    }


`;

export default genericTypeDefs;

// Common MongoDB Query Operators
// These are used to filter documents in find() queries:

// GraphQL Equivalent	MongoDB Operator	Description	Example
// eq	$eq	Matches documents where a field equals a value.	{ price: { $eq: 10 } }
// ne	$ne	Matches documents where a field does not equal a value.	{ price: { $ne: 10 } }
// gt	$gt	Matches documents where a field is greater than a value.	{ price: { $gt: 50 } }
// gte	$gte	Matches documents where a field is greater than or equal to a value.	{ price: { $gte: 50 } }
// lt	$lt	Matches documents where a field is less than a value.	{ price: { $lt: 50 } }
// lte	$lte	Matches documents where a field is less than or equal to a value.	{ price: { $lte: 50 } }
// in	$in	Matches documents where a field's value is in an array.	{ category: { $in: ["A", "B"] } }
// nin	$nin	Matches documents where a field's value is not in an array.	{ category: { $nin: ["A", "B"] } }
// MongoDB Logical Operators
// These operators allow you to combine conditions:

// GraphQL Equivalent	MongoDB Operator	Description	Example
// and	$and	Combines multiple query expressions; all must be true.	{ $and: [ { price: { $gte: 50 } }, { stock: { $gt: 0 } } ] }
// or	$or	Combines multiple query expressions; at least one must be true.	{ $or: [ { price: { $gte: 50 } }, { stock: { $lt: 5 } } ] }
// not	$not	Negates the condition.	{ price: { $not: { $gte: 50 } } }
// MongoDB Update Operators
// These operators are used for modifying documents during an update() or updateMany() operation:

// MongoDB Operator	Description	Example
// $set	Updates the value of a field.	{ $set: { price: 20 } }
// $inc	Increments the value of a field by a specified amount.	{ $inc: { stock: 5 } }
// $push	Adds a value to an array field.	{ $push: { tags: "newTag" } }
// $pull	Removes matching elements from an array.	{ $pull: { tags: "oldTag" } }
// $unset	Removes a field from the document.	{ $unset: { stock: "" } }
