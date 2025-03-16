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
import {mergeTypeDefs} from '@graphql-tools/merge';
import gql from 'graphql-tag';

const tdScalars = `

    scalar Date

    scalar Upload

    type ColorsIndex {
        Color: String
        Index: Int
    }

    type ColorsIndexInput {
        Color: String
        Index: Int
    }
    
    scalar Number
`;

const typeDefs = [
    tdScalars,
    tdGeneral,
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
    tdWishlist
];

export default mergeTypeDefs(typeDefs);