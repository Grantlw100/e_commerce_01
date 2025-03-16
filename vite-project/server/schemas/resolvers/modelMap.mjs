import User from '../../models/user.mjs';
import Product from '../../models/product.mjs';
import Review from '../../models/review.mjs';
import Order from '../../models/order.mjs';
import Notification from '../../models/notification.mjs';
import UserAlert from '../../models/userAlert.mjs';
import UserCart from '../../models/userCart.mjs';
import Content from '../../models/content.mjs';
import productDetails from '../../models/productDetails.mjs';
import Token from '../../models/token.mjs';
import Wishlist from '../../models/wishlist.mjs';
import Recommendation from '../../models/recommendation.mjs';

const [Keyword, Season, Promotion, Category] = productDetails;
import {contentValidation} from '../../plug-ins/joiPlugIn/joiSchemas/joiContent.mjs';
import {tokenValidation} from '../../plug-ins/joiPlugIn/joiSchemas/joiToken.mjs';
import {notificationValidation} from '../../plug-ins/joiPlugIn/joiSchemas/joiNotification.mjs';
import {orderValidation} from '../../plug-ins/joiPlugIn/joiSchemas/joiOrder.mjs';
import {productValidation} from '../../plug-ins/joiPlugIn/joiSchemas/joiProduct.mjs';
import {productDetailValidation} from '../../plug-ins/joiPlugIn/joiSchemas/joiProductDetail.mjs';
import {recommendationValidation} from '../../plug-ins/joiPlugIn/joiSchemas/joiRecommendation.mjs';
import {reviewValidation} from '../../plug-ins/joiPlugIn/joiSchemas/joiReviews.mjs';
import {userValidation} from '../../plug-ins/joiPlugIn/joiSchemas/joiUser.mjs';
import {userAlertValidation} from '../../plug-ins/joiPlugIn/joiSchemas/joiUserAlert.mjs';
import {userCartValidation} from '../../plug-ins/joiPlugIn/joiSchemas/joiUserCart.mjs';
import {wishlistValidation} from '../../plug-ins/joiPlugIn/joiSchemas/joiWishlist.mjs';

export const modelMap = {
    Content: {
        mongooseModel: Content,
        joiValidation: contentValidation
    },
    Notification: {
        mongooseModel: Notification,
        joiValidation: notificationValidation
    },
    Order: {
        mongooseModel: Order,
        joiValidation: orderValidation
    },
    Product: {
        mongooseModel: Product,
        joiValidation: productValidation
    },
    Keyword: {
        mongooseModel: Keyword,
        joiValidation: productDetailValidation.KeywordInput
    },
    Season: {
        mongooseModel: Season,
        joiValidation: productDetailValidation.SeasonInput
    },
    Promotion: {
        mongooseModel: Promotion,
        joiValidation: productDetailValidation.PromotionInput
    },
    Category: {
        mongooseModel: Category,
        joiValidation: productDetailValidation.CategoryInput
    },
    Recommendation: {
        mongooseModel: Recommendation,
        joiValidation: recommendationValidation
    },
    Review: {
        mongooseModel: Review,
        joiValidation: reviewValidation
    },
    Token: {
        mongooseModel: Token,
        joiValidation: tokenValidation
    },
    User: {
        mongooseModel: User,
        joiValidation: userValidation
    },
    UserAlert: {
        mongooseModel: UserAlert,
        joiValidation: userAlertValidation
    },
    UserCart: {
        mongooseModel: UserCart,
        joiValidation: userCartValidation
    },
    Wishlist: {
        mongooseModel: Wishlist,
        joiValidation: wishlistValidation
    }
}