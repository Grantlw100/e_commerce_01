import tdGeneral from './tdGeneral.mjs';
import tdContent from './tdContent.mjs';
import tdNotifications from './tdNotifications.mjs';
import tdOrder from './tdOrder.mjs';
import tdProduct from './tdProduct.mjs';
import tdProductDetails from './tdProductDetail.mjs';
import tdRecommendation from './tdRecommendation.mjs';
import tdReview from './tdReviews.mjs';
import tdToken from './tdToken.mjs';
import tdUsers from './tdUser.mjs';
import tdUserAlert from './tdUserAlert.mjs';
import tdCart from './tdUserCart.mjs';
import tdWishlist from './tdWishlist.mjs';
import tdLayout from './tdLayout.mjs';
import tdStore from './tdStore.mjs';
import tdSettings from './tdSettings.mjs';
import tdSubscription from './tdSubscription.mjs';
import tdEvent from './tdEvent.mjs';
import tdMessage from './tdMessage.mjs';
import {mergeTypeDefs} from '@graphql-tools/merge';

const tdScalars = `

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
        product: ID
        quantity: Int
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
    }

    type Mutation {
        _empty: String
    }

    
`;

const typeDefs = [
    tdScalars,
    tdContent,
    tdNotifications,
    tdOrder,
    tdProduct,
    tdProductDetails,
    tdRecommendation,
    tdReview,
    tdToken,
    tdUsers,
    tdUserAlert,
    tdCart,
    tdWishlist,
    tdLayout,
    tdStore,
    tdSettings,
    tdSubscription,
    tdEvent,
    tdGeneral,
    tdMessage
];


export default mergeTypeDefs(typeDefs);