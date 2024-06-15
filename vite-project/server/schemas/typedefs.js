const typedefs = `
type Product {
    id: ID!
    name: String!
    quickDescription: String!
    description: String!
    descriptionImages: [String]
    category: Category!
    season: Season
    promotion: Promotion
    price: Float!
    discount: Float
    featured: Boolean
    loved: Boolean
    viewed: Boolean
    keywords: [Keyword]
    includes: [Product]
    reviews: [Review]
    bundled: Boolean
    image: String!
    quantity: Int!
    weight: Float!
    dimensions: Dimensions
    taxCategory: String
  }

  type Order {
    id: ID!
    user: User!
    products: [Product]
    orderDate: String!
    orderTotal: Float!
    orderStatus: String!
    trackingNumber: String
  }
  
  type Category {
    id: ID!
    name: String!
  }
  
  type Keyword {
    id: ID!
    name: String!
  }
  
  type Season {
    id: ID!
    name: String!
  }
  
  type Promotion {
    id: ID!
    name: String!
    discount: Float!
    startDate: String
    endDate: String
  }
  
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    address: Address!
    viewedLanding: Boolean
    admin: Boolean
    lovedProducts: [Product]
    recentlyViewed: [Product]
    orders: [Order]
    notifications: [Notification]
    userAlerts: [UserAlert]
    cart: UserCart
  }
  
  type Address {
    street: String!
    city: String!
    state: String!
    zip: String!
  }

  type Review {
    reviewText: String!
    reviewAuthor: User!
    reviewProduct: Product!
    reviewDate: String!
    reviewRating: Int!
  }
  
  type Dimensions {
    length: Float!
    width: Float!
    height: Float!
  }
  
  type UserCart {
    user: User!
    products: [Product]
    cartTotal: Float!
  }
  
  type AuthPayload {
    token: String
    user: User
  }

  type Notification {
    id: ID!
    user: User!
    notificationText: String!
    notificationDate: String!
    viewed: Boolean
    type: String!
  }

  type UserAlert {
    id: ID!
    user: User!
    alertText: String!
    alertDate: String!
    viewed: Boolean
    type: String!
  }

  input ProductInput {
    name: String!
    quickDescription: String!
    description: String!
    descriptionImages: [String]
    category: ID!
    season: ID
    promotion: ID
    price: Float!
    discount: Float
    featured: Boolean
    loved: Boolean
    viewed: Boolean
    keywords: [ID]
    includes: [ID]
    reviews: [ReviewInput]
    bundled: Boolean
    image: String!
    quantity: Int!
    weight: Float!
    dimensions: DimensionsInput
    taxCategory: String
  }
  
  input ReviewInput {
    reviewText: String!
    reviewAuthor: ID!
    reviewProduct: ID!
    reviewRating: Int!
  }
  
  input DimensionsInput {
    length: Float!
    width: Float!
    height: Float!
  }
  
  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    address: AddressInput!
    viewedLanding: Boolean
    admin: Boolean
  }

  input AddressInput {
    street: String!
    city: String!
    state: String!
    zip: String!
  }

  input OrderInput {
    user: ID!
    products: [ID]
    orderTotal: Float!
    orderStatus: String!
    trackingNumber: String
  }

  input NotificationInput {
    user: ID!
    notificationText: String!
    type: String!
  }

  input UserAlertInput {
    user: ID!
    alertText: String!
    type: String!
  }

  type Query {
    getAllProducts: [Product]
    getProductById(id: ID!): Product
    getProductsByCategory(categoryId: ID!): [Product]
    getProductsByKeyword(keywordId: ID!): [Product]
    getProductsBySeason(seasonId: ID!): [Product]
    getProductsByPromotion(promotionId: ID!): [Product]
    getAllCategories: [Category]
    getAllKeywords: [Keyword]
    getAllSeasons: [Season]
    getAllPromotions: [Promotion]
    getUserById(id: ID!): User
    getUserCart(userId: ID!): UserCart
    getAllOrders: [Order]
    getOrdersByUser(userId: ID!): [Order]
    getOrderHistory(userId: ID!): [Order]
    getOrderDetails(orderId: ID!): Order
    getNotifications(userId: ID!): [Notification]
  }
  
  type Mutation {
    createProduct(input: ProductInput): Product
    updateProduct(id: ID!, input: ProductInput): Product
    deleteProduct(id: ID!): Boolean
    createCategory(name: String!): Category
    updateCategory(id: ID!, name: String!): Category
    deleteCategory(id: ID!): Boolean
    createKeyword(name: String!): Keyword
    updateKeyword(id: ID!, name: String!): Keyword
    deleteKeyword(id: ID!): Boolean
    createSeason(name: String!): Season
    updateSeason(id: ID!, name: String!): Season
    deleteSeason(id: ID!): Boolean
    createPromotion(name: String!, discount: Float!, startDate: String, endDate: String): Promotion
    updatePromotion(id: ID!, name: String!, discount: Float!, startDate: String, endDate: String): Promotion
    deletePromotion(id: ID!): Boolean
    createUser(input: UserInput): AuthPayload
    updateUser(id: ID!, input: UserInput): User
    deleteUser(id: ID!): Boolean
    loginUser(email: String!, password: String!): AuthPayload
    logoutUser: Boolean
    createOrder(input: OrderInput): Order
    updateOrder(id: ID!, input: OrderInput): Order
    deleteOrder(id: ID!): Boolean
    createNotification(input: NotificationInput): Notification
    updateNotification(id: ID!, input: NotificationInput): Notification
    deleteNotification(id: ID!): Boolean
    createReview(productId: ID!, input: ReviewInput): Review
    updateReview(productId: ID!, input: ReviewInput): Review
    deleteReview(productId: ID!): Boolean
    createCart(userId: ID!): UserCart 
    updateCart(userId: ID!, input: [CartItemInput]!): UserCart
    deleteCart(userId: ID!): Boolean
    addItemToCart(userId: ID!, productId: ID!, quantity: Int!): UserCart
    removeItemFromCart(userId: ID!, productId: ID!): UserCart
    updateCartItemQuantity(userId: ID!, productId: ID!, quantity: Int!): UserCart
    chargeOrder(userId: ID!, orderId: ID!, source: String!): Order
    sendNotificationToAll(input: NotificationInput): Boolean
    sendUserAlertToAll(input: UserAlertInput): Boolean
    sendNotificationToUser(userId: ID!, input: NotificationInput): Boolean
    sendUserAlertToUser(userId: ID!, input: UserAlertInput): Boolean
    addProductToLoved(userId: ID!, productId: ID!): User
    removeProductFromLoved(userId: ID!, productId: ID!): User
    addProductToRecentlyViewed(userId: ID!, productId: ID!): User
    removeProductFromRecentlyViewed(userId: ID!, productId: ID!): User
    clearRecentlyViewed(userId: ID!): User
  }
  `;

  module.exports = typedefs;
