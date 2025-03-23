const tdSubscription = `
  type AppSubscription {
    createdAt: Date
    updatedAt: Date
    version: Number
    ownership: Ownership
    name: String
    description: String
    active: Boolean
    type: String
    token: String
    startDate: Date
    endDate: Date
    trialPeriod: Int
    plan: String
    price: Float
    billingCycle: String
    status: String
    renewalDate: Date
    gracePeriod: Int
    pointsPerDollar: Float
    discountTiers: [DiscountTier]
    rewards: [Reward]
    cancellation: Cancellation
    contents: [Content]
    notifications: [Notification]
    alerts: [UserAlert]
    messages: [Message]
    keywords: [Keyword]
    categories: [Category]
    seasons: [Season]
    promotions: [Promotion]
    promoCodes: [Token]
    policies: [String]
    }

    type DiscountTier {
        minPoints: Int
        discountPercent: Float
        discountCode: String
        expiresAt: Date
        index: Int
    }

    type Reward {
        reward: [Product]
        threshold: Int
        achieved: Boolean
        index: Int
    }

    type Cancellation {
        reason: String
        refundStatus: String
    }
        
    input SubscriptionInput {
        createdAt: Date
        updatedAt: Date
        version: Number
        ownership: OwnershipInput
        name: String
        description: String
        active: Boolean
        type: String
        token: String
        startDate: Date
        endDate: Date
        trialPeriod: Int
        plan: String
        price: Float
        billingCycle: String
        status: String
        renewalDate: Date
        gracePeriod: Int
        pointsPerDollar: Float
        discountTiers: [DiscountTierInput]
        rewards: [RewardInput]
        cancellation: CancellationInput
        contents: [ID]
        notifications: [ID]
        alerts: [ID]
        messages: [ID]
        keywords: [ID]
        categories: [ID]
        seasons: [ID]
        promotions: [ID]
        promoCodes: [ID]
        policies: [String]
    }

    
    input DiscountTierInput {
        minPoints: Int
        discountPercent: Float
        discountCode: String
        expiresAt: Date
        index: Int
    }

    input RewardInput {
        reward: [ID]
        threshold: Int
        achieved: Boolean
        index: Int
    }

    input CancellationInput {
        reason: String
        refundStatus: String
    }

    extend type Query {
        getSubscription: [AppSubscription]
    }

    extend type Mutation {
        createSubscription(subscription: SubscriptionInput): AppSubscription
        updateSubscription(id: ID!, subscription: AppSubscriptionInput): AppSubscription
        deleteSubscription(id: ID!): AppSubscription
        }

`;

export default tdSubscription
