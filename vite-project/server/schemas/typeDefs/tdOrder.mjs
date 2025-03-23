// import { gql } from 'apollo-server-express';


    // when a order is made, the products are ordered from the right stores

// refundOrder
    // when a order is refunded, the products are returned to the right stores  

// ShippingMerger 
    // merge the cost of shipping for the products ordered from different stores
    // merge all the trackingNumbers into one package 

// OrderDiscount
    // apply discount to the order

    
// OrderFromRightStores


const tdOrder = /*gql*/`
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

    extend type Query {
       getOrder(id: ID!): Order
    }

    extend type Mutation {
        createOrder(order: OrderInput): Order
        updateOrder(id: ID!, order: OrderInput): Order
        deleteOrder(id: ID!): Order
    }

`;

export default tdOrder;