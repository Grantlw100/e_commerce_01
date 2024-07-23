import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  query {
    getAllProducts {
      id
      name
      quickDescription
      description
      price
      quantity
      discount
      featured
      loved
      bundled
      image
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

export const GET_CATEGORIES = gql`
  query {
    getAllCategories {
      id
      name
      image
     description
    }
  }
`;

export const GET_PROMOTIONS = gql`
  query {
    getAllPromotions {
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

export const GET_KEYWORDS = gql`
  query {
    getAllKeywords {
      id
      name
      image
      description
    }
  }
`;

export const GET_SEASONS = gql`
  query {
    getAllSeasons {
      id
      name
      startDate
      endDate
      image
      description
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query getProductById($id: ID!) {
    getProductById(id: $id) {
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
        discount
      }
      price
      discount
      featured
      loved
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
        reviewText
        reviewAuthor {
          id
          name
        }
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

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query getProductsByCategory($categoryId: ID!) {
    getProductsByCategory(categoryId: $categoryId) {
      id
      name
      quickDescription
      description
      price
      quantity
    }
  }
`;

export const GET_PRODUCTS_BY_KEYWORD = gql`
  query getProductsByKeyword($keywordId: ID!) {
    getProductsByKeyword(keywordId: $keywordId) {
      id
      name
      quickDescription
      description
      price
      quantity
    }
  }
`;

export const GET_PRODUCTS_BY_SEASON = gql`
  query getProductsBySeason($seasonId: ID!) {
    getProductsBySeason(seasonId: $seasonId) {
      id
      name
      quickDescription
      description
      price
      quantity
    }
  }
`;

export const GET_PRODUCTS_BY_PROMOTION = gql`
  query getProductsByPromotion($promotionId: ID!) {
    getProductsByPromotion(promotionId: $promotionId) {
      id
      name
      quickDescription
      description
      price
      quantity
    }
  }
`;

export const GET_ALL_KEYWORDS = gql`
  query {
    getAllKeywords {
      id
      name
      image
      description
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query {
    getAllCategories {
      id
      name
      image
     description
    }
  }
`;

export const GET_ALL_SEASONS = gql`
  query {
    getAllSeasons {
      id
      name
      startDate
      endDate
      image
      description
    }
  }
`;

export const GET_ALL_PROMOTIONS = gql`
  query {
    getAllPromotions {
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

export const GET_USER_BY_ID = gql`
  query getUserById($id: ID!) {
    getUserById(id: $id) {
      id
      email
      phone
      name
      address {
        address1
        address2
        city
        state
        zip
      }
      country
      lovedProducts {
        id
        name
      }
      recentlyViewed {
        id
        name
      }
    }
  }
`;

export const GET_USER_CART = gql`
  query getUserCart($userId: ID!) {
    getUserCart(userId: $userId) {
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

export const GET_NOTIFICATIONS = gql`
  query getNotifications($userId: ID!) {
    getNotifications(userId: $userId) {
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

export const GET_ORDERS_BY_USER = gql`
  query getOrdersByUser($userId: ID!) {
    getOrdersByUser(userId: $userId) {
      id
      products {
        name
        price
        quantity
      }
      orderTotal
      orderStatus
      trackingNumber
      orderDate
    }
  }
`;

export const GET_ALL_ORDERS = gql`
  query {
    getAllOrders {
      id
      user {
        id
        name
      }
      products {
        name
        price
        quantity
      }
      orderTotal
      orderStatus
      trackingNumber
      orderDate
    }
  }
`;

export const GET_ORDER_HISTORY = gql`
  query getOrderHistory($userId: ID!) {
    getOrderHistory(userId: $userId) {
      id
      products {
        name
        price
        quantity
      }
      orderTotal
      orderStatus
      trackingNumber
      orderDate
    }
  }
`;

export const GET_ORDER_DETAILS = gql`
  query getOrderDetails($orderId: ID!) {
    getOrderDetails(orderId: $orderId) {
      id
      products {
        name
        price
        quantity
      }
      orderTotal
      orderStatus
      trackingNumber
      orderDate
    }
  }
`;

export const GET_CART = gql`
  query getCart($userId: ID!) {
    getCart(userId: $userId) {
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

export const GET_ALL_USERS = gql`
  query {
    getAllUsers {
      id
      email
      name
      address {
        street
        city
        state
        zip
      }
      country
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
  query getUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      id
      email
      name
      address {
        address1
        address2
        city
        state
        zip
      }
      country
    }
  }
`;

export const GET_REVIEWS = gql`
  query getReviews($productId: ID!) {
    getReviews(productId: $productId) {
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

export const GET_USER_ALERTS = gql`
  query getUserAlerts($userId: ID!) {
    getUserAlerts(userId: $userId) {
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

export const GET_LOVED_PRODUCTS = gql`
  query getLovedProducts($userId: ID!) {
    getLovedProducts(userId: $userId) {
      id
      name
      description
      price
      quantity
    }
  }
`;

export const GET_RECENTLY_VIEWED = gql`
  query getRecentlyViewed($userId: ID!) {
    getRecentlyViewed(userId: $userId) {
      id
      name
      description
      price
      quantity
    }
  }
`;
