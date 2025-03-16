// import { gql } from 'apollo-server-express';

const tdOrder = /*gql*/`
    type Order {
        id: ID!
        userId: [User]!
        products: [Product!]!
        createdAt: Date!
        updatedAt: Date!
        orderDate: Date!
        orderStatus: String!
        total: Float!
        subtTotal: Float!
        tax: [OrderTax]
        trackingNumber: String
        shippingDetails: ShippingDetails
        discounts: [Discount]
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
        address: String
        city: String
        state: String
        zip: String
    }

    type Discount {
        type: String
        amount: Float
        code: String
        promotions: [Promotion]
    }

    input OrderInput {
        userId: ID!
        products: [ID!]!
        createdAt: Date!
        updatedAt: Date
        orderDate: Date!
        orderStatus: String!
        total: Number!
        subtTotal: Number!
        tax: [TaxInput]
        trackingNumber: String
        shippingDetails: ShippingDetailsInput
    }

    input ShippingDetailsInput {
        arrivalDate: Date
        shippedDate: Date
        shippingMethod: String
        shippingCost: Number
        address: String
        city: String
        state: String
        zip: String
    }

    input TaxInput {
        code: String
        rate: Number
        amount: Number
    }

    input DiscountInput {
        type: String
        amount: Number
        code: String
        promotions: [ID]
    }

    type Query {
       orderUpdate(id: ID!): Order
    }

    type Mutation {
        refundOrder(id: ID!): Order
        chargeOrder(id: ID!): Order
        editOrder(id: ID!, order: OrderInput): Order
    }

`;

export default tdOrder;