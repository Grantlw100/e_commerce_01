import { gql } from '@apollo/client';

// User Mutations
export const CREATE_USER = gql`
  mutation CreateUser($input: UserInput!, $file: Upload!) {
    createUser(input: $input, file: $file) {
      token
      user {
        id
        email
        phone
        firstName
        lastName
        address {
          address1
          address2
          city
          state
          zip
          country
        }
        profilePicture
      }
      profileImageUrl
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!, $file: Upload) {
    updateUser(id: $id, input: $input, file: $file) {
      token
      user {
        id
        email
        phone
        firstName
        lastName
        address {
          address1
          address2
          city
          state
          zip
          country
        }
        profilePicture
      }
      profileImageUrl
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation LogoutUser {
    logoutUser
  }
`;

// Category Mutations
export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CategoryInput!, $file: Upload!) {
    createCategory(input: $input, file: $file) {
      id
      name
      image
     description
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $input: CategoryInput!, $file: Upload) {
    updateCategory(id: $id, input: $input, file: $file) {
      id
      name
      image
     description
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      id
      name
    }
  }
`;

// Keyword Mutations
export const CREATE_KEYWORD = gql`
  mutation CreateKeyword($input: KeywordInput!, $file: Upload) {
    createKeyword(input: $input, file: $file) {
      id
      name
      description
      image
    }
  }
`;

export const UPDATE_KEYWORD = gql`
  mutation UpdateKeyword($id: ID!, $name: String!) {
    updateKeyword(id: $id, name: $name) {
      id
      name
      description
      image
    }
  }
`;

export const DELETE_KEYWORD = gql`
  mutation DeleteKeyword($id: ID!) {
    deleteKeyword(id: $id) {
      id
      name
    }
  }
`;

// Season Mutations
export const CREATE_SEASON = gql`
  mutation CreateSeason($name: String!) {
    createSeason(name: $name) {
      id
      name
      startDate
      endDate
      image
      description
    }
  }
`;

export const UPDATE_SEASON = gql`
  mutation UpdateSeason($id: ID!, $name: String!) {
    updateSeason(id: $id, name: $name) {
      id
      name
      startDate
      endDate
      image
      description
    }
  }
`;

export const DELETE_SEASON = gql`
  mutation DeleteSeason($id: ID!) {
    deleteSeason(id: $id) {
      id
      name
    }
  }
`;

// Promotion Mutations
export const CREATE_PROMOTION = gql`
  mutation CreatePromotion($name: String!, $discount: Float!) {
    createPromotion(name: $name, discount: $discount) {
      id
      name
      discount
      startDate
      endDate
      image
      description
    }
  }
`;

export const UPDATE_PROMOTION = gql`
  mutation UpdatePromotion($id: ID!, $name: String!, $discount: Float!) {
    updatePromotion(id: $id, name: $name, discount: $discount) {
      id
      name
      discount
      startDate
      endDate
      image
      description
    }
  }
`;

export const DELETE_PROMOTION = gql`
  mutation DeletePromotion($id: ID!) {
    deletePromotion(id: $id) {
      id
      name
      discount
      startDate
      endDate
    }
  }
`;

// Product Mutations
export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput!, $productImage: Upload!, $descriptionImages: [Upload!]) {
    createProduct(input: $input, productImage: $productImage, descriptionImages: $descriptionImages) {
      id
      name
      quickDescription
      description
      descriptionImages
      category {
        id
        name
      }
      season {
        id
        name
      }
      promotion {
        id
        name
      }
      price
      discount
      featured
      loved
      viewed
      keywords {
        id
        name
      }
      includes {
        id
        name
      }
      reviews {
        id
        userId
        productId
        reviewText
        reviewAuthor
        reviewProduct
        reviewDate
        reviewRating
      }
      bundled
      image
      quantity
      weight
      dimensions {
        length
        width
        height
      }
      taxCategory
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: ProductInput!, $productImage: Upload, $descriptionImages: [Upload]) {
    updateProduct(id: $id, input: $input, productImage: $productImage, descriptionImages: $descriptionImages) {
      id
      name
      quickDescription
      description
      descriptionImages
      category {
        id
        name
      }
      season {
        id
        name
      }
      promotion {
        id
        name
      }
      price
      discount
      featured
      loved
      viewed
      keywords {
        id
        name
      }
      includes {
        id
        name
      }
      reviews {
        id
        userId
        productId
        reviewText
        reviewAuthor
        reviewProduct
        reviewDate
        reviewRating
      }
      bundled
      image
      quantity
      weight
      dimensions {
        length
        width
        height
      }
      taxCategory
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

// Order Mutations
export const CREATE_ORDER = gql`
  mutation CreateOrder($input: OrderInput!) {
    createOrder(input: $input) {
      id
      userId
      products {
        id
        name
        description
        price
        quantity
      }
      orderTotal
      orderDate
      orderStatus
      trackingNumber
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($id: ID!, $input: OrderInput!) {
    updateOrder(id: $id, input: $input) {
      id
      userId
      products {
        id
        name
        description
        price
        quantity
      }
      orderTotal
      orderDate
      orderStatus
      trackingNumber
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation DeleteOrder($id: ID!) {
    deleteOrder(id: $id) {
      id
      userId
      products {
        id
        name
        description
        price
        quantity
      }
      orderTotal
      orderDate
      orderStatus
    }
  }
`;

// Notification Mutations
export const CREATE_NOTIFICATION = gql`
  mutation CreateNotification($input: NotificationInput!) {
    createNotification(input: $input) {
      id
      user {
        id
      }
      notificationText
      notificationDate
      viewed
      type
    }
  }
`;

export const UPDATE_NOTIFICATION = gql`
  mutation UpdateNotification($id: ID!, $input: NotificationInput!) {
    updateNotification(id: $id, input: $input) {
      id
      user {
        id
      }
      notificationText
      notificationDate
      viewed
      type
    }
  }
`;

export const DELETE_NOTIFICATION = gql`
  mutation DeleteNotification($id: ID!) {
    deleteNotification(id: $id) {
      id
      user {
        id
      }
      notificationText
      notificationDate
      viewed
      type
    }
  }
`;

// User Alert Mutations
export const CREATE_USER_ALERT = gql`
  mutation createUserAlert(input: UserAlertInput!, alertImage: Upload) {
    createUserAlert(input: $input, alertImage: $alertImage) {
      id
      user {
        id
      }
      alertText
      alertDate
      viewed
      type
    }
  }
`;

export const UPDATE_USER_ALERT = gql`
  mutation UpdateUserAlert($id: ID!, $input: UserAlertInput!, $alertImage: Upload) {
    updateUserAlert(id: $id, input: $input, alertImage: $alertImage) {
      id
      user {
        id
      }
      alertText
      alertDate
      viewed
      type
    }
  }
`;

export const DELETE_USER_ALERT = gql`
  mutation DeleteUserAlert($id: ID!) {
    deleteUserAlert(id: $id)
  }
`;

// Content Mutations
export const CREATE_CONTENT = gql`
  mutation CreateContent($input: ContentInput!, contentImages: [Upload!]) {
    createContent(input: $input, contentImages: $contentImages) {
      id
      title
      content
      contentType
      published
      user {
        id
      }
      createdDate
      expirationDate
    }
  }
`;

export const UPDATE_CONTENT = gql`
  mutation UpdateContent($id: ID!, $input: ContentInput!, contentImages: [Upload!]) {
    updateContent(id: $id, input: $input, contentImages: $contentImages) {
      id
      title
      content
      contentType
      published
      user {
        id
      }
      createdDate
      expirationDate
    }
  }
`;

export const DELETE_CONTENT = gql`
  mutation DeleteContent($id: ID!) {
    deleteContent(id: $id)
  }
`;

// Review Mutations
export const CREATE_REVIEW = gql`
  mutation CreateReview($productId: ID!, $input: ReviewInput!) {
    createReview(productId: $productId, input: $input) {
      id
      reviewText
      reviewAuthor {
        id
        name
      }
      reviewProduct {
        id
        name
      }
      reviewDate
      reviewRating
    }
  }
`;

export const UPDATE_REVIEW = gql`
  mutation UpdateReview($id: ID!, $input: ReviewInput!) {
    updateReview(id: $id, input: $input) {
      id
      reviewText
      reviewAuthor {
        id
        name
      }
      reviewProduct {
        id
        name
      }
      reviewDate
      reviewRating
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id) {
      id
      reviewText
      reviewAuthor {
        id
      }
      reviewProduct {
        id
      }
      reviewDate
      reviewRating
    }
  }
`;

// Cart Mutations
export const CREATE_CART = gql`
  mutation CreateCart($userId: ID!) {
    createCart(userId: $userId) {
      user {
        id
      }
      products {
        id
        name
        description
        price
        quantity
      }
      cartTotal
    }
  }
`;

export const UPDATE_CART = gql`
  mutation UpdateCart($id: ID!, $input: CartInput!) {
    updateCart(id: $id, input: $input) {
      user {
        id
      }
      products {
        id
        name
        description
        price
        quantity
      }
      cartTotal
    }
  }
`;

export const DELETE_CART = gql`
  mutation DeleteCart($id: ID!) {
    deleteCart(id: $id) {
      user {
        id
      }
      products {
        id
        name
        description
        price
        quantity
      }
      cartTotal
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation AddToCart($userId: ID!, $input: CartItemInput!) {
    addToCart(userId: $userId, input: $input) {
      user {
        id
      }
      products {
        id
        name
        description
        price
        quantity
      }
      cartTotal
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($userId: ID!, $productId: ID!) {
    removeFromCart(userId: $userId, productId: $productId) {
      user {
        id
      }
      products {
        id
        name
        description
        price
        quantity
      }
      cartTotal
    }
  }
`;

export const UPDATE_CART_ITEM_QUANTITY = gql`
  mutation UpdateCartItemQuantity($userId: ID!, $productId: ID!, $quantity: Int!) {
    updateCartItemQuantity(userId: $userId, productId: $productId, quantity: $quantity) {
      user {
        id
      }
      products {
        id
        name
        description
        price
        quantity
      }
      cartTotal
    }
  }
`;

export const CLEAR_CART = gql`
  mutation ClearCart($userId: ID!) {
    clearCart(userId: $userId) {
      user {
        id
      }
      products {
        id
        name
        description
        price
        quantity
      }
      cartTotal
    }
  }
`;

// Payment Mutation
export const CHARGE_ORDER = gql`
  mutation ChargeOrder($userId: ID!, $orderId: ID!, $source: String!) {
    chargeOrder(userId: $userId, orderId: $orderId, source: $source) {
      id
      user {
        id
      }
      products {
        id
        name
        description
        price
        quantity
      }
      orderTotal
      orderDate
      orderStatus
    }
  }
`;

// Loved Mutations 
export const ADD_PRODUCT_TO_LOVED = gql`
  mutation AddProductToLoved($userId: ID!, $productId: ID!) {
    addProductToLoved(userId: $userId, productId: $productId) {
      id
      email
      lovedProducts {
        id
        name
      }
    }
  }
`;

export const REMOVE_PRODUCT_FROM_LOVED = gql`
  mutation RemoveProductFromLoved($userId: ID!, $productId: ID!) {
    removeProductFromLoved(userId: $userId, productId: $productId) {
      id
      email
      lovedProducts {
        id
        name
      }
    }
  }
`;

// Recently Viewed Mutations
export const ADD_PRODUCT_TO_RECENTLY_VIEWED = gql`
  mutation AddProductToRecentlyViewed($userId: ID!, $productId: ID!) {
    addProductToRecentlyViewed(userId: $userId, productId: $productId) {
      id
      email
      recentlyViewed {
        id
        name
      }
    }
  }
`;

export const REMOVE_PRODUCT_FROM_RECENTLY_VIEWED = gql`
  mutation RemoveProductFromRecentlyViewed($userId: ID!, $productId: ID!) {
    removeProductFromRecentlyViewed(userId: $userId, productId: $productId) {
      id
      email
      recentlyViewed {
        id
        name
      }
    }
  }
`;

export const CLEAR_RECENTLY_VIEWED = gql`
  mutation ClearRecentlyViewed($userId: ID!) {
    clearRecentlyViewed(userId: $userId) {
      id
      email
      recentlyViewed {
        id
        name
      }
    }
  }
`;


export const UPDATE_ALERT_VIEWED = gql`
  mutation UpdateAlertViewed($id: ID!, $viewed: Boolean!) {
    updateAlertViewed(id: $id, viewed: $viewed) {
      id
      user {
        id
      }
      alertText
      alertDate
      viewed
      type
    }
  }
`;

export const CLEAR_ALERTS = gql`
  mutation ClearAlerts($userId: ID!) {
    clearAlerts(userId: $userId)
  }
`;
