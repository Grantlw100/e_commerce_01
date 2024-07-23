const typedefs = `

scalar Upload

type File {
  filename: String!
  mimetype: String!
  encoding: String!
  url: String!
}
  
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
    image: String
   description: String
  }
  
  type Keyword {
    id: ID!
    name: String!
    image: String
    description: String
  }
  
  type Season {
    id: ID!
    name: String!
    startDate: String
    endDate: String
    image: String
    description: String
  }
  
  type Promotion {
    id: ID!
    name: String!
    discount: Float!
    startDate: String
    endDate: String
    image: String
    description: String
  }
  
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String
    address: Address!
    viewedLanding: Boolean
    admin: Boolean
    lovedProducts: [Product]
    recentlyViewed: [Product]
    orders: [Order]
    notifications: [Notification]
    userAlerts: [UserAlert]
    cart: UserCart
    darkMode: Boolean
    profilePicture: String
  }
  
type Content {
    id: ID!
    title: String!
    content: String!
    contentImages: [String]
    contentType: String!
    published: Boolean
    user: User!
    createdDate: String
    modifiedDate: String
    expirationDate: String
    expirationStatus: Boolean
    viewed: Boolean
  }


  type Address {
    address1: String!
    address2: String
    city: String!
    state: String!
    zip: String!
    country: String!
  }

  type Review {
    reviewText: String!
    reviewAuthor: User!
    reviewProduct: Product!
    reviewDate: String!
    reviewRating: Int!
    reviewImages: [String]
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
    alertImage: String
  }

  input ProductInput {
    name: String!
    quickDescription: String!
    description: String!
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
    quantity: Int!
    weight: Float!
    dimensions: DimensionsInput
    taxCategory: String
  }

    input DimensionsInput {
    length: Float!
    width: Float!
    height: Float!
  }

  input ReviewInput {
    reviewText: String!
    reviewAuthor: ID!
    reviewProduct: ID!
    reviewRating: Int!
  }
  
  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    phone: String
    password: String!
    address: AddressInput!
    viewedLanding: Boolean
    admin: Boolean
  }

  input UpdateUserInput {
    firstName: String
    lastName: string 
    email: String
    phone: String
    password: String
    address: AddressInput
    viewedLanding: Boolean
    admin: Boolean
    darkMode: Boolean
}

type UserResponse {
    token: String
    user: User
    profileImageUrl: String
}

  input AddressInput {
    address1: String!
    address2: String
    city: String!
    state: String!
    zip: String!
    country: String
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
    notificationDate: String
  }

  input UserAlertInput {
    user: ID!
    alertText: String!
    alertDate: String
    type: String!
    viewed: Boolean
    alertImage: String
  }

  input ContentInput {
    title: String!
    content: String!
    contentImages: [String]
    contentType: String!
    published: Boolean
    user: ID!
    createdDate: String
    expirationDate: String
  }


  input CategoryInput {
    name: String!
   description: String
}

input KeywordInput {
    name: String!
    description: String
}

input SeasonInput {
    name: String!
    startDate: String
    endDate: String
    description: String
}

input PromotionInput {
    name: String!
    discount: Float!
    startDate: String
    endDate: String
    description: String
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
    uploadSingleFile(file: Upload!): String
    uploadMultipleFiles(files: [Upload!]!): [String]
    createUser(input: UserInput, file: Upload!): User!
    updateUser(id: ID!, input: UpdateUserInput!, file: Upload): UserResponse!
    deleteUser(id: ID!): Boolean!
    createCategory(input: CategoryInput!, file: Upload!): Category
    updateCategory(id: ID!, input: CategoryInput!, file: Upload): Category
    deleteCategory(id: ID!): Boolean!
    createKeyword(input: KeywordInput, file: Upload): Keyword
    updateKeyword(id: ID!,input: KeywordInput, file: Upload): Keyword
    deleteKeyword(id: ID!): Boolean!
    createSeason(input: SeasonInput, file: Upload): Season
    updateSeason(id: ID!, input: SeasonInput, file: Upload): Season
    deleteSeason(id: ID!): Boolean
    createPromotion(input: PromotionInput, file: Upload): Promotion
    updatePromotion(id: ID!, input: PromotionInput, file: Upload): Promotion
    deletePromotion(id: ID!): Boolean
    createProduct(input: ProductInput!, productImage: Upload!, descriptionImages: [Upload]): Product
    updateProduct(id: ID!, input: ProductInput, productImage: Upload!, descriptionImages: [Upload]): Product
    deleteProduct(id: ID!): Boolean
    loginUser(email: String!, password: String!): AuthPayload
    logoutUser: Boolean
    createOrder(input: OrderInput): Order
    updateOrder(id: ID!, input: OrderInput): Order
    deleteOrder(id: ID!): Boolean
    chargeOrder(userId: ID!, orderId: ID!, source: String!): Order
    createNotification(input: NotificationInput): Notification
    updateNotification(id: ID!, input: NotificationInput): Notification
    deleteNotification(id: ID!): Boolean
    sendNotificationToAll(input: NotificationInput): Boolean
    sendNotificationToUser(userId: ID!, input: NotificationInput): Boolean
    sendUserAlertToAll(input: UserAlertInput): Boolean
    sendUserAlertToUser(userId: ID!, input: UserAlertInput): Boolean
    createReview(productId: ID!, input: ReviewInput): Review
    updateReview(productId: ID!, input: ReviewInput): Review
    deleteReview(productId: ID!): Boolean
    createCart(userId: ID!): UserCart 
    updateCart(userId: ID!, input: [CartItemInput]!): UserCart
    deleteCart(userId: ID!): Boolean
    addItemToCart(userId: ID!, productId: ID!, quantity: Int!): UserCart
    removeItemFromCart(userId: ID!, productId: ID!): UserCart
    updateCartItemQuantity(userId: ID!, productId: ID!, quantity: Int!): UserCart
    addProductToLoved(userId: ID!, productId: ID!): User
    removeProductFromLoved(userId: ID!, productId: ID!): User
    addProductToRecentlyViewed(userId: ID!, productId: ID!): User
    removeProductFromRecentlyViewed(userId: ID!, productId: ID!): User
    clearRecentlyViewed(userId: ID!): User
  }

  `;

  module.exports = typedefs;
