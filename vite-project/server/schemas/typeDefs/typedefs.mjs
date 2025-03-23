import { gql } from 'apollo-server-express';
import { buildASTSchema, parse } from 'graphql';

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
 
                    /* TYPE DEFINITIONS FOR GRAPHQL */
        /* All Type Defintions for MongoDb & GraphQL that defines nested strucutures and inputs */
        
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//



// no need to define typedefs for specific functions unless often used 



const fulltypedefs = `

schema {
    query: Query
    mutation: Mutation
  }

scalar Date

scalar Upload

type ColorsIndex {
  Color: String
  Index: Int
}

input ColorsIndexInput {
  Color: String
  Index: Int
}

type ProductList {
  product: Product
  quantity: Int
  index: Int
}

input ProductListInput {
  product: ID!
  quantity: Int!
  index: Int
}

type Ownership {
  ownerType: String
  userId: ID
  storeId: ID
}

input OwnershipInput {
  ownerType: String
  userId: ID
  storeId: ID
}

scalar Number

scalar JSON

type Query {
  _empty: String
  getContent(contentId: ID!): Content
  getNotification(ownerId: ID!): [Notification]
  getOrder(id: ID!): Order
  getProduct(id: ID!): Product
  getKeyword: [Keyword]
  getSeason: [Season]
  getPromotion: [Promotion]
  getCategory: [Category]
  getRecommendation(id: ID!): Recommendation
  getReview(id: ID!): Review
  getToken: [Token]
  getUser: [User]
  getUserAlert(id: ID!): UserAlert
  getUserCart(id: ID!): UserCart
  getWishlist: [Wishlist]
  getLayout(id: ID!): Layout
  getStore(storeId: ID!): Store
  getSettings(ownerId: ID!): [Settings]
  getSubscription: [AppSubscription]
  getEvent(id: ID!): Event
  getPublicEntity(entity: String!, id: ID!, fields: [queryInput]): ModelEntity
  getPublicEntities(entity: String!, id: ID, fields: [queryInput], filters: [FilterInput], sort: SortInput, pagination: PaginationInput): [ModelEntity]
  getEntitiesByLatest(entity: String!, fields: [queryInput], sort: [SortInput], pagination: PaginationInput): [ModelEntity]
  getAdminEntity(entity: String!, id: ID!, fields: [queryInput]): ModelEntity
  getAdminEntities(entity: String!, id: ID, fields: [queryInput], filters: [FilterInput], sort: SortInput, pagination: PaginationInput): [ModelEntity]
  getEntitiesByUpdates(entity: String!, fields: [queryInput], limit: Int): [ModelEntity]
  getPersonalEntities(entity: String!, id: ID!, fields: [queryInput], filters: [FilterInput], sort: SortInput, pagination: PaginationInput): [ModelEntity]
  getMessage(id: ID!): Message
}

type Mutation {
  _empty: String
  createContent(content: ContentInput): Status
  updateContent(id: ID!, content: ContentInput): Status
  deleteContent(id: ID!): Status
  createNotification(notification: NotificationInput): Notification
  updateNotification(id: ID!, notification: NotificationInput): Notification
  deleteNotification(id: ID!): Notification
  createOrder(order: OrderInput): Order
  updateOrder(id: ID!, order: OrderInput): Order
  deleteOrder(id: ID!): Order
  createProduct(product: ProductInput): Product
  updateProduct(id: ID!, product: ProductInput): Product
  deleteProduct(id: ID!): Product
  createKeyword(keyword: KeywordInput): Keyword
  updateKeyword(id: ID!, keyword: KeywordInput): Keyword
  deleteKeyword(id: ID!): Keyword
  createSeason(season: SeasonInput): Season
  updateSeason(id: ID!, season: SeasonInput): Season
  deleteSeason(id: ID!): Season
  createPromotion(promotion: PromotionInput): Promotion
  updatePromotion(id: ID!, promotion: PromotionInput): Promotion
  deletePromotion(id: ID!): Promotion
  createCategory(category: CategoryInput): Category
  updateCategory(id: ID!, category: CategoryInput): Category
  deleteCategory(id: ID!): Category
  createRecommendation(recommendation: RecommendationInput): Recommendation
  updateRecommendation(productId: ID!, recommendation: RecommendationInput): Recommendation
  deleteRecommendation(id: ID!): Recommendation
  createReview(review: ReviewInput): Review
  updateReview(id: ID!, review: ReviewInput): Review
  deleteReview(id: ID!): Review
  createToken(token: TokenInput): Token
  updateToken(id: ID!, token: TokenInput): Token
  deleteToken(id: ID!): Token
  createUser(user: UserInput): User
  updateUser(id: ID!, user: UserInput): User
  deleteUser(id: ID!): User
  createUserAlert(userAlert: UserAlertInput): UserAlert
  updateUserAlert(id: ID!, userAlert: UserAlertInput): UserAlert
  subscribeToAlert(id: ID!, userId: ID): UserAlert
  deleteUserAlert(id: ID!): UserAlert
  createUserCart(userCart: UserCartInput): UserCart
  updateUserCart(id: ID!, userCart: UserCartInput): UserCart
  deleteUserCart(id: ID!): UserCart
  createWishlist(wishlist: WishlistInput): Wishlist
  updateWishlist(id: ID!, wishlist: WishlistInput): Wishlist
  deleteWishlist(id: ID!): Wishlist
  createLayout(layout: LayoutInput): Layout
  updateLayout(id: ID!, layout: LayoutInput): Layout
  deleteLayout(id: ID!): Layout
  createStore(store: StoreInput): Status
  updateStore(storeId: ID!, store: StoreInput): Status
  deleteStore(storeId: ID!): Status
  createSettings(ownerId: ID!, settings: SettingsInput): Settings
  updateSettings(ownerId: ID!, settings: SettingsInput): Settings
  deleteSettings(ownerId: ID!, settingsId: ID!): Settings
  createSubscription(subscription: SubscriptionInput): AppSubscription
  updateSubscription(id: ID!, subscription: SubscriptionInput): AppSubscription
  deleteSubscription(id: ID!): AppSubscription
  createEvent(Event: EventInput): Event
  updateEvent(id: ID!, Event: EventInput): Event
  deleteEvent(id: ID!): Event
  createEntity(entity: String!, payloads: [dataInput!]!): [Status!]!
  batchCreateEntities(entity: String!, payloads: [payloadsInput]): [Status]
  updateEntity(entity: String!, id: ID!, data: payloadsInput): Status
  batchUpdateEntities(entity: String!, update: [payloadsInput]): [Status]
  deleteEntity(entity: String!, id: ID!): Status
  batchDeleteEntities(entity: String!, filters: [FilterInput]): [Status]
  createMessage(message: MessageInput): Message
  updateMessage(id: ID!, message: MessageInput): Message
  deleteMessage(id: ID!): Message
}

type Content {
  id: ID!
  createdAt: Date
  updatedAt: Date
  expiredAt: Date
  publishedAt: Date
  version: Int
  status: String
  ownership: Ownership
  languages: [LanguageTranslation]
  privacy: String
  title: String!
  type: String!
  elements: [ContentElements]
  images: [ImageIndex]
  colors: [ColorsIndex]
  layouts: [LayoutList]
  keyword: [Keyword]
  category: [Category]
  season: [Season]
  promotion: [Promotion]
  products: [ProductList]
  stores: [StoreList]
  trigger: [Trigger]
}

type ContentElements {
  type: String
  position: String
  index: Int
  text: String
}

type ImageIndex {
  image: String
  index: Int
}

type StoreList {
  store: Store
  index: Int
}

type LanguageTranslation {
  originalLangauge: String
  translatedLanguage: String
}

type LayoutList {
  layout: Layout
  index: Int
}

input ContentInput {
  createdAt: Date
  updatedAt: Date
  expiredAt: Date
  publishedAt: Date
  version: Int
  status: Boolean
  ownership: OwnershipInput
  languages: [LanguageTranslationInput]
  privacy: String
  title: String
  type: String
  elements: [ContentElementsInput]
  images: [ImageIndexInput]
  colors: [ColorsIndexInput]
  layouts: [LayoutListInput]
  keyword: [ID]
  category: [ID]
  season: [ID]
  promotion: [ID]
  products: [ProductListInput]
  stores: [StoreListInput]
  trigger: [TriggerInput]
}

input ContentElementsInput {
  type: String
  position: String
  index: Int
  text: String
}

input ImageIndexInput {
  image: String
  index: Int
}

input StoreListInput {
  store: ID
  index: Int
}

input LanguageTranslationInput {
  originalLanguage: String
  translatedLanguage: String
}

input LayoutListInput {
  layout: ID
  index: Int
}

type Notification {
  id: ID!
  type: String!
  createdAt: Date!
  updatedAt: Date
  languages: [LanguageTranslation]
  title: String!
  text: String!
  colors: [ColorsIndex]
  layouts: [LayoutList]
  ownership: Ownership
  keyword: [Keyword]
  season: [Season]
  promotion: [Promotion]
  category: [Category]
  products: [ProductList]
  stores: [StoreList]
  trigger: [Trigger]
}

input NotificationInput {
  type: String!
  createdAt: Date!
  updatedAt: Date
  languages: [LanguageTranslationInput]
  title: String!
  text: String!
  colors: [ColorsIndexInput]
  layouts: [LayoutListInput]
  ownership: OwnershipInput
  keyword: [ID]
  season: [ID]
  promotion: [ID]
  category: [ID]
  products: [ProductListInput]
  stores: [StoreListInput]
  trigger: [TriggerInput]
}

type Order {
  id: ID!
  createdAt: Date!
  updatedAt: Date!
  orderedAt: Date!
  orderStatus: String!
  ownership: Ownership
  orderedFrom: [OrderedFrom]
  products: [ProductList]
  total: Float!
  subtTotal: Float!
  tax: [OrderTax]
  discounts: [OrderDiscount]
  trackingNumber: String
  shippingDetails: ShippingDetails
}

type OrderedFrom {
  storeId: ID
  product: [ID]
}

type OrderTax {
  code: String
  rate: Float
  amount: Float
}

type ShippingDetails {
  arrivalDate: Date
  shippedDate: Date
  shippingMethod: String
  shippingCost: Float
  address1: String
  address2: String
  city: String
  state: String
  zip: String
}

type OrderDiscount {
  type: String
  amount: Float
  code: String
  promotions: [Promotion]
}

input OrderInput {
  products: [ProductListInput]!
  createdAt: Date!
  updatedAt: Date
  orderDate: Date!
  orderStatus: String!
  ownership: OwnershipInput
  orderedFrom: [OrderedFromInput]
  total: Number!
  subtTotal: Number!
  tax: [TaxInput]
  trackingNumber: String
  shippingDetails: ShippingDetailsInput
  discounts: [OrderDiscountInput]
}

input ShippingDetailsInput {
  arrivalDate: Date
  shippedDate: Date
  shippingMethod: String
  shippingCost: Number
  address1: String
  address2: String
  city: String
  state: String
  zip: String
}

input OrderedFromInput {
  storeId: ID
  products: [ID]
}

input TaxInput {
  code: String
  rate: Number
  amount: Number
}

input OrderDiscountInput {
  type: String
  amount: Number
  code: String
  promotions: [ID]
}

type Product {
  id: ID!
  name: String!
  quickDescription: String!
  description: String
  descriptionImages: [ImageIndex]
  colors: [ColorsIndex]
  layouts: [LayoutList]
  category: [Category]
  season: [Season]
  promotion: [Promotion]
  keyword: [Keyword]
  featured: Boolean
  recommendationId: Recommendation
  reviews: [Review]
  rating: Float
  makeYourOwn: Boolean
  price: Float!
  discount: Float
  taxCategory: String
  includes: [Product]
  bundle: Boolean
  bundled: Boolean
  image: [String!]
  quantity: Int!
  weight: Float!
  dimensions: Dimensions
  inventory: Inventory
  userInteraction: UserInteraction
  createdAt: Date
  updatedAt: Date
  version: Int
  ownership: Ownership
}

type Dimensions {
  length: Float
  width: Float
  height: Float
  size: String
}

type Inventory {
  stock: Int
  reserved: Int
  sold: Int
  restockThreshold: Int
  lastRestocked: Date
  restockActive: Boolean
}

type UserInteraction {
  lovedCount: Int
  cartCount: Int
  wishlistCount: Int
  viewedCount: Int
}

input ProductInput {
  name: String!
  quickDescription: String!
  description: String
  descriptionImages: [ImageIndexInput]
  colors: [ColorsIndexInput]
  layouts: [LayoutListInput]
  category: [ID]
  season: [ID]
  promotions: [ID]
  keywords: [ID]
  featured: Boolean
  recommendationId: ID
  reviews: [ID]
  rating: Number
  makeYourOwn: Boolean
  price: Float!
  discount: Float
  taxCategory: String
  includes: [ID]
  bundle: Boolean
  bundled: Boolean
  image: [ImageIndexInput]
  quantity: Int!
  weight: Float!
  dimensions: DimensionsInput!
  userInteraction: UserInteractionInput
  createdAt: Date
  updatedAt: Date
  version: Int
  ownership: OwnershipInput
}

input DimensionsInput {
  length: Float
  width: Float
  height: Float
  size: String
}

input InventoryInput {
  stock: Int
  reserved: Int
  sold: Int
  restockThreshold: Int
  lastRestocked: Date
  restockActive: Boolean
}

input UserInteractionInput {
  lovedCount: Int
  cartCount: Int
  wishlistCount: Int
  viewedCount: Int
}

type Keyword {
  id: ID!
  name: String!
  image: String
  description: String
  createdAt: Date
  updatedAt: Date
  colors: [ColorsIndex]
  layouts: [LayoutList]
  ownership: Ownership
}

input KeywordInput {
  name: String!
  image: Upload
  description: String
  createdAt: Date
  updatedAt: Date
  colors: [ColorsIndexInput]
  layouts: [LayoutListInput]
  ownership: OwnershipInput
}

type Season {
  id: ID!
  name: String!
  startDate: Date
  endDate: Date
  image: String
  description: String
  createdAt: Date
  updatedAt: Date
  colors: [ColorsIndex]
  layouts: [LayoutList]
  ownership: Ownership
}

input SeasonInput {
  name: String!
  startDate: Date
  endDate: Date
  image: Upload
  description: String
  createdAt: Date
  updatedAt: Date
  colors: [ColorsIndexInput]
  layouts: [LayoutListInput]
  ownership: OwnershipInput
}

type Promotion {
  id: ID!
  name: String!
  discount: Float!
  startDate: Date
  endDate: Date
  image: String
  description: String
  createdAt: Date
  updatedAt: Date
  colors: [ColorsIndex]
  layouts: [LayoutList]
  ownership: Ownership
  promocodes: [Token]
}

input PromotionInput {
  name: String!
  discount: Number!
  startDate: Date
  endDate: Date
  image: Upload
  description: String
  createdAt: Date
  updatedAt: Date
  colors: [ColorsIndexInput]
  layouts: [LayoutListInput]
  ownership: OwnershipInput
  promocodes: [ID]
}

type Category {
  id: ID!
  name: String!
  image: String
  description: String
  createdAt: Date
  updatedAt: Date
  colors: [ColorsIndex]
  layouts: [LayoutList]
  ownership: Ownership
}

input CategoryInput {
  name: String!
  image: Upload
  description: String
  createdAt: Date
  updatedAt: Date
  colors: [ColorsIndexInput]
  layouts: [LayoutListInput]
  ownership: OwnershipInput
}

type Recommendation {
  id: ID!
  metadata: RecommendationMetadata
  Keywords: [KeywordRecommends]
  Categories: [CategoryRecommends]
  Seasons: [SeasonRecommends]
  Promotions: [PromotionRecommends]
  Stores: [StoreRecommends]
  direct: [DirectRecommends]
  indirect: [IndirectRecommends]
  recommendedProducts: [RecommendedProducts]
}

type RecommendationMetadata {
  createdAt: Date
  updatedAt: Date
  version: Int
  ownership: Ownership
}

type KeywordRecommends {
  keyword: Keyword
  points: Int
}

type CategoryRecommends {
  category: Category
  points: Int
}

type SeasonRecommends {
  season: Season
  points: Int
}

type PromotionRecommends {
  promotion: Promotion
  points: Int
}

type StoreRecommends {
  store: Store
  points: Int
}

type DirectRecommends {
  product: Product
  points: Int
}

type IndirectRecommends {
  characteristicName: String
  points: Int
}

type RecommendedProducts {
  product: Product
  points: Int
}

input RecommendationInput {
  metadata: RecommendationMetadataInput
  Keywords: [KeywordRecommendsInput]
  Categories: [CategoryRecommendsInput]
  Seasons: [SeasonRecommendsInput]
  Promotions: [PromotionRecommendsInput]
  Stores: [StoreRecommendsInput]
  direct: [DirectInput]
  indirect: [IndirectInput]
  recommendedProducts: [ProductRecommendsInput]
}

input RecommendationMetadataInput {
  createdAt: Date
  updatedAt: Date
  version: Int
  ownership: OwnershipInput
}

input KeywordRecommendsInput {
  keyword: ID
  points: Int
}

input CategoryRecommendsInput {
  category: ID
  points: Int
}

input SeasonRecommendsInput {
  season: ID
  points: Int
}

input PromotionRecommendsInput {
  promotion: ID
  points: Int
}

input StoreRecommendsInput {
  store: ID
  points: Int
}

input DirectInput {
  product: ID
  points: Int
}

input IndirectInput {
  characteristicName: String
  points: Int
}

input ProductRecommendsInput {
  product: ID
  points: Int
}

type Review {
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  text: String
  author: User
  product: [ProductList]
  store: Store
  rating: Int
  images: [ImageIndex]
}

input ReviewInput {
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  text: String
  author: ID
  product: [ProductListInput]
  store: ID
  rating: Int
  images: [ImageIndexInput]
}

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

type User {
  id: ID!
  createdAt: Date
  updatedAt: Date
  isAdmin: Boolean
  role: String
  storeRoles: [StoreRoles]
  token: [Token]
  providers: [UserProviders]
  session: [Session]
  state: [State]
  username: String
  firstName: String
  lastName: String
  recommendationId: [Recommendation]
  currency: String
  emailBook: [EmailBook]
  phoneBook: [PhoneBook]
  device: [Device]
  password: String
  themes: [Themes]
  logos: [Logos]
  bannerImages: [BannerImages]
  profilePicture: [ProfilePicture]
  layouts: [LayoutList]
  addressBook: [Address]
  demographics: Demographics
  photoAlbums: [PhotoAlbum]
  darkMode: Boolean
  colors: [ColorsIndex]
  subscriptions: [SubscriptionList]
  subscribers: [SubscriptionList]
  subscriptionPrograms: [SubscriptionProgram]
  loyaltyProgram: [LoyaltyProgram]
  promoCodes: [PromoCode]
  lovedProducts: [Product]
  wishlists: [Wishlist]
  recentlyViewed: [Product]
  recommendations: [Recommendation]
  orders: [Order]
  cart: UserCart
  notifications: [NotificationList]
  alerts: [AlertList]
  contents: [ContentList]
  conversations: [Conversations]
  ownedMessages: [OwnedMessages]
  interests: [InterestType]
}

type StoreRoles {
  storeId: ID
  role: String
  isAuthorized: Boolean
  permissions: [String]
  token: [Token]
}

type Session {
  id: ID!
  createdAt: Date
  updatedAt: Date
  destroyAt: Date
  timeout: Date
  duration: Number
  lastVisitedPage: String
  metadata: SessionMetadata
  location: UserLocation
}

type SessionMetadata {
  ip: String
  userAgent: String
  deviceType: String
  deviceId: String
}

type UserLocation {
  lat: Number
  long: Number
  City: String
  Country: String
}

type State {
  id: String
  createdAt: Date
  updatedAt: Date
}

type EmailBook {
  email: String
  emailType: String
}

type PhoneBook {
  phone: String
  phoneType: String
}

type Themes {
  theme: String
  index: Number
  colors: [ColorsIndex]
}

type Logos {
  logo: String
  index: Number
}

type BannerImages {
  image: String
  index: Number
}

type ProfilePicture {
  image: String
  index: Number
}

type Device {
  type: String
  name: String
  id: String
}

type Address {
  addressIndex: Number
  name: String
  address1: String
  address2: String
  city: String
  state: String
  country: String
  zip: String
}

type Demographics {
  age: Number
  birthdate: Date
  language: String
  race: String
}

type PhotoAlbum {
  name: String
  photos: [PhotoAlbumPhotos]
  index: Int
  description: String
  createdAt: Date
  updatedAt: Date
}

type PhotoAlbumPhotos {
  photo: String
  index: Int
}

type NotificationsList {
  notification: Notification
  read: Boolean
  index: Int
}

type AlertsList {
  userAlert: UserAlert
  read: Boolean
  subscribed: Boolean
  alert: UserAlert
  index: Int
}

type ContentsList {
  content: Content
  read: Boolean
  subscribed: Boolean
  index: Int
}

type UserProviders {
  provider: String
  providerId: String
  provderToken: String
  providerExiration: Date
}

type InterestType {
  keyword: [Keyword]
  category: [Category]
  season: [Season]
  promotion: [Promotion]
  store: [Store]
}

input UserInput {
  createdAt: Date
  updatedAt: Date
  isAdmin: Boolean
  role: String
  storeRoles: [StoreRolesInput]
  token: [ID]
  providers: [UserProvidersInput]
  session: [SessionInput]
  state: [StateInput]
  username: String
  firstName: String
  lastName: String
  recommendationId: [ID]
  currency: String
  emailBook: [EmailBookInput]
  device: [DeviceInput]
  phoneBook: [PhoneBookInput]
  password: String
  themes: [ThemesInput]
  logos: [LogosInput]
  bannerImages: [BannerImagesInput]
  profilePicture: [ProfilePictureInput]
  layouts: [LayoutListInput]
  addressBook: [AddressInput]
  demographics: DemographicsInput
  photoAlbums: [PhotoAlbumInput]
  darkMode: Boolean
  colors: [ColorsIndexInput]
  subscriptions: [SubscriptionListInput]
  subscribers: [SubscriptionListInput]
  subscriptionPrograms: [SubscriptionProgramInput]
  loyaltyProgram: [LoyaltyProgramInput]
  lovedProducts: [ID]
  wishlists: [ID]
  recentlyViewed: [ID]
  recommendations: [ID]
  orders: [ID]
  cart: UserCartInput
  notifications: [NotificationListInput]
  alerts: [AlertListInput]
  contents: [ContentListInput]
  conversations: [ConversationsInput]
  ownedMessages: [OwnedMessagesInput]
  interests: [InterestTypeInput]
}

input StoreRolesInput {
  storeId: ID
  role: String
  isAuthorized: Boolean
  permissions: [String]
  token: [ID]
}

input SessionInput {
  id: ID!
  createdAt: Date
  updatedAt: Date
  destroyAt: Date
  timeout: Date
  duration: Number
  lastVisitedPage: String
  metadata: SessionMetadataInput
  location: UserLocationInput
}

input SessionMetadataInput {
  ip: String
  userAgent: String
  deviceType: String
  deviceId: String
}

input UserLocationInput {
  lat: Number
  long: Number
  City: String
  Country: String
}

input StateInput {
  id: String
  createdAt: Date
  updatedAt: Date
}

input EmailBookInput {
  email: String
  emailType: String
}

input PhoneBookInput {
  phone: String
  phoneType: String
}

input ThemesInput {
  theme: String
  index: Number
  colors: [ColorsIndexInput]
}

input LogosInput {
  logo: String
  index: Number
}

input BannerImagesInput {
  image: String
  index: Number
}

input ProfilePictureInput {
  image: String
  index: Number
}

input DeviceInput {
  type: String
  name: String
}

input AddressInput {
  addressIndex: Number
  name: String
  address1: String
  address2: String
  city: String
  state: String
  country: String
  zip: String
}

input DemographicsInput {
  age: Number
  birthdate: Date
  language: String
  race: String
}

input PhotoAlbumInput {
  name: String
  description: String
  createdAt: Date
  updatedAt: Date
  photos: [PhotoAlbumPhotosInput]
  index: Int
}

input PhotoAlbumPhotosInput {
  photo: String
  index: Int
}

input SubscriptionInput {
  type: String
  status: String
  subscriptionId: String
  createdAt: Date
  updatedAt: Date
  version: Number
  ownership: OwnershipInput
  name: String
  description: String
  active: Boolean
  token: String
  startDate: Date
  endDate: Date
  trialPeriod: Int
  plan: String
  price: Float
  billingCycle: String
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

input NotificationsListInput {
  notification: ID
  read: Boolean
  index: Int
}

input AlertsListInput {
  userAlert: ID
  read: Boolean
  subscribed: Boolean
  alert: ID
  index: Int
}

input ContentsListInput {
  content: ID
  read: Boolean
  subscribed: Boolean
  index: Int
}

input UserProvidersInput {
  provider: String
  providerId: String
  provderToken: String
  providerExiration: Date
}

input InterestTypeInput {
  keyword: [ID]
  category: [ID]
  season: [ID]
  promotion: [ID]
  store: [ID]
}

type UserAlert {
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  expiredAt: Date
  version: Int
  status: String
  languages: [LanguageTranslation]
  privacy: String
  title: String
  text: String
  type: String
  images: ImageIndex
  colors: [ColorsIndex]
  layouts: [LayoutList]
  ownership: Ownership
  keyword: [Keyword]
  season: [Season]
  promotion: [Promotion]
  category: [Category]
  products: [ProductList]
  stores: [StoreList]
  trigger: [Trigger]
}

input UserAlertInput {
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  expiredAt: Date
  version: Int
  status: String
  languages: [LanguageTranslationInput]
  text: String
  type: String
  images: ImageIndexInput
  title: String
  colors: [ColorsIndexInput]
  layouts: [LayoutListInput]
  ownership: OwnershipInput
  keyword: [ID]
  season: [ID]
  promotion: [ID]
  category: [ID]
  products: [ProductListInput]
  stores: [StoreListInput]
  trigger: [TriggerInput]
}

type UserCart {
  createdAt: Date
  updatedAt: Date
  orderedAt: Date
  abandoned: Boolean
  abandonedAt: Date
  ownership: Ownership
  products: [ProductList]
  total: Float
}

input UserCartInput {
  createdAt: Date
  updatedAt: Date
  orderedAt: Date
  abandoned: Boolean
  ownership: OwnershipInput
  products: [ProductListInput]
  total: Float
}

type Wishlist {
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  version: Number
  status: String
  languages: [LanguageTranslation]
  name: String
  photoAlbums: [PhotoAlbum]
  ownership: Ownership
  keyword: [Keyword]
  season: [Season]
  promotion: [Promotion]
  category: [Category]
  products: [ProductList]
  stores: [StoreList]
  privacy: String
  subscribers: [SubscriptionList]
  colors: [ColorsIndex]
  layouts: [Layout]
  subscriptions: [SubscriptionList]
  subscriptionProgram: [SubscriptionProgram]
  loyaltyProgram: [LoyaltyProgram]
  promoCodes: [PromoCode]
}

input WishlistInput {
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  version: Number
  status: String
  languages: [LanguageTranslationInput]
  name: String
  photoAlbums: [PhotoAlbumInput]
  owneship: OwnershipInput
  keyword: [ID]
  season: [ID]
  promotion: [ID]
  category: [ID]
  products: [ProductListInput]
  stores: [StoreListInput]
  private: Boolean
  subscribers: [SubscriptionListInput]
  colors: [ColorsIndexInput]
  layouts: [LayoutListInput]
  subscriptions: [SubscriptionListInput]
  subscriptionProgram: [SubscriptionProgramInput]
  loyaltyProgram: [LoyaltyProgramInput]
  promoCodes: [PromoCodeInput]
}

type Layout {
  id: ID
  createdAt: Date
  updatedAt: Date
  version: Int
  permissions: [String]
  ownership: Ownership
  name: String
  description: String
  type: String
  structure: JSON
  components: [ComponentList]
  elements: [ContentElements]
  colors: [ColorsIndex]
  themes: [Themes]
  logos: [Logos]
  bannerImages: [ImageIndex]
  layouts: [LayoutList]
}

type ComponentList {
  type: String
  index: Int
}

input LayoutInput {
  createdAt: Date
  updatedAt: Date
  version: Int
  permissions: [String]
  ownership: OwnershipInput
  name: String
  description: String
  type: String
  structure: JSON
  components: [ComponentListInput]
  elements: [ContentElementsInput]
  colors: [ColorsIndexInput]
  themes: [ThemesInput]
  logos: [LogosInput]
  bannerImages: [ImageIndexInput]
  layouts: [LayoutListInput]
}

input ComponentListInput {
  type: String
  index: Int
}

type Store {
  id: ID!
  createdAt: Date
  updatedAt: Date
  isSuperStore: Boolean
  role: String
  active: Boolean
  analytics: [Analytics]
  visibility: Visibility
  token: [Token]
  providers: [UserProviders]
  session: [Session]
  state: [State]
  users: [User]
  admins: [User]
  owners: [User]
  permissions: [StorePermissions]
  password: String
  name: String
  description: String
  type: String
  category: [Category]
  subCategory: [Category]
  photoAlbums: [PhotoAlbum]
  recommendationId: [Recommendation]
  currency: String
  emailBook: [EmailBook]
  device: [Device]
  phoneBook: [PhoneBook]
  themes: [Themes]
  logos: [Logos]
  bannerImages: [BannerImages]
  profilePicture: [ProfilePicture]
  layouts: [LayoutList]
  addressBook: [Address]
  darkMode: Boolean
  colors: [ColorsIndex]
  subscriptions: [SubscriptionList]
  subscribers: [SubscriptionList]
  subscriptionProgram: [SubscriptionProgram]
  lovedProducts: [Product]
  wishlists: [Wishlist]
  recentlyViewed: [Product]
  recommendations: [Recommendation]
  orders: [Order]
  cart: UserCart
  reviews: [Review]
  reviewCount: Int
  reviewRating: Float
  products: [ProductList]
  notifications: [NotificationList]
  alerts: [AlertList]
  contents: [ContentList]
  conversations: [Conversations]
  messages: [MessageList]
  ownedMessages: [OwnedMessages]
  interests: [InterestType]
  shipping: [StoreShipping]
  loyaltyProgram: [LoyaltyProgram]
  promoCodes: [PromoCode]
}

type Analytics {
  totalRevenue: Float
  monthlyRevenue: Float
  totalOrders: Int
  conversionRate: Float
  visitorCount: Int
  averageOrderValue: Float
  totalProducts: Int
  totalCustomers: Int
  totalSubscribers: Int
}

type Visibility {
  isPublic: Boolean
  featured: Boolean
  seoKeywords: [String]
  seoDescription: String
}

type StorePermissions {
  defaultRoles: StorePermissionsDefault
  customRoles: [StorePermissionsCustom]
  userPermissions: [StorePermissionsUser]
}

type StorePermissionsDefault {
  admin: [String]
  superAdmin: [String]
  store: [String]
  user: [String]
  overlord: [String]
  superStore: [String]
}

type StorePermissionsCustom {
  roleName: String
  permissions: [String]
}

type StorePermissionsUser {
  userId: User
  permissions: [String]
}

type OwnedMessages {
  alerts: [AlertsList]
  content: [ContentsList]
  notifications: [NotificationsList]
  messages: [MessagesList]
}

type StoreShipping {
  methods: [String]
  estimatedDeliveryTime: [String]
  returnPolicy: String
  shippingPolicy: String
  addons: [String]
}

type SubscriptionProgram {
  subscription: AppSubscription
  token: Token
  points: Int
  rewards: [Product]
  discount: Number
  promocodes: [Token]
  renewalDate: Date
  active: Boolean
}

type LoyaltyProgram {
  subscription: [AppSubscription]
  users: [User]
  stores: [Store]
  wishlists: [Wishlist]
}

type PromoCode {
  code: Token
  promotion: Promotion
  discount: Float
  products: [Product]
  stores: [Store]
  maxUses: Int
  uses: Int
}

type MessagesList {
  message: Message
  index: Int
}

input StoreInput {
  id: ID
  createdAt: Date
  updatedAt: Date
  isSuperStore: Boolean
  role: String
  active: Boolean
  analytics: [AnalyticsInput]
  visibility: VisibilityInput
  token: [TokenInput]
  providers: [UserProvidersInput]
  session: [SessionInput]
  state: [StateInput]
  users: [ID]
  admins: [ID]
  owners: [ID]
  permissions: [StorePermissionsInput]
  name: String
  description: String
  type: String
  category: [ID]
  subCategory: [ID]
  photoAlbums: [PhotoAlbumInput]
  recommendationId: [ID]
  currency: String
  emailBook: [EmailBookInput]
  device: [DeviceInput]
  phone: [PhoneBookInput]
  password: String
  themes: [ThemesInput]
  logos: [LogosInput]
  bannerImages: [BannerImagesInput]
  profilePicture: [ProfilePictureInput]
  addressBook: [AddressInput]
  darkMode: Boolean
  colors: [ColorsIndexInput]
  subscriptions: [SubscriptionListInput]
  subscribers: [SubscriptionListInput]
  subscriptionProgram: [SubscriptionProgramInput]
  lovedProducts: [ID]
  wishlists: [ID]
  recentlyViewed: [ID]
  recommendations: [ID]
  orders: [ID]
  cart: ID
  reviews: [ID]
  reviewCount: Int
  reviewRating: Float
  products: [ProductListInput]
  ownedMessages: [OwnedMessagesInput]
  alerts: [AlertListInput]
  contents: [ContentListInput]
  conversations: [ConversationsInput]
  notifications: [NotificationListInput]
  messages: [MessageListInput]
  interests: [InterestTypeInput]
  shipping: [StoreShippingInput]
  loyaltyProgram: [LoyaltyProgramInput]
  promoCodes: [PromoCodeInput]
}

input AnalyticsInput {
  totalRevenue: Float
  monthlyRevenue: Float
  totalOrders: Int
  conversionRate: Float
  visitorCount: Int
  averageOrderValue: Float
  totalProducts: Int
  totalCustomers: Int
  totalSubscribers: Int
}

input VisibilityInput {
  isPublic: Boolean
  featured: Boolean
  seoKeywords: [String]
  seoDescription: String
}

input StorePermissionsInput {
  defaultRoles: StorePermissionsDefaultInput
  customRoles: [StorePermissionsCustomInput]
  userPermissions: [StorePermissionsUserInput]
}

input StorePermissionsDefaultInput {
  admin: [String]
  superAdmin: [String]
  store: [String]
  user: [String]
  overlord: [String]
  superStore: [String]
}

input StorePermissionsCustomInput {
  name: String
  permissions: [String]
}

input StorePermissionsUserInput {
  userId: ID
  permissions: [String]
}

input OwnedMessagesInput {
  alerts: [AlertsListInput]
  content: [ContentsListInput]
  notifications: [NotificationsListInput]
  messages: [MessagesListInput]
}

input StoreShippingInput {
  methods: [String]
  estimatedDeliveryTime: [String]
  returnPolicy: String
  shippingPolicy: String
  addons: [String]
}

input LoyaltyProgramInput {
  subscription: [SubscriptionInput]
  users: [ID]
  stores: [ID]
  wishlists: [ID]
}

input SubscriptionProgramInput {
  subscription: SubscriptionInput
  token: TokenInput
  points: Int
  rewards: [ID]
  discount: Number
  promocodes: [ID]
  renewalDate: Date
  active: Boolean
}

input PromoCodeInput {
  code: TokenInput
  promotion: ID
  discount: Float
  products: [ID]
  stores: [ID]
  maxUses: Int
  uses: Int
}

input MessagesListInput {
  message: ID
  index: Int
}

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
  sourceid: ID
  createdAt: Date
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
  sourceid: ID
  createdAt: Date
}

type SubscriptionList {
  type: String
  id: ID
  index: Int
}

type ContentList {
  content: ID
  index: Int
  subscribed: Boolean
}

type AlertList {
  alert: ID
  read: Boolean
  subscribed: Boolean
}

type NotificationList {
  notification: ID
  read: Boolean
}

input AuthorizationInput {
  token: String!
  role: String
  isAuthenticated: Boolean
}

input FilterInput {
  field: String!
  operator: String!
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
  data: [dataInput]
  id: ID
}

input queryInput {
  field: String!
}

input SubscriptionListInput {
  type: String
  id: ID
  index: Int
}

input ContentListInput {
  content: ID
  index: Int
  subscribed: Boolean
}

input AlertListInput {
  alert: ID
  read: Boolean
  subscribed: Boolean
}

input NotificationListInput {
  notification: ID
  read: Boolean
}

union ModelEntity = Content | Notification | Order | Product | Category | Keyword | Season | Promotion | Recommendation | Review | Token | User | UserAlert | UserCart | Wishlist | Message | AppSubscription | Store | Settings

union supportEntity = ColorsIndex | ContentElements | ImageIndex | OrderTax | ShippingDetails | Dimensions | UserInteraction | RecommendationMetadata | KeywordRecommends | CategoryRecommends | SeasonRecommends | PromotionRecommends | DirectRecommends | IndirectRecommends | RecommendedProducts | TokenPin | TokenMetadata | TokenLocation | UserProviders | Session | State | Device | Address | Demographics | AppSubscription | Trigger

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

  `;

 export default fulltypedefs;

// try {
//   parse(fulltypedefs);
//   console.log("✅ TypeDefs successfully parsed!");
// } catch (error) {
//   console.error("❌ TypeDefs parsing error:", error.message);
// }


// try {
//     const schema = buildASTSchema(parse(fulltypedefs));
//     console.log("✅ Schema built successfully!");
//   } catch (error) {
//     console.error("❌ Schema validation error:", error.message);
//   }